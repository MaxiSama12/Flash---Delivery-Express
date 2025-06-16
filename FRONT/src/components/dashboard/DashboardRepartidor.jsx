import React, {  useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';

export default function RepartidorDashboard() {
  const [stats, setStats] = useState({
    totalDeliveries: 4,
    todayDeliveries: 2,
    totalEarnings: 20,
    activeRoutes: 1,
  });

  // Pedidos disponibles
  const [availableOrders, setAvailableOrders] = useState([
    {
      id: 1,
      comercioAddress: 'Calle 123',
      deliveryAddress: 'Avenida 456',
      total: 25.0,
    },
    {
      id: 2,
      comercioAddress: 'Calle 789',
      deliveryAddress: 'Avenida 101',
      total: 40.0,
    },
  ]);

  // Rutas asignadas
  const [myRoutes, setMyRoutes] = useState([
    {
      id: 101,
      pickupAddress: 'Calle 321',
      deliveryAddress: 'Avenida 654',
      estimatedTime: 30,
      status: 'asignada',
    },
  ]);

  // Función para aceptar un pedido
  const aceptarPedido = (pedido) => {
    // 1. Quitar pedido de pedidos disponibles
    const nuevosPedidos = availableOrders.filter((o) => o.id !== pedido.id);
    setAvailableOrders(nuevosPedidos);

    // 2. Crear nueva ruta con datos del pedido
    const nuevaRuta = {
      id: Math.floor(Math.random() * 1000) + 200, // id random para ejemplo
      pickupAddress: pedido.comercioAddress,
      deliveryAddress: pedido.deliveryAddress,
      estimatedTime: 30, // puedes cambiar para estimar tiempo dinámico
      status: 'asignada',
      total: pedido.total, // agregamos total para calcular ganancias luego
    };

    // 3. Agregar nueva ruta a rutas asignadas
    const nuevasRutas = [...myRoutes, nuevaRuta];
    setMyRoutes(nuevasRutas);

    // 4. Actualizar stats
    setStats((prev) => ({
      totalDeliveries: prev.totalDeliveries + 1,
      todayDeliveries: prev.todayDeliveries + 1, // suponiendo que se cuenta hoy
      totalEarnings: prev.totalEarnings + pedido.total,
      activeRoutes: prev.activeRoutes + 1,
    }));
  };

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-primary">Panel de Repartidor 🚚</h1>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Entregas</Card.Title>
              <h4>
                <Badge bg="primary">{stats.totalDeliveries}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Hoy</Card.Title>
              <h4>
                <Badge bg="success">{stats.todayDeliveries}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ganancias</Card.Title>
              <h4>
                <Badge bg="warning">${stats.totalEarnings}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
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
              Estado: <Badge bg="secondary">{route.status}</Badge> - Tiempo estimado:{' '}
              {route.estimatedTime} minutos
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}