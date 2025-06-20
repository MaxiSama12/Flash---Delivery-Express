import { FaCartShopping } from "react-icons/fa6";
import "../../styles/cart.css";
import { Button } from "react-bootstrap";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { useCartStore } from "../../context/useCartStore";
import { useLogin } from "../../context/useLogin";
import { IoRemoveSharp } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";

const CartItem = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <li className="cart-item">
      <img src={product.url_imagen} alt={product.nombre} />
      <div>
        <strong>{product.nombre}</strong> -{" "}
        <span>${product.precio * product.cantidad}</span>
      </div>

      <footer>
        <small>Cantidad: {product.cantidad}</small>
        <div className="d-flex justify-content-between">
          <div className="">
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => decreaseQuantity(product.id)}
            >
              <IoRemoveSharp />
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => addToCart(product)}
            >
              <IoAdd />
            </Button>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeFromCart(product.id)}
          >
            Quitar
          </Button>
        </div>
      </footer>
    </li>
  );
};

const Cart = ({ isBouncing }) => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const total = useCartStore((state) => state.total)();
  const itemsCount = useCartStore((state) => state.itemsCount)();
  const idCliente = useLogin((state) => state.id);
  const direccionCliente = useLogin((state) => state.direccion);

  const handleCheckout = async () => {
    if (!idCliente) {
      toast.warn("Debes iniciar sesión para realizar una compra");
      return;
    }
    const pedidoPayload = {
      fecha_pedido: new Date().toISOString(),
      estado: "pendiente",
      direccion_entrega: direccionCliente || "No existe dirección",
      id_cliente: idCliente,
      id_repartidor: null,
      id_comercio: cart[0]?.id_comercio,
      productos: cart.map((item) => ({
        id_producto: item.id,
        cantidad: item.cantidad,
      })),
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/pedidos",
        pedidoPayload
      );
      const id_pedido = response.data.id;

      for (const item of cart) {
        await axios.post("http://localhost:3000/pedido_producto", {
          id_pedido,
          id_producto: item.id,
          cantidad: item.cantidad,
          status: "pendiente", // <--- aseguramos estado inicial
        });
      }

      await axios.post("http://localhost:3000/pagos", {
        metodo: "efectivo",
        monto: total,
        fecha_pago: new Date().toISOString(),
        id_pedido,
      });

      toast.success("Pedido creado con éxito");
      clearCart();
    } catch (err) {
      console.error("Error al crear pedido:", err);
      toast.error("No se pudo completar el pedido");
    }
  };

  return (
    <div>
      <input id="cart-item" type="checkbox" hidden />

      <aside className="cart">
        <h4>Carrito</h4>
        <ul>
          {cart.length === 0 && <p>Tu carrito está vacío</p>}
          {cart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>

        {cart.length > 0 && (
          <div className="d-flex gap-2 flex-column">
            <h5 className="text-center">Total: ${total}</h5>
            <Button
              variant="success"
              className="d-flex align-items-center justify-content-center gap-2"
              onClick={handleCheckout}
            >
              <BsCash />
              Pagar
            </Button>
            <Button
              variant="danger"
              className="d-flex align-items-center justify-content-center gap-2"
              onClick={clearCart}
            >
              <MdOutlineRemoveShoppingCart />
              Vaciar
            </Button>
          </div>
        )}
      </aside>

      <label
        className={`cart-button ${isBouncing ? "animate" : ""}`}
        htmlFor="cart-item"
      >
        <FaCartShopping />
        {itemsCount > 0 && <span className="cart-badge">{itemsCount}</span>}
      </label>
    </div>
  );
};

export default Cart;
