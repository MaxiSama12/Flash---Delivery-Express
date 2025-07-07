import BannerBackground from "../../Assets/homePage/home-banner-background.png";
import BannerImage from "../../Assets/homePage/inicio_img.png";
import { FiArrowRight } from "react-icons/fi";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

const HeroHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
            Tu <span className="en-delivery">Delivery</span> Favorito, Más
            Cerca Que Nunca
            <span className=" mt-3 en-flash">EN FLASH</span>
          </h1>
          <p className="primary-text">
            Tu delivery de confianza para todo: comidas, bebidas, farmacia, y lo
            que se te ocurra. Rápido, fácil y cuando lo necesitás.
          </p>
          <button
            className="secondary-button"
            onClick={() => navigate("/comercios")}
          >
            Pedí ahora! <FiArrowRight />
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
