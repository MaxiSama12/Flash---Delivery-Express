import React from "react";
import "../../styles/Carrito.css";

const Carrito = ({ carrito, finalizarCompra }) => {
  const total = carrito.reduce(
    (acc, prod) => acc + prod.precio * (prod.cantidad ?? 1),
    0
  );

  return (
    <div className="carrito-container">
      <h4 className="carrito-header">🛒 Carrito de compras</h4>

      {carrito.length === 0 ? (
        <p className="text-muted">El carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((producto, i) => (
  <div key={i} className="carrito-item">
    <div style={{ display: "flex", flexDirection: "column" }}>
      <strong>{producto.nombre}</strong>
      <span style={{ fontSize: "0.9rem", color: "#ccc", marginTop: "2px" }}>
        ${producto.precio} × {producto.cantidad}
      </span>
    </div>
    <strong>${producto.precio * producto.cantidad}</strong>
  </div>
))}
          <div className="carrito-total">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </>
      )}

      <button
        className="btn-finalizar"
        onClick={finalizarCompra}
        disabled={carrito.length === 0}
      >
        Finalizar compra
      </button>
    </div>
  );
};

export default Carrito;