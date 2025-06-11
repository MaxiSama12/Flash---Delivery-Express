import { AiFillStar } from "react-icons/ai";
import image from "../../assets/homePage/about-background-image.png";
import "../../styles/card.css";
import "../../styles/home.css";

const CatalogoHomePage = () => {
  return (
    <div className="home-container">
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
          Food Is An Important Part Of A Balanced Diet
        </h1>
        <div className="card">
          <div className="card-image">
            <img src={image} alt={""} />
            <div className="rating">
              <AiFillStar className="star" /> {"4.5"}
            </div>
          </div>
          <div className="card-content">
            <h3 className="title">{"Burger Indiapolis"}</h3>
            <p className="description">{"Delicious burger with a unique twist."}</p>
            <p className="price">${"12.99"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogoHomePage;
