import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { axiosInstance } from "../../router/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

export default function RepartidorDashboard() {
  const { id } = useParams();

  const [stats, setStats] = useState({
    totalDeliveries: 0,
    todayDeliveries: 0,
    totalEarnings: 0,
    activeRoutes: 0,
  });
  const [repartidor, setRepartidor] = useState({});
  const [pedidosDisponibles, setPedidosDisponibles] = useState([]);
  const [pedidosEntregar, setPedidosEntregar] = useState([]);
  const [pedidosEntregados, setPedidosEntregados] = useState([]);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const fetchPedidos = async () => {
    try {
      const resDisponibles = await axiosInstance.get("/pedidos-disponibles");
      setPedidosDisponibles(resDisponibles.data.pedidos);

      const resAsignados = await axiosInstance.get(`/pedidos-repartidor/${id}`);
      const todos = resAsignados.data.pedidos;

      const entregados = todos.filter((ped) => ped.estado === "entregado");
      const enCamino = todos.filter((ped) => ped.estado === "en camino");

      setPedidosEntregados(entregados);
      setPedidosEntregar(enCamino);

      const hoy = new Date().toISOString().split("T")[0];
      const entregasHoy = entregados.filter((p) =>
        p.fecha_pedido?.startsWith(hoy)
      );

      setStats({
        totalDeliveries: entregados.length,
        todayDeliveries: entregasHoy.length,
        totalEarnings: entregados.length * 5000,
        activeRoutes: enCamino.length,
      });
    } catch (err) {
      console.error("Error cargando pedidos", err);
    }
  };

  const logoutSesion = async () => {
    await logout();
    navigate("/");
  };

  const getRepartidor = async () => {
    try {
      const { data } = await axiosInstance.get(`/repartidor/${id}`);
      setRepartidor(data.resultado[0]);
    } catch (error) {
      console.error("Error cargando repartidor", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
    getRepartidor();
  }, []);

  const aceptarPedido = async (pedido) => {
    try {
      await axiosInstance.put(`/pedido/${pedido.id_pedido}/editar`, {
        id_repartidor: id,
        nuevo_estado: "en camino",
      });
      fetchPedidos();
    } catch (error) {
      console.error("Error al aceptar pedido", error);
    }
  };

  const marcarEntregado = async (id_pedido) => {
    try {
      await axiosInstance.put(`/pedido/${id_pedido}/editar`, {
        id_repartidor: id,
        nuevo_estado: "entregado",
      });
      fetchPedidos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="py-4" style={{backgroundImage:"url(https://watermark.lovepik.com/photo/20211203/large/lovepik-profile-portrait-of-a-young-man-picture_501462489.jpg)"}}>
      <div className="d-flex align-items-center mb-4">
        <div className="fs-1 me-3">
          Panel de Repartidor | {repartidor.nombre}
        </div>
        <Button
          className="p-2"
          variant="danger"
          onClick={() => logoutSesion()}
        >
          Cerrar Sesión
        </Button>
      </div>

      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center" style={{ minHeight: "120px" }}>
            <Card.Body>
              <Card.Title>Total Entregas</Card.Title>
              <h4>
                <Badge bg="primary">{stats.totalDeliveries}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" style={{ minHeight: "120px" }}>
            <Card.Body>
              <Card.Title>Hoy</Card.Title>
              <h4>
                <Badge bg="success">{stats.todayDeliveries}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" style={{ minHeight: "120px" }}>
            <Card.Body>
              <Card.Title>Ganancias</Card.Title>
              <h4>
                <Badge bg="warning">${stats.totalEarnings}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" style={{ minHeight: "120px" }}>
            <Card.Body>
              <Card.Title>Rutas Activas</Card.Title>
              <h4>
                <Badge bg="info">{stats.activeRoutes}</Badge>
              </h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Pedidos disponibles */}
        <Col md={12} lg={4}>
          <h3 className="mb-3">Pedidos Disponibles</h3>
          {pedidosDisponibles.length === 0 ? (
            <p>No hay pedidos disponibles</p>
          ) : (
            <ListGroup>
              {pedidosDisponibles.map((order) => (
                <ListGroup.Item key={order.id_pedido}>
                  <strong>Pedido #{order.id_pedido}</strong>
                  <br />
                  Recoger en: {order.direccion || "no hay"} <br />
                  Entregar en: {order.direccion_entrega || "no hay"} <br />
                  Recibe: {order.nombre_cliente}
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
        </Col>

        {/* Pedidos en camino */}
        <Col md={12} lg={4}>
          <h3 className="mb-3">Pedidos a entregar</h3>
          {pedidosEntregar.length === 0 ? (
            <p>No tienes rutas asignadas</p>
          ) : (
            <ListGroup>
              {pedidosEntregar.map((pedido) => (
                <ListGroup.Item key={pedido.id_pedido}>
                  
                  <strong>Pedido #{pedido.id_pedido}</strong>
                  <br />
                  Desde: {pedido.direccion} - Hasta: {pedido.direccion_entrega}
                  <br />
                  Estado:{" "}
                  <Badge
                    bg={pedido.estado === "entregado" ? "success" : "warning"} 
                  >
                    {pedido.estado}
                  </Badge>{" "} <br />
                  Tiempo estimado: {pedido.demora_promedio || "no hay"} minutos <br />
                   Recibe: {pedido.nombre_cliente}
                  <div className="mt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => marcarEntregado(pedido.id_pedido)}
                    >
                      Marcar como Entregado
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        {/* Pedidos entregados */}
        <Col md={12} lg={4}>
          <h3 className="mb-3">Pedidos entregados</h3>
          {pedidosEntregados.length === 0 ? (
            <p>No tienes pedidos entregados</p>
          ) : (
            <ListGroup>
              {pedidosEntregados.map((pedido) => (
                <ListGroup.Item key={pedido.id_pedido}>
                  <strong>Pedido #{pedido.id_pedido}</strong>
                  <br />
                  Entregado en: {pedido.direccion_entrega}
                  <br />
                  Estado: <Badge bg="success">{pedido.estado}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}
