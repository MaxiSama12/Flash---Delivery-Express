import { FaCartShopping } from "react-icons/fa6";
import "../../styles/cart.css";
import { Button } from "react-bootstrap";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { BsCash } from "react-icons/bs";
import { useCartStore } from "../../context/useCartStore";
import { IoRemoveSharp } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";

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
              onClick={() => {
                console.log("contenido del carrito", cart);
              }}
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
