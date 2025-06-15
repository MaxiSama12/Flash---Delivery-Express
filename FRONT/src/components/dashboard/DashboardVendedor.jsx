import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';

export default function VendedorDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    todaySales: 0,
    totalEarnings: 0,
    pendingOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Simulación de datos
    setStats({
      totalSales: 45,
      todaySales: 5,
      totalEarnings: 12500,
      pendingOrders: 3,
    });

    setRecentOrders([
      {
        id: 301,
        cliente: 'Juan Pérez',
        total: 1500,
        status: 'pendiente',
      },
      {
        id: 302,
        cliente: 'Ana López',
        total: 2300,
        status: 'completado',
      },
    ]);
  }, []);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-success">Panel de Vendedor 🛒</h1>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Ventas</Card.Title>
              <h4><Badge bg="primary">{stats.totalSales}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ventas Hoy</Card.Title>
              <h4><Badge bg="success">{stats.todaySales}</Badge></h4>
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
              <Card.Title>Pedidos Pendientes</Card.Title>
              <h4><Badge bg="danger">{stats.pendingOrders}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Pedidos recientes */}
      <h3 className="mb-3">Pedidos Recientes</h3>
      {recentOrders.length === 0 ? (
        <p>No hay pedidos recientes</p>
      ) : (
        <ListGroup>
          {recentOrders.map(order => (
            <ListGroup.Item key={order.id}>
              <strong>Pedido #{order.id}</strong> - Cliente: {order.cliente}<br />
              Total: ${order.total} - Estado: <Badge bg={order.status === 'pendiente' ? 'danger' : 'success'}>{order.status}</Badge>
              <div className="mt-2">
                {order.status === 'pendiente' && <Button variant="outline-success" size="sm">Marcar como Completado</Button>}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}