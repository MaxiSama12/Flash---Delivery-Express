import React from "react";
import "../../styles/sectionRegister.css";
import { Link } from "react-router-dom";

const SectionRegister = () => {
  return (
    <section className="services-section">
      <div className="container">
        <div className="title-container">
          <h1 className="title-register text-center">
            Únete a <span className="highlight">Flash</span>
          </h1>
        </div>
        <div className="services-container">
          <div className="service-card">
            <img
              src="https://www.buzina.pt/wp-content/uploads/2019/10/online-shopping.jpg"
              alt="restaurante"
              className="service-img"
            />
            <h3>¡Regístrate y comprá!</h3>
            <p>
              Descubre los <b>beneficios</b> que tienen los
              <b> +40.000 aliados</b> en <b>9 países </b>
              que ya trabajan con <b>Flash</b>.
            </p>
            <div className="d-grid mx-2">
              <Link
                to="/register-cliente"
                className="btn btn-outline-success btn-lg mb-2"
              >
                ¡Regístrate ya!
              </Link>
            </div>
          </div>
          <div className="service-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX7Xu1qOVNmYXiYrlcX2awwa6u0pBmo5BO4g&s"
              alt="Comercio"
              className="service-img"
            />
            <h3>¡Registra tu comercio!</h3>
            <p>
              Accede a <b>millones</b> de usuarios de <b>Flash</b> y disfrute de
              una <b>logística inmediata</b> sin salir de tu tienda.
            </p>
            <div className="d-grid mx-2">
              <Link
                to="/register-vendedor-comercio"
                className="btn btn-outline-success btn-lg mb-2"
              >
                ¡Regístrate ya!
              </Link>
            </div>
          </div>
          <div className="service-card">
            <img
              src="https://cdn.restauracionnews.com/2022/08/delivery-restaurante-consejos.jpg"
              alt="delivery"
              className="service-img"
            />
            <h3>¡Únete como repartidor!</h3>
            <p>
              Gana <b>dinero extra</b> entregando pedidos a domicilio, tenemos las mejores
              tarifas y beneficios.
            </p>
            <div className="d-grid mx-2">
              <Link
                to="/register-repartidor"
                className="btn btn-outline-success btn-lg mb-2"
              >
                ¡Regístrate ya!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRegister;
