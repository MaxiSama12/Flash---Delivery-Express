import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge } from 'react-bootstrap';

export default function VendedorDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalEarnings: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const pedidos = [
      { id: 1, cliente: 'Juan', total: 1000, status: 'pendiente' },
      { id: 2, cliente: 'Ana', total: 1500, status: 'completado' },
      { id: 3, cliente: 'Luis', total: 2000, status: 'completado' },
    ];

    setRecentOrders(pedidos);
    actualizarEstadisticas(pedidos);
  }, []);

  const actualizarEstadisticas = (pedidos) => {
    const total = pedidos.length;
    const pendientes = pedidos.filter(p => p.status === 'pendiente').length;
    const completados = pedidos.filter(p => p.status === 'completado').length;
    const ganancias = pedidos
      .filter(p => p.status === 'completado')
      .reduce((suma, p) => suma + p.total, 0);

    setStats({
      totalOrders: total,
      pendingOrders: pendientes,
      completedOrders: completados,
      totalEarnings: ganancias,
    });
  };

  const marcarComoCompletado = (id) => {
    const actualizados = recentOrders.map(pedido =>
      pedido.id === id ? { ...pedido, status: 'completado' } : pedido
    );

    setRecentOrders(actualizados);
    actualizarEstadisticas(actualizados);
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-success">¡Bienvenido al Panel del Vendedor!</h2>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Pedidos</Card.Title>
              <h4><Badge bg="primary">{stats.totalOrders}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Pendientes</Card.Title>
              <h4><Badge bg="warning">{stats.pendingOrders}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Completados</Card.Title>
              <h4><Badge bg="success">{stats.completedOrders}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Ingresos</Card.Title>
              <h4><Badge bg="info">${stats.totalEarnings}</Badge></h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Acciones rápidas */}
      <h4 className="mb-3">Acciones rápidas</h4>
      <Row className="mb-4">
        <Col><Button variant="primary" className="w-100">Agregar producto</Button></Col>
        <Col><Button variant="secondary" className="w-100">Ver pedidos</Button></Col>
        <Col><Button variant="warning" className="w-100">Gestionar productos</Button></Col>
      </Row>

      {/* Pedidos recientes */}
      <h4>Pedidos recientes</h4>
      {recentOrders.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <ListGroup>
          {recentOrders.map(order => (
            <ListGroup.Item key={order.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Pedido #{order.id}</strong> - Cliente: {order.cliente}<br />
                  Total: ${order.total} - Estado:{' '}
                  <Badge bg={order.status === 'pendiente' ? 'danger' : 'success'}>
                    {order.status}
                  </Badge>
                </div>
                {order.status === 'pendiente' && (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={() => marcarComoCompletado(order.id)}
                  >
                    Marcar como completado
                  </Button>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}