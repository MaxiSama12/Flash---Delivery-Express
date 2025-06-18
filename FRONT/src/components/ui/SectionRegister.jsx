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
              src="https://www.menuspararestaurantes.com/wp-content/uploads/2018/02/restaurantes-exitosos.jpg"
              alt="restaurante"
              className="service-img"
            />
            <h3>Registra tu restaurante</h3>
            <p>
              Descubre los beneficios que tienen los +40.000 aliados en 9 países
              que ya trabajan con Flash.
            </p>
            <div className="d-grid mx-2">
              <Link
                to="/register-vendedor"
                className="btn btn-outline-success btn-lg mb-2"
              >
                Regístrate ya!
              </Link>
            </div>
          </div>
          <div className="service-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX7Xu1qOVNmYXiYrlcX2awwa6u0pBmo5BO4g&s"
              alt="Comercio"
              className="service-img"
            />
            <h3>Registra tu comercio</h3>
            <p>
              Accede a millones de usuarios de Flash y disfrute de una logística
              inmediata sin salir de tu tienda.
            </p>
            <div className="d-grid mx-2">
              <Link
                to="/register-vendedor"
                className="btn btn-outline-success btn-lg mb-2"
              >
                Regístrate ya!
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
              Gana dinero extra entregando domicilios, tenemos las mejores
              tarifas y beneficios.
            </p>
            <div className="d-grid mx-2">
              <Link
                to="/register-repartidor"
                className="btn btn-outline-success btn-lg mb-2"
              >
                ¡Regístrate ahora!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionRegister;
