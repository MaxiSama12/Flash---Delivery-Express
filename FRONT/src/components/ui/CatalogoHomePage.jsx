import { useState, useEffect } from "react";
import { axiosInstance } from "../../router/axiosInstance";
import Swal from "sweetalert2";
import "../../styles/home.css";
import Card from "./Card";

const CatalogoHomePage = ({ onAddToCartAnimation }) => {
  const [activeFilter, setActiveFilter] = useState("0");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 1;

  const getProductos = async (pageToLoad = 1) => {
    try {
      const { data } = await axiosInstance.get(`/productos?page=${pageToLoad}&limit=${limit}`);
      if (pageToLoad === 1) {
        setProductos(data.productos);
      } else {
        setProductos(prev => [...prev, ...data.productos]);
      }

      if (data.productos.length < limit) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
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
      const { data } = await axiosInstance.get("/categorias");
      setCategorias(data.categorias);
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

  const handleVerMas = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    getProductos(nextPage);
  };

  const filteredProducts =
    activeFilter === "0"
      ? productos
      : productos.filter((producto) => producto.id_categoria === activeFilter);

  return (
    <div className="cat-section-container">
      <div className="container">
        <p className="primary-subheading">Catálogo</p>
        <div className="section-principal-category">
          <h1 className="primary-heading">Menú de Productos</h1>
          <div className="filter-category">
            {categorias.map((categoria) => (
              <button
                key={categoria.id_categoria}
                className={`category ${
                  activeFilter === categoria.id_categoria ? "active" : ""
                }`}
                onClick={() => setActiveFilter(categoria.id_categoria)}
              >
                {categoria.nombre.charAt(0).toUpperCase() +
                  categoria.nombre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="card-container">
          {filteredProducts.map((producto) => (
            <Card
              key={producto.id}
              producto={producto}
              onAddToCartAnimation={onAddToCartAnimation}
            />
          ))}
        </div>

        {hasMore && filteredProducts.length >= page * limit && (
          <div className="ver-mas-container">
            <button className="ver-mas-btn" onClick={handleVerMas}>
              Ver más
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoHomePage;
