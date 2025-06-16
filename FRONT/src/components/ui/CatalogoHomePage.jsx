import "../../styles/home.css";
import Card from "./Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { PRODUCTOS } from "../../endpoints/endpoints";
import Swal from "sweetalert2";

const CatalogoHomePage = () => {
  
  const [activeFilter, setActiveFilter] = useState("todos");
  const [productos, setProductos] = useState([]);
  const getProductos = async () => {
    try {
      const res = await axios.get(`${PRODUCTOS}`);
      setProductos(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los productos",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const filteredProducts =
    activeFilter === "todos"
      ? productos
      : productos.filter((producto) => producto.category === activeFilter);

  return (
    <div className="cat-section-container">
      <div className="container">
        <p className="primary-subheading">Catálogo</p>
        <div className="section-principal-category">
          <h1 className="primary-heading">Menú de Productos</h1>
          <div className="filter-category">
            {["todos", "comida", "librería", "supermercado"].map((category) => (
              <button
                key={category}
                className={`category ${
                  activeFilter.toLowerCase() === category.toLowerCase()
                    ? "active"
                    : ""
                }`}
                onClick={() => setActiveFilter(category.toLowerCase())}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="card-container">
          {filteredProducts.map((producto) => (
            <Card producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CatalogoHomePage;
