import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function MisPedidos() {
  const { usuario } = useAuthStore();
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPedidos = async () => {
      if (!usuario) return;

      try {
        const resPedidos = await axios.get("http://localhost:3000/pedidos");
        const resComercios = await axios.get("http://localhost:3000/comercios");

        // Filtrar solo los pedidos del cliente logueado
        const pedidosCliente = resPedidos.data.filter(
          (pedido) => pedido.id_cliente === usuario.id
        );

        // Añadir nombre del comercio al pedido
        const pedidosConComercio = pedidosCliente.map((pedido) => {
          const comercio = resComercios.data.find(
            (com) => com.id === pedido.id_comercio
          );

          return {
            ...pedido,
            comercioNombre: comercio?.nombre || "Comercio desconocido",
          };
        });

        setPedidos(pedidosConComercio);
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
        <h2 className="text-center mb-4">Mis Pedidos</h2>

        {cargando ? (
          <p className="text-center">Cargando...</p>
        ) : pedidos.length === 0 ? (
          <p className="text-center">No tenés pedidos aún.</p>
        ) : (
          pedidos.map((pedido) => (
            <div className="d-flex justify-content-center">
            <div key={pedido.id} className="row card-horizontal p-3 mb-2">
              <h5>Pedido #{pedido.id}</h5>
              <p><strong>Comercio:</strong> {pedido.comercioNombre}</p>
              <p><strong>Dirección de entrega:</strong> {pedido.direccion_entrega}</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
            </div>
            </div>
          ))
        )}
      </div>
      <Footer />
      </div>
    </>
  );
}
