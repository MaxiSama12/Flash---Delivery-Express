import React from "react";
import Producto from "../components/ui/Producto";
import Carrito from "../components/ui/Carrito";
import useCarrito from "../hooks/useCarrito";
import "../styles/Tienda.css";

const productos = [
  { nombre: "Producto A", precio: 500 },
  { nombre: "Producto B", precio: 2000 },
  { nombre: "Producto C", precio: 1550 },
  { nombre: "Producto D", precio: 800 },
  { nombre: "Producto E", precio: 1200 },
  { nombre: "Producto F", precio: 900 }
];

const Tienda = () => {
  const { carrito, agregarProducto, quitarProducto, finalizarCompra } = useCarrito();

  return (
    <div className="tienda-wrapper">
      <div className="text-center mb-4">
        <img
          src="/logo-flash.png"
          alt="Logo Flash"
          className="tienda-logo"
        />
        <h1 className="tienda-header">TIENDA</h1>
      </div>

      <div className="tienda-scroll">
        {productos.map((producto, i) => (
          <div
            key={i}
            style={{
              flex: "0 0 auto",
              width: "320px",
              scrollSnapAlign: "start"
            }}
          >
            <Producto
              producto={producto}
              agregar={agregarProducto}
              quitar={quitarProducto}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 px-3">
        <Carrito carrito={carrito} finalizarCompra={finalizarCompra} />
      </div>
    </div>
  );
};

export default Tienda;


