import "../../styles/card.css";
import "../../styles/home.css";
import { AiFillStar } from "react-icons/ai";

const Card = ({ producto }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={producto.url_imagen} alt={producto.nombre} />
        <div className="image-overlay">
          <button className="buy-button">Comprar</button>
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
