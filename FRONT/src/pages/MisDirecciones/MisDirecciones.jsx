import { useState } from "react";
import ModalAgregarDireccion from "../MisDirecciones/ModalAgregarDirecciones";
import "../../pages/MisDirecciones/misDirecciones.css";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function MisDirecciones() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [direcciones, setDirecciones] = useState([]);

  const agregarDireccion = (nuevaDireccion) => {
    setDirecciones([...direcciones, nuevaDireccion]);
    setMostrarModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="d-flex flex-column min-vh-100">
        <div className="container flex-fill" style={{ paddingTop: "100px" }}>
          <h2 className="text-center my-4">Mis direcciones</h2>

          <div className="mb-4">
            {direcciones.map((dir, index) => (
              <div key={index} className="card p-3 mb-2">
                <strong>{dir.etiqueta}</strong>
                <p>{dir.direccion}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="btn btn-danger"
              onClick={() => setMostrarModal(true)}
            >
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
