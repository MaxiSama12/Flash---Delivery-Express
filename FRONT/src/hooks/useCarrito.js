import { useState } from "react";

const useCarrito = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarProducto = (producto) => {
    const index = carrito.findIndex((p) => p.nombre === producto.nombre);

    if (index !== -1) {
      
      const nuevoCarrito = carrito.map((item, i) =>
        i === index ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCarrito(nuevoCarrito);
    } else {
     
      const nuevoItem = { ...producto, cantidad: 1 };
      setCarrito([...carrito, nuevoItem]);
    }
  };

  const quitarProducto = (producto) => {
    const index = carrito.findIndex((p) => p.nombre === producto.nombre);

    if (index !== -1) {
      const item = carrito[index];

      if (item.cantidad > 1) {
        //PARA RESTAR CANTIDAD
        const nuevoCarrito = carrito.map((item, i) =>
          i === index ? { ...item, cantidad: item.cantidad - 1 } : item
        );
        setCarrito(nuevoCarrito);
      } else {
        //ELIMINA EL PRODUCTO SI LA CANTIDAD ES 0
        const nuevoCarrito = carrito.filter((_, i) => i !== index);
        setCarrito(nuevoCarrito);
      }
    }
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    alert("¡Gracias por tu compra!");
    setCarrito([]);
  };

  return {
    carrito,
    agregarProducto,
    quitarProducto,
    finalizarCompra
  };
};

export default useCarrito;
