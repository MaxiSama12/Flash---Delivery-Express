import { toast } from "react-toastify";
import { useCartStore } from "../../context/useCartStore";
import { AiFillStar } from "react-icons/ai";
import "../../styles/card.css";
import "../../styles/home.css";
import { useLocation, useNavigate } from "react-router-dom";

const Card = ({ producto }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  const isInCart = cart.some((item) => item.id_producto === producto.id_producto);

  const location = useLocation();
  const navigate = useNavigate();

  const isInsideComercioPage = location.pathname.startsWith("/comercios/");

  const handleAction = () => {
    if (isInsideComercioPage) {
      if (!isInCart) {
        addToCart(producto);
        console.log("producto agregado", producto);
        toast.success("Producto agregado al carrito");
      }
    } else {
      navigate(`/comercios/${producto.id_comercio}`);
    }
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={producto.url_imagen} alt={producto.nombre} />
        <div className="image-overlay">
          <button
            className="buy-button"
            onClick={handleAction}
            disabled={isInsideComercioPage && isInCart}
          >
            {isInsideComercioPage
              ? isInCart
                ? "Agregado"
                : "Comprar"
              : "Ver comercio"}
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
