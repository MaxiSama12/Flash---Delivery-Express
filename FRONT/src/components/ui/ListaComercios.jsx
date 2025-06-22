import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/ListaComercios.css";
// import axios from "axios";
// import { COMERCIOS } from "../../endpoints/endpoints";
import { axiosInstance } from "../../router/axiosInstance";
import { FaStopwatch } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa6";

const ListaComerciosPage = () => {
  const [comercios, setComercios] = useState([]);

  const getComercios = async () => {
    try {
      const { data } = await axiosInstance.get("/comercios");
      setComercios(data.comercios);
      console.log(data);
    } catch (error) {
      console.error("Error al obtener los restaurantes:", error);
    }
  };

  useEffect(() => {
    getComercios();
  }, []);

  return (
    <div className="restaurant-list">
      <h1 className="title-register text-center">
        <span className="highlight" style={{ fontSize: "3rem" }}>
          ¡Nuestros Comercios!
        </span>{" "}
        <br /> <br />
      </h1>
      <h3>{comercios.length} comercios</h3>
      {comercios.map((comercio) => (
        <Link
          to={`${comercio.id_comercio}`}
          key={comercio.id_comercio}
          className="restaurant-item"
        >
          <div className="logo">
            <img
              src={`${comercio.url_imagen}`}
              alt={comercio.nombre}
              // width={60}
            />
          </div>
          <div className="info">
            <p className="h4 my-2">{comercio.nombre_comercio}</p>
            <p>
              <FaStopwatch />{comercio.demora_promedio ? (" " +comercio.demora_promedio) : " no tiene" } 
              <br /> 
              <span><FaBriefcase />{" " + comercio.nombre_rubro}</span>
              <p style={{ color: comercio.activo ? "green" : "red" }}>
                {comercio.activo ? "Abierto" : "Cerrado"}{" "}
              </p>
            </p>
          </div>
          <span style={{ color: "goldenrod", fontSize: "1rem" }}>
            ★{comercio.rating ? comercio.rating : "sin calificacion"}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ListaComerciosPage;
