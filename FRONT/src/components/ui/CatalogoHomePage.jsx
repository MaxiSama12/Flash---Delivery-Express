import { useState, useEffect } from "react";
//import axios from "axios";
import { axiosInstance } from "../../router/axiosInstance";
import Swal from "sweetalert2";
import "../../styles/home.css";
import Card from "./Card";
import { PRODUCTOS, CATEGORIAS } from "../../endpoints/endpoints";

const CatalogoHomePage = ({ onAddToCartAnimation }) => {
  const [activeFilter, setActiveFilter] = useState("0");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

  const getProductos = async () => {
    try {
      const res = await axiosInstance.get();
      setProductos(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los productos",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  const getCategorias = async () => {
    try {
      const {data} = await axiosInstance.get("/categorias");
      setCategorias(data.categorias);
      console.log(data.categorias);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar las categorías",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  useEffect(() => {
    getProductos();
    getCategorias();
  }, []);

  useEffect(() => {
    setVisibleCount(8);
  }, [activeFilter]);

  const filteredProducts =
    activeFilter === "0"
      ? productos
      : productos.filter((producto) => producto.id_categoria === activeFilter);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="cat-section-container">
      <div className="container">
        <p className="primary-subheading">Catálogo</p>
        <div className="section-principal-category">
          <h1 className="primary-heading">Menú de Productos</h1>
          <div className="filter-category">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                className={`category ${
                  activeFilter === categoria.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(categoria.id)}
              >
                {categoria.nombre.charAt(0).toUpperCase() +
                  categoria.nombre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="card-container">
          {visibleProducts.map((producto) => (
            <Card
              key={producto.id}
              producto={producto}
              onAddToCartAnimation={onAddToCartAnimation}
            />
          ))}
        </div>

        {visibleCount < filteredProducts.length && (
          <div className="ver-mas-container">
            <button
              className="ver-mas-btn"
              onClick={() => setVisibleCount((prev) => prev + 8)}
            >
              Ver más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoHomePage;
