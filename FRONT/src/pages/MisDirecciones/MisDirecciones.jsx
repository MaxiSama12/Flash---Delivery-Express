import { useEffect, useState } from "react";
import ModalAgregarDireccion from "../MisDirecciones/ModalAgregarDirecciones";
import "../../pages/MisDirecciones/misDirecciones.css";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import axios from "axios";
import { useAuthStore } from "../../store/authStore";

export default function MisDirecciones() {
  const usuario = useAuthStore((state) => state.usuario);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [direcciones, setDirecciones] = useState([]);

  // Obtener direcciones al cargar el componente
  useEffect(() => {
    if (!usuario?.id) return;

    const obtenerDirecciones = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/clientes/${usuario.id}`);
        const cliente = res.data;

        // Agregamos la dirección principal al principio
        const direccionesCompletas = [
          {
            direccion: cliente.direccion,
            etiqueta: "Principal",
            telefono: cliente.telefono,
            referencias: "",
          },
          ...(cliente.direcciones || []),
        ];

        setDirecciones(direccionesCompletas);
      } catch (error) {
        console.error("Error al obtener direcciones:", error);
      }
    };

    obtenerDirecciones();
  }, [usuario?.id]);

  const agregarDireccion = async (nuevaDireccion) => {
    try {
      const res = await axios.get(`http://localhost:3000/clientes/${usuario.id}`);
      const cliente = res.data;

      const nuevasDirecciones = [...(cliente.direcciones || []), nuevaDireccion];

      await axios.patch(`http://localhost:3000/clientes/${usuario.id}`, {
        direcciones: nuevasDirecciones,
      });

      setDirecciones((prev) => [...prev, nuevaDireccion]);
      setMostrarModal(false);
    } catch (error) {
      console.error("Error agregando dirección:", error);
    }
  };

  const eliminarDireccion = async (index) => {
    try {
      const res = await axios.get(`http://localhost:3000/clientes/${usuario.id}`);
      const cliente = res.data;

      const direccionesExistentes = cliente.direcciones || [];

      // Restamos 1 porque la primera es la principal
      const nuevasDirecciones = direccionesExistentes.filter((_, i) => i !== index - 1);

      await axios.patch(`http://localhost:3000/clientes/${usuario.id}`, {
        direcciones: nuevasDirecciones,
      });

      // También actualizamos el estado local
      setDirecciones((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error eliminando dirección:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        <div className="container flex-fill" style={{ paddingTop: "100px" }}>
          <h2 className="text-center my-4">Mis direcciones</h2>

          <div className="mb-4">
            {direcciones.length === 0 && (
              <p className="text-center">No tienes direcciones cargadas.</p>
            )}

            {direcciones.map((dir, index) => (
              dir && (
                <div className="d-flex justify-content-center">
                <div key={index} className="row card-horizontal p-3 mb-2"
                style={{ maxWidth: "500px", width: "100%" }}>
                  <strong>{dir.etiqueta || "Sin etiqueta"}</strong>
                  <p>{dir.direccion}</p>
                  {dir.telefono && <p><strong>Teléfono:</strong> {dir.telefono}</p>}
                  {dir.referencias && <p><strong>Referencias:</strong> {dir.referencias}</p>}

                  {dir.etiqueta !== "Principal" && (
                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() => eliminarDireccion(index)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
                </div>
              )
            ))}
          </div>

          <div className="text-center">
            <button className="btn btn-dark" onClick={() => setMostrarModal(true)}>
              Agregar dirección
            </button>
          </div>

          {mostrarModal && (
            <ModalAgregarDireccion
              cerrarModal={() => setMostrarModal(false)}
              onAgregar={agregarDireccion}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

