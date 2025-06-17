
import BannerBackground from "../../Assets/homePage/home-banner-background.png";
import BannerImage from "../../Assets/homePage/home-banner-image.png";
import { FiArrowRight } from "react-icons/fi";
import "../../styles/home.css"
import Navbar from "../layout/Navbar";

const HeroHomePage = () => {
  return (
    <div className="home-container">
      {/* <Navbar /> */}
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Tu Comida Favorita, Más Cerca Que Nunca
          </h1>
          <p className="primary-text">
            Tu delivery de confianza para todo: comidas, bebidas, farmacia, y lo que se te ocurra. Rápido, fácil y cuando lo necesitás.
          </p>
          <button className="secondary-button">
            Pedí ahora! <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroHomePage;
