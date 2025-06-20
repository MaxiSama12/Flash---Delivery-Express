import { Container, Row, Col, Card, Button, ListGroup, Badge } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RepartidorDashboard() {
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    todayDeliveries: 0,
    totalEarnings: 0,
    activeRoutes: 0,
  });

  const [availableOrders, setAvailableOrders] = useState([]);
  const [myRoutes, setMyRoutes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pedidosRes, comerciosRes, clientesRes] = await Promise.all([
          axios.get("http://localhost:3000/pedidos"),
          axios.get("http://localhost:3000/comercios"),
          axios.get("http://localhost:3000/clientes"),
        ]);

        const completados = pedidosRes.data.filter(p => p.estado === "completado");

        const pedidosConDatos = completados.map(pedido => {
          const comercio = comerciosRes.data.find(c => c.id === pedido.id_comercio);
          const cliente = clientesRes.data.find(c => c.id === pedido.id_cliente);
          return {
            ...pedido,
            comercioNombre: comercio?.nombre || "Comercio desconocido",
            comercioDireccion: comercio?.direccion || "Sin dirección",
            clienteNombre: cliente?.nombre || "Cliente desconocido",
          };
        });

        setAvailableOrders(pedidosConDatos);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  const aceptarPedido = async (pedido) => {
    try {
      // Simulación: asignar al repartidor y cambiar estado a "en reparto"
      await axios.patch(`http://localhost:3000/pedidos/${pedido.id}`, {
        estado: "en reparto",
        id_repartidor: "ba35", // este ID lo podés reemplazar con el del repartidor logueado
      });

      // Agregar a "Mis Rutas"
      const nuevaRuta = {
        id: pedido.id,
        pickupAddress: pedido.comercioDireccion,
        deliveryAddress: pedido.direccion_entrega,
        estimatedTime: 30,
        status: "en reparto",
        cliente: pedido.clienteNombre,
        comercio: pedido.comercioNombre,
      };

      setMyRoutes(prev => [...prev, nuevaRuta]);

      // Actualizar estadísticas
      setStats(prev => ({
        ...prev,
        totalDeliveries: prev.totalDeliveries + 1,
        todayDeliveries: prev.todayDeliveries + 1,
        activeRoutes: prev.activeRoutes + 1,
      }));

      // Sacarlo de disponibles
      setAvailableOrders(prev => prev.filter(p => p.id !== pedido.id));
    } catch (error) {
      console.error("Error al aceptar pedido:", error);
    }
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
              <strong>Pedido #{order.id}</strong> <br />
              Cliente: {order.clienteNombre} <br />
              Comercio: {order.comercioNombre} - {order.comercioDireccion} <br />
              Entregar en: {order.direccion_entrega}
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
              <strong>Ruta #{route.id}</strong> <br />
              Cliente: {route.cliente} <br />
              Comercio: {route.comercio} <br />
              Desde: {route.pickupAddress} - Hasta: {route.deliveryAddress} <br />
              Estado: <Badge bg="secondary">{route.status}</Badge> - Tiempo estimado: {route.estimatedTime} minutos
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
