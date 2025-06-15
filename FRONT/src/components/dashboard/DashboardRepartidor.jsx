import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';

export default function RepartidorDashboard() {
  const [stats, setStats] = useState({
    totalDeliveries: 2,
    todayDeliveries: 3,
    totalEarnings: 10000,
    activeRoutes: 1,
  });

  const [availableOrders, setAvailableOrders] = useState([]);
  const [myRoutes, setMyRoutes] = useState([]);

  useEffect(() => {
    // Simulación de datos
    setStats({
      totalDeliveries: 4,
      todayDeliveries: 2,
      totalEarnings: 20,
      activeRoutes: 1,
    });

    setAvailableOrders([
      {
        id: 1,
        comercioAddress: 'Calle 123',
        deliveryAddress: 'Avenida 456',
        total: 25.00,
      },
    ]);

    setMyRoutes([
      {
        id: 101,
        pickupAddress: 'Calle 123',
        deliveryAddress: 'Avenida 456',
        estimatedTime: 30,
        status: 'asignada',
      },
    ]);
  }, []);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-primary">Panel de Repartidor 🚚</h1>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Entregas</Card.Title>
              <h4><Badge bg="primary">{stats.totalDeliveries}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Hoy</Card.Title>
              <h4><Badge bg="success">{stats.todayDeliveries}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ganancias</Card.Title>
              <h4><Badge bg="warning">${stats.totalEarnings}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Rutas Activas</Card.Title>
              <h4><Badge bg="info">{stats.activeRoutes}</Badge></h4>
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
          {availableOrders.map(order => (
            <ListGroup.Item key={order.id}>
              <strong>Pedido #{order.id}</strong> - ${order.total}<br />
              Recoger en: {order.comercioAddress} <br />
              Entregar en: {order.deliveryAddress}
              <div className="mt-2">
                <Button variant="success" size="sm">Aceptar</Button>
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
          {myRoutes.map(route => (
            <ListGroup.Item key={route.id}>
              <strong>Ruta #{route.id}</strong><br />
              Desde: {route.pickupAddress} - Hasta: {route.deliveryAddress}<br />
              Estado: <Badge bg="secondary">{route.status}</Badge> - Tiempo estimado: {route.estimatedTime} minutos
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}