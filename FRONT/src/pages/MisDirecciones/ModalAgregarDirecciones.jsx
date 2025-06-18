import { useState } from "react";

export default function ModalAgregarDireccion({ cerrarModal, onAgregar }) {
  const [direccion, setDireccion] = useState("");
  const [piso, setPiso] = useState("");
  const [referencias, setReferencias] = useState("");
  const [telefono, setTelefono] = useState("");
  const [etiqueta, setEtiqueta] = useState("Casa");

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaDireccion = {
      direccion: `${direccion}${piso ? `, Piso ${piso}` : ""}`,
      referencias,
      telefono,
      etiqueta,
    };
    onAgregar(nuevaDireccion);
  };

  return (
    <div
      className="show d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "",
        height: "100vh",
        zIndex: 1050,
      }}
    >
      <div
        className="modal-content p-4 rounded shadow bg-white"
        style={{ maxWidth: "500px", width: "100%", position: "relative" }}
      >
        <button
          onClick={cerrarModal}
          className="btn-close position-absolute"
          style={{ top: "1rem", right: "1rem" }}
        ></button>

        <h5 className="mb-4 text-center fw-bold">Agregar dirección</h5>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Dirección*"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Piso / Departamento"
            value={piso}
            onChange={(e) => setPiso(e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Referencias / Indicaciones"
            value={referencias}
            onChange={(e) => setReferencias(e.target.value)}
          />

          <div className="input-group mb-3">
            <span className="input-group-text">+54</span>
            <input
              type="tel"
              className="form-control"
              placeholder="Número de celular*"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <label className="form-label">¿Qué nombre le damos a esta dirección?</label>
          <div className="btn-group w-100 mb-3" role="group">
            {["Casa", "Trabajo", "Otro"].map((op) => (
              <button
                type="button"
                key={op}
                className={`btn btn-outline-secondary ${
                  etiqueta === op ? "active" : ""
                }`}
                onClick={() => setEtiqueta(op)}
              >
                {op}
              </button>
            ))}
          </div>

          <button type="submit" className="btn btn-danger w-100">
            Agregar dirección
          </button>
        </form>
      </div>
    </div>
  );
}