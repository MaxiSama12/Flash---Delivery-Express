import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { axiosInstance } from "../../router/axiosInstance";
import { Col, ListGroup } from "react-bootstrap";
import "../../styles/MisPedidos.css";

export default function MisPedidos() {
  const usuario = useAuthStore((state) => state.usuario);
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!usuario) return;

      try {
        const { data } = await axiosInstance.get(
          `/pedidos-cliente/${usuario.id_cliente}`
        );
        setPedidos(data.pedidos);
      } catch (error) {
        console.error("Error al traer pedidos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchPedidos();
  }, [usuario]);

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        <div className="container flex-fill mt-5 pt-4">
          {" "}
          <br />
          {cargando ? (
            <p className="text-center">Cargando...</p>
          ) : pedidos.length === 0 ? (
            <p className="text-center">No tenés pedidos aún.</p>
          ) : (
            <Col md={12}>
              {pedidos.length === 0 ? (
                <p>No hay pedidos disponibles</p>
              ) : (
                <ListGroup>
                  <h2 className="tus-pedidos-title  tus-pedidos my-4 text-center ">
                    Tus Pedidos
                  </h2>
                  {pedidos.map((order) => (
                    <ListGroup.Item
                      key={order.id_pedido}
                      className="mis-pedidos"
                    >
                      <div>
                        <strong>Pedido de #{order.id_pedido}</strong> - $
                        {order.monto_total || "no existe"}
                        <br />
                        <b>Compra realizada en:</b>{" "}
                        {order.nombre_comercio || "no hay"} <br />
                        <b>Direccion entrega:</b>{" "}
                        {order.direccion_entrega || "no hay"} <br />
                        <b>Estado del pedido: </b>
                        <span
                          className={`ping-container ${
                            order.estado === "entregado"
                              ? "ping-green"
                              : order.estado === "en camino"
                              ? "ping-orange"
                              : order.estado === "completado"
                              ? "ping-yellow"
                              : order.estado === "pendiente"
                              ? "ping-red"
                              : "no hay"
                          }`}
                        ></span>{" "}
                        {order.estado}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
