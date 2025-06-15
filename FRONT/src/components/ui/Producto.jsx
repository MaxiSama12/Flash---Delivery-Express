import React from "react";
import "../../styles/Producto.css";

const Producto = ({ producto, agregar, quitar }) => (
  <div className="producto-card">
    <div className="d-flex flex-column justify-content-between h-100">
      <div>
        <h5 className="producto-title">{producto.nombre}</h5>
        <p className="producto-price">
          Precio: <span>${producto.precio}</span>
        </p>
      </div>
      <div className="producto-buttons mt-auto">
        <button className="btn-add" onClick={() => agregar(producto)}>
          ➕ Añadir
        </button>
        <button className="btn-remove" onClick={() => quitar(producto)}>
          🗑️ Quitar
        </button>
      </div>
    </div>
  </div>
);

export default Producto;


