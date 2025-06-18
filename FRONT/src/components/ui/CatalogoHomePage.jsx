import "../../styles/home.css";
import Card from "./Card";
import { useState } from "react";

const CatalogoHomePage = ({ onAddToCartAnimation }) => {
  const [activeFilter, setActiveFilter] = useState("0");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);

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

  const getCategorias = async () => {
    try {
      const res = await axios.get(`${CATEGORIAS}`);
      setCategorias(res.data);
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
                key={categoria.id}
                className={`category ${
                  activeFilter === categoria.id ? "active" : ""
                }`}
                onClick={() => setActiveFilter(categoria.id)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
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
      </div>
    </div>
  );
};

export default CatalogoHomePage;
