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
      console.log("usuario id", usuario);
      try {
        const { data } = await axiosInstance.get(
          `/pedidos-cliente/${usuario.id_cliente}`
        );
        // const resComercios = await axiosInstance.get(
        //   "http://localhost:3000/comercios"
        // );

        // // Filtrar solo los pedidos del cliente logueado
        // const pedidosCliente = resPedidos.data.filter(
        //   (pedido) => pedido.id_cliente === usuario.id
        // );

        // // Añadir nombre del comercio al pedido
        // const pedidosConComercio = pedidosCliente.map((pedido) => {
        //   const comercio = resComercios.data.find(
        //     (com) => com.id === pedido.id_comercio
        //   );

        //   return {
        //     ...pedido,
        //     comercioNombre: comercio?.nombre || "Comercio desconocido",
        //   };
        // });

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
                <ListGroup >
                  <h2 className="text-center mb-4">Tus Pedidos</h2>
                  {pedidos.map((order) => (
                    <ListGroup.Item key={order.id_pedido} className="mis-pedidos">
                      <div >
                        <strong>Pedido de #{order.id_pedido}</strong> - $
                        {order.monto_total || "no existe"}
                        <br />
                        <b>Compra realizada en:</b>{" "}
                        {order.nombre_comercio || "no hay"} <br />
                        <b>Direccion entrega:</b>{" "}
                        {order.direccion_entrega || "no hay"} <br />
                        <b>Estado del pedido:</b> {order.estado}
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
