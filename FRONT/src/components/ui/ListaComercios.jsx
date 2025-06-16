import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/ListaComercios.css";
import axios from "axios";
import { COMERCIOS } from "../../endpoints/endpoints";

const restaurants = [
  {
    id: 1,
    name: "Farmacia Del Pueblo",
    image:
      "https://images.rappi.com.ar/marketplace/store_type_1626975357300.jpg",
    category: "Farmacia",
    time: "25-40 min",
    shipping: "$1.789",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Librería San Pablo",
    image:
      "https://recursos-we-us-east-1.s3.amazonaws.com/Weyop/LSP/Contenidos/2024-08-15%2015%3A25%3A51/descarga%20%284%29.png",
    category: "Librería",
    time: "40-60 min",
    shipping: "$2.269",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Supermercado Vea",
    image:
      "https://www.webretail.com.ar/wp-content/uploads/2023/04/Vea-Cencosud.jpg",
    category: "Supermercado",
    time: "40-60 min",
    shipping: "$1.789",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Mc Donald's",
    image:
      "https://cdn.aarp.net/content/dam/aarpe/es/home/trabajo/pequenos-negocios/info-2021/comprar-franquicia-de-McDonalds/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/container_image/articlecontentfragment/cfimage.coreimg.50.932.jpeg/content/dam/aarp/work/work_at_plus/2021/09/1140-mcdonalds-esp.jpg",
    category: "Comida Rápida",
    time: "45-65 min",
    shipping: "$1.789",
    rating: 4.7,
  },
  {
    id: 5,
    name: "La Pizzada",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0D7HfefHBN8fEVhms12IV_7Wfx7mBbwqANg&s",
    category: "Pizzería",
    time: "15-30 min",
    shipping: "$1.219",
    rating: 4.3,
  },
];

const ListaComerciosPage = () => {
  const [comercios, setComercios] = useState([]);

  const getComercios = async () => {
    try {
      const res = await axios.get(COMERCIOS);
      setComercios(res.data);
      console.log(res.data);
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
         <span className="highlight" style={{fontSize:"3rem"}}>¡Nuestros Comercios!</span> <br /> <br />
      </h1>
      <h3>{comercios.length} comercios</h3>
      {comercios.map((comercio) => (
        <Link
          to={`${comercio.id}`}
          key={comercio.id}
          className="restaurant-item"
        >
          <div className="logo">
            <img
              src={`${comercio.url_imagen}`}
              alt={comercio.nombre}
              width={60}
            />
          </div>
          <div className="info">
            <strong>{comercio.nombre}</strong>
            <p>
              {comercio.time} <br /> <b>{comercio.telefono}</b>
              <p style={{ color: comercio.activo ? "green" : "red" }}>
                {comercio.activo ? "Abierto" : "Cerrado"}{" "}
              </p>
            </p>
          </div>
          <span style={{ color: "", fontSize: "1rem" }}>
            ★{comercio.rating}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default ListaComerciosPage;
