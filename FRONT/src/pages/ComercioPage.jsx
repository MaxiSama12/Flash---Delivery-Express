
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";
import Card from "../components/ui/Card";

const ComercioPage = () => {
  const { id } = useParams();
  const [comercio, setComercio] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getComercio = async () => {
    try {
      const res = await axiosInstance.get(`/comercios/${id}`);
      setComercio(res.data.comercio);
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
            <p>{comercio.descripcion}</p>
            <p>{comercio.detalles}</p>

            <div className="image-gallery">
              {comercio.gallery.map((image, idx) => (
                <div key={idx} className="gallery-item">
                  <div className="image-wrapper">
                    <Card image={image.url} />
                  </div>
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
