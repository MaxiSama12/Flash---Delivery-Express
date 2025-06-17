import { toast } from "react-toastify";
import { useCartStore } from "../../context/useCartStore";
import { AiFillStar } from "react-icons/ai";
import "../../styles/card.css";
import "../../styles/home.css";

const Card = ({ producto, onAddToCartAnimation }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  const isInCart = cart.some((item) => item.id === producto.id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(producto);
      toast.success("Producto agregado al carrito");
      onAddToCartAnimation();
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={producto.url_imagen} alt={producto.nombre} />
        <div className="image-overlay">
          <button
            className="buy-button"
            onClick={handleAddToCart}
            disabled={isInCart}
          >
            {isInCart ? "Agregado" : "Comprar"}
          </button>
        </div>
        <div className="rating">
          <AiFillStar className="star" /> {producto.rating}
        </div>
      </div>
      <div className="card-content">
        <h3 className="title">{producto.nombre}</h3>
        <p className="description">{producto.descripcion}</p>
        <div className="card-content-price">
          <p className="price">${producto.precio}</p>
        </div>
      </div>
    </div>
  );
};


export default Card;
