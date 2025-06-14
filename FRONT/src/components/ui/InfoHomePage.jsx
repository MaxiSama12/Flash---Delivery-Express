import AboutBackground from "../../Assets/homePage/about-background.png";
import AboutBackgroundImage from "../../Assets/homePage/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import "../../styles/home.css";

const InfoHomePage = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">Desde 2020</p>
        <h1 className="primary-heading">
          Haciendo tu Vida Más Fácil
        </h1>
        <p className="primary-text">
          Conectamos personas con lo que necesitan en minutos. Desde tus platos favoritos hasta productos esenciales, todo al alcance de un clic. Rápido, seguro y donde estés.
        </p>
        <p className="primary-text">
          Hacés el pedido y nosotros nos encargamos del resto.
        </p>
        <div className="about-buttons-container">
          <button className="secondary-button">Saber Más</button>
          <button className="watch-video-button">
            <BsFillPlayCircleFill /> Ver Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoHomePage;
