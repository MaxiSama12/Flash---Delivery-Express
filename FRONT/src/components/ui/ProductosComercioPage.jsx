import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiFilter } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Card from "./Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { axiosInstance } from "../../router/axiosInstance";
import "../../styles/comercio.css";

const ProductosComercioPage = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showFilters, setShowFilters] = useState(false);

  const getProductos = async () => {
    try {
      const {data} = await axiosInstance.get(`productos/${id}`);
      setProductos(data.productos);
      setFilteredProductos(data.productos);
      setLoading(false);
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
      const {data} = await axiosInstance.get("categorias");
      setCategorias(data.categorias);
      console.log("Categorías cargadas:", data.categorias);
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
  }, [id]);

  useEffect(() => {
    if (!categoriaSeleccionada) {
      setFilteredProductos(productos);
    } else {
      console.log("categoriaseleccionada",categoriaSeleccionada)
      setFilteredProductos(
        productos.filter((p) => p.id_categoria === categoriaSeleccionada)
      );
    }
  }, [categoriaSeleccionada, productos]);
  return (
    <div className="main-content">
      <button
        className="filters-toggle-button"
        aria-label="Abrir filtros"
        onClick={() => setShowFilters(true)}
        type="button"
      >
        <FiFilter size={24} />
      </button>

      {showFilters && (
        <div
          className="filters-overlay"
          onClick={() => setShowFilters(false)}
        ></div>
      )}

      <aside
        id="filters-section"
        className={`filters-section ${showFilters ? "show" : ""}`}
      >
        <button
          className="filters-close-button"
          aria-label="Cerrar filtros"
          onClick={() => setShowFilters(false)}
          type="button"
        >
          <IoMdClose size={30} />
        </button>

        <h4>Categorías</h4>
        <ul className="categoria-list">
          <li
            key="todas"
            className={!categoriaSeleccionada ? "active" : ""}
            onClick={() => setCategoriaSeleccionada(null)}
          >
            Todas
          </li>
          {categorias.map((cat) => (
            <li
              key={cat.id_categoria}
              className={
                categoriaSeleccionada === cat.id_categoria ? "active" : ""
              }
              onClick={() => setCategoriaSeleccionada(cat.id_categoria)}
            >
              {cat.nombre.charAt(0).toUpperCase() + cat.nombre.slice(1).toLowerCase()}
            </li>
          ))}
        </ul>
      </aside>

      <div className="image-gallery">
        {loading ? (
          <>
            <Skeleton count={3} />
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton
                key={i}
                height={200}
                width={"100%"}
                style={{ borderRadius: "10px", marginBottom: "1rem" }}
              />
            ))}
          </>
        ) : filteredProductos.length === 0 ? (
          <p className="no-results-message">
            No hay productos en esta categoría.
          </p>
        ) : (
          filteredProductos.map((producto, idx) => (
            <div key={idx} className="gallery-item">
              <Card producto={{ ...producto }} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductosComercioPage;
