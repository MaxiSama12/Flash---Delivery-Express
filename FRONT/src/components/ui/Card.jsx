import "../../styles/card.css";
import "../../styles/home.css";
import { AiFillStar } from "react-icons/ai";

const Card = ({ title, description, price, stars, urlImage }) => {
  return (
   <div className="card">
  <div className="card-image">
    <img src={urlImage} alt={title} />
    <div className="image-overlay">
      <button className="buy-button">Comprar</button>
    </div>
    <div className="rating">
      <AiFillStar className="star" /> {stars}
    </div>
  </div>
  <div className="card-content">
    <h3 className="title">{title}</h3>
    <p className="description">{description}</p>
    <div className="card-content-price">
      <p className="price">${price}</p>
    </div>
  </div>
</div>

  );
};

export default Card;
