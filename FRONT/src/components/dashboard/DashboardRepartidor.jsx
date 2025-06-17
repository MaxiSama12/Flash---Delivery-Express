import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
} from 'react-bootstrap';
import axios from 'axios';
import { useEffect } from 'react';



export default function RepartidorDashboard() {


  
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    todayDeliveries: 0,
    totalEarnings: 0,
    activeRoutes: 0,
  });

  const [availableOrders, setAvailableOrders] = useState([]);

  useEffect(() => {
  const fetchPedidos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/pedidos?status=completado');
      setAvailableOrders(res.data);
    } catch (err) {
      console.error('Error cargando pedidos', err);
    }
  };

  fetchPedidos();
}, []);

  const [myRoutes, setMyRoutes] = useState([]);

  const aceptarPedido = (pedido) => {
    setAvailableOrders((prev) => prev.filter((o) => o.id !== pedido.id));

    const nuevaRuta = {
      id: Math.floor(Math.random() * 1000) + 200,
      pickupAddress: pedido.comercioAddress,
      deliveryAddress: pedido.deliveryAddress,
      estimatedTime: 30,
      status: 'asignada',
      total: pedido.total,
    };

    setMyRoutes((prevRoutes) => [...prevRoutes, nuevaRuta]);

    setStats((prev) => ({
      ...prev,
      totalEarnings: prev.totalEarnings + pedido.total,
      activeRoutes: prev.activeRoutes + 1,
    }));
  };

  const marcarEntregado = (rutaId) => {
    setMyRoutes((prevRoutes) =>
      prevRoutes.map((route) =>
        route.id === rutaId ? { ...route, status: 'entregado' } : route
      )
    );

    setStats((prev) => ({
      ...prev,
      totalDeliveries: prev.totalDeliveries + 1,
      todayDeliveries: prev.todayDeliveries + 1,
      activeRoutes: prev.activeRoutes > 0 ? prev.activeRoutes - 1 : 0,
    }));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-primary">Panel de Repartidor 🚚</h1>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Entregas</Card.Title>
              <h4>
                <Badge bg="primary">{stats.totalDeliveries}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Hoy</Card.Title>
              <h4>
                <Badge bg="success">{stats.todayDeliveries}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ganancias</Card.Title>
              <h4>
                <Badge bg="warning">${stats.totalEarnings}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Rutas Activas</Card.Title>
              <h4>
                <Badge bg="info">{stats.activeRoutes}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pedidos Disponibles */}
      <h3 className="mb-3">Pedidos Disponibles</h3>
      {availableOrders.length === 0 ? (
        <p>No hay pedidos disponibles</p>
      ) : (
        <ListGroup>
          {availableOrders.map((order) => (
            <ListGroup.Item key={order.id}>
              <strong>Pedido #{order.id}</strong> - ${order.total}
              <br />
              Recoger en: {order.comercioAddress} <br />
              Entregar en: {order.deliveryAddress}
              <div className="mt-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => aceptarPedido(order)}
                >
                  Aceptar
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Mis Rutas */}
      <h3 className="mt-5 mb-3">Mis Rutas</h3>
      {myRoutes.length === 0 ? (
        <p>No tienes rutas asignadas</p>
      ) : (
        <ListGroup>
          {myRoutes.map((route) => (
            <ListGroup.Item key={route.id}>
              <strong>Ruta #{route.id}</strong>
              <br />
              Desde: {route.pickupAddress} - Hasta: {route.deliveryAddress}
              <br />
              Estado: <Badge bg={route.status === 'entregado' ? 'success' : 'secondary'}>{route.status}</Badge> - Tiempo estimado: {route.estimatedTime} minutos
              {route.status !== 'entregado' && (
                <div className="mt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => marcarEntregado(route.id)}
                  >
                    Marcar como Entregado
                  </Button>
                </div>
              )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}