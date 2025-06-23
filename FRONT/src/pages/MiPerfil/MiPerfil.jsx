import { useEffect, useState } from "react";
import axios from "axios";
import "../../pages/MiPerfil/miPerfil.css";
import { useAuthStore } from "../../store/authStore";
import { CLIENTES } from "../../endpoints/endpoints";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function MiPerfil() {
  const { usuario: usuarioGlobal, login } = useAuthStore();
  const [usuario, setUsuario] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoTelefono, setNuevoTelefono] = useState("");
  const [nuevoVehiculo, setNuevoVehiculo] = useState("");

  useEffect(() => {
    if (usuarioGlobal) {
      setUsuario(usuarioGlobal);
      setNuevoNombre(usuarioGlobal.nombre);
      setNuevoTelefono(usuarioGlobal.telefono);
      setNuevoVehiculo(usuarioGlobal.vehiculo || "");
    }
  }, [usuarioGlobal]);

  const guardarCambios = async () => {
    try {
      const patchData = {
        nombre: nuevoNombre,
        telefono: nuevoTelefono,
      };
      if (usuario.rol === "repartidor") {
        patchData.vehiculo = nuevoVehiculo;
      }

      const res = await axios.patch(`${CLIENTES}/${usuario.id}`, patchData);
      const usuarioActualizado = res.data;

      setUsuario(usuarioActualizado);
      login(usuarioActualizado);

      document.getElementById("cerrarModalBtn").click();
    } catch (error) {
      alert("Error al guardar cambios", error);
    }
  };

  if (!usuario) return <p className="cargando">Cargando perfil...</p>;

  return (
    <>
      <Navbar />
      <div className="perfil-container">
        <div className="perfil-card">
          <h2 className="perfil-titulo">Información de Usuario</h2>
          <div className="perfil-info">
            <p>
              <strong>Nombre:</strong>
              <div className="bloque-perfil">{usuario.nombre}</div>
            </p>
            <p>
              <strong>Email:</strong>
              <div className="bloque-perfil">{usuario.email}</div>
            </p>
            <p>
              <strong>Teléfono:</strong>
              <div className="bloque-perfil">{usuario.telefono}</div>
            </p>

            {usuario.direccion && (
              <p className="mb-1">
                <strong>Dirección:</strong>{" "}
                <div className="bloque-perfil">{usuario.direccion}</div>
              </p>
            )}
            {usuario.rol === "repartidor" && usuario.vehiculo && (
              <p>
                <strong>Vehículo:</strong>{" "}
                <div className="bloque-perfil"> {usuario.vehiculo}</div>
              </p>
            )}
            <p>
              <strong>Rol:</strong>{" "}
              <div className="bloque-perfil">
                {usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)}
              </div>
            </p>
            {/* <button
              className="btn btn-primary mt-3"
              data-bs-toggle="modal"
              data-bs-target="#editarModal"
            >
              Editar Perfil
            </button> */}
          </div>

          {/* Modal Bootstrap */}
          <div className="modal fade" id="editarModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Perfil</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                    id="cerrarModalBtn"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label>Nombre:</label>
                    <input
                      className="form-control"
                      value={nuevoNombre}
                      onChange={(e) => setNuevoNombre(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Teléfono:</label>
                    <input
                      className="form-control"
                      value={nuevoTelefono}
                      onChange={(e) => setNuevoTelefono(e.target.value)}
                    />
                  </div>
                  {usuario.rol === "repartidor" && (
                    <div className="mb-3">
                      <label>Vehículo:</label>
                      <input
                        className="form-control"
                        value={nuevoVehiculo}
                        onChange={(e) => setNuevoVehiculo(e.target.value)}
                      />
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-success" onClick={guardarCambios}>
                    Guardar cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
