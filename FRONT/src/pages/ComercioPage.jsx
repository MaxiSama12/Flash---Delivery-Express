import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Card from "../components/ui/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { COMERCIOS, PRODUCTOS } from "../endpoints/endpoints";
import "../styles/comercio.css";

const ComercioPage = () => {
  const { id } = useParams();
  const [comercio, setComercio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getProductos = async () => {
    try {
      const res = await axios.get(`${PRODUCTOS}`);
      res.data = res.data.filter(
        (producto) => producto.id_comercio == id
      );
      setProductos(res.data);
        console.log("productos", res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los productos",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  const getComercio = async () => {
    try {
      const res = await axios.get(`${COMERCIOS}/${id}`);
      setComercio(res.data);
      console.log("comercio", res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar el comercio",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComercio();
    getProductos();
  }, [id]);

  return (
    <>
      <section
        className="hero-section-detail"
        style={{
          backgroundImage: loading
            ? "none"
            : `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${comercio.url_imagen})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "80vh",
        }}
      >
        <div className={`hero-content-detail ${!loading ? "loaded" : ""}`}>
          {loading ? (
            <Skeleton height={40} width="60%" />
          ) : (
            <h3>{comercio.nombre.toUpperCase()}</h3>
          )}
          <button className="back-button" onClick={() => navigate(-1)}>
            Volver
          </button>
        </div>
      </section>

      <div className="project-details">
        {loading ? (
          <>
            <Skeleton count={3} />
            <div className="image-gallery">
              {[1, 2, 3, 4].map((_, i) => (
                <Skeleton
                  key={i}
                  height={200}
                  width={"100%"}
                  style={{ borderRadius: "10px", marginBottom: "1rem" }}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <p>{comercio.nombre}</p>
            <p>{comercio.detalles}</p>

            <div className="image-gallery">
              {productos.map((producto, idx) => (
                <div key={idx} className="gallery-item">
                    <Card producto={{ ...producto }} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ComercioPage;
