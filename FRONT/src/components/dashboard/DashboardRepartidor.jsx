import React, { useState } from "react";
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
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function RepartidorDashboard() {
  const { id } = useParams();

  const [stats, setStats] = useState({
    totalDeliveries: 0,
    todayDeliveries: 0,
    totalEarnings: 0,
    activeRoutes: 0,
  });

  const [pedidosDisponibles, setPedidosDisponibles] = useState([]);
  // const [pedidosRepartidor, setPedidosRepartidor] = useState([]);
  const [pedidosEntregar, setPedidosEntregar] = useState([]);
  const [pedidosEntregados, setPedidosEntregados] = useState([]);

  const fetchPedidos = async () => {
    try {
      console.log("id de rep", id);
      const resDisponibles = await axiosInstance.get("/pedidos-disponibles");
      console.log("disponibles", resDisponibles);
      setPedidosDisponibles(resDisponibles.data.pedidos);
      const resAsignados = await axiosInstance.get(
        `/pedidos-repartidor/${id}`
      );
      setPedidosEntregar(
        resAsignados.data.pedidos.filter((ped) => ped.estado === "en camino")
      );
      setPedidosEntregados(
        resAsignados.data.pedidos.filter((ped) => ped.estado === "entregado")
      );
    } catch (err) {
      console.error("Error cargando pedidos", err);
    }
  };
  useEffect(() => {
    fetchPedidos();
  }, []);

  // const [myRoutes, setMyRoutes] = useState([]);

  const aceptarPedido = async (pedido) => {
    try {
      await axiosInstance.put(`/pedido/${pedido.id_pedido}/editar`, {
        id_repartidor: id,
        nuevo_estado: "en camino",
      });
      // const res = await axiosInstance.get(`/pedidos-repartidor/${id}`);
      // setPedidosEntregar(
      //   res.data.pedidos.filter((ped) => ped.estado === "en camino")
      // );
      // setPedidosEntregados(
      //   res.data.pedidos.filter((ped) => ped.estado === "entregado")
      // );
      // console.log(res.data.pedidos);
      // const { data } = await axiosInstance.get("/pedidos-disponibles");
      // setPedidosDisponibles(data.pedidos);
      fetchPedidos();
    } catch (error) {
      console.error("Error cargando pedidos", error);
    }

    // const nuevaRuta = {
    //   id: Math.floor(Math.random() * 1000) + 200,
    //   pickupAddress: pedido.comercioAddress,
    //   deliveryAddress: pedido.deliveryAddress,
    //   estimatedTime: 30,
    //   status: 'asignada',
    //   total: pedido.total,
    // };

    // setMyRoutes((prevRoutes) => [...prevRoutes, nuevaRuta]);

    // setStats((prev) => ({
    //   ...prev,
    //   totalEarnings: prev.totalEarnings + pedido.total,
    //   activeRoutes: prev.activeRoutes + 1,
    // }));
  };

  const marcarEntregado = async (id) => {
    try {
      await axiosInstance.put(`/pedido/${id}/editar`, {
        id_repartidor: id,
        nuevo_estado: "entregado",
      });
      // const res = await axiosInstance.get(`/pedidos-repartidor/${id}`);
      // setPedidosEntregados(
      //   res.data.pedidos.filter((ped) => ped.estado === "entregado")
      // );
      fetchPedidos();
    } catch (error) {
      console.log(error);
    }

    // setStats((prev) => ({
    //   ...prev,
    //   totalDeliveries: prev.totalDeliveries + 1,
    //   todayDeliveries: prev.todayDeliveries + 1,
    //   activeRoutes: prev.activeRoutes > 0 ? prev.activeRoutes - 1 : 0,
    // }));
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-primary">Panel de Repartidor</h2>
      {/* <h2 className="fs-1 mb-1 ">Bienvenido/a {comercio.nombre_admin}</h2> */}

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
      <div className="row">
        <div className="col-4">
          <h3 className="mb-3">Pedidos Disponibles</h3>
          {pedidosDisponibles.length === 0 ? (
            <p>No hay pedidos disponibles</p>
          ) : (
            <ListGroup>
              {pedidosDisponibles.map((order) => (
                <ListGroup.Item key={order.id_pedido}>
                  <strong>Pedido #{order.id_pedido}</strong> - $
                  {order.total || "no existe"}
                  <br />
                  Recoger en: {order.direccion || "no hay"} <br />
                  Entregar en: {order.direccion_entrega || "no hay"}
                  <br />
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
        </div>
        <div className="col-4">
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
                    bg={pedido.estado === "entregado" ? "success" : "secondary"}
                  >
                    {pedido.estado}
                  </Badge>{" "}
                  - Tiempo estimado: {pedido.tiempo_demora || "no hay"} minutos
                  {pedido.estado !== "entregado" && (
                    <div className="mt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => marcarEntregado(pedido.id_pedido)}
                      >
                        Marcar como Entregado
                      </Button>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
        <div className="col-4">
          <h3 className="mb-3">Pedidos entregados</h3>
          {pedidosEntregados.estado === "entregado" &&
          pedidosEntregados.length === 0 ? (
            <p>No tienes pedidos entregados</p>
          ) : (
            <ListGroup>
              {pedidosEntregados.map((pedido) => (
                <ListGroup.Item key={pedido.id_pedido}>
                  <strong>Pedido #{pedido.id_pedido}</strong>
                  <br />
                  Entregado en: {pedido.direccion_entrega}
                  <br />
                  Estado:{" "}
                  <Badge
                    bg={pedido.estado === "entregado" ? "success" : "secondary"}
                  >
                    {pedido.estado}
                  </Badge>{" "}
                  - Tiempo estimado: {pedido.tiempo_demora || "no hay"} minutos
                  {pedido.estado !== "entregado" && (
                    <div className="mt-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => marcarEntregado(pedido.id_pedido)}
                      >
                        Marcar como Entregado
                      </Button>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </div>
      </div>
    </Container>
  );
}
