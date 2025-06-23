import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../styles/comercio.css";
import { axiosInstance } from "../../router/axiosInstance";

const HeroComercioPage = () => {
  const { id } = useParams();
  const [comercio, setComercio] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const mostrarEstadoComercio = location.pathname.startsWith("/comercios/");

  useEffect(() => {
    const getComercio = async () => {
      try {
        console.log("id en hero comercio", id);
        const { data } = await axiosInstance.get(`comercio/${id}`);
        console.log("data en hero", data);
        setComercio(data.comercio[0]);
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
    if (id) {
      getComercio();
    }
  }, [id]);

  return (
    <section
      className="hero-section-detail"
      style={{
        backgroundImage: loading ? "none" : `url(${comercio?.url_imagen})`,
      }}
    >
      <div className="hero-content-detail">
        {loading ? (
          <Skeleton height={40} width="60%" />
        ) : (
          <>
            <h3>{comercio?.nombre_comercio}</h3>
            <div className="comercio-info">
              <span className="comercio-info-item">
                <FaMapMarkerAlt /> {comercio?.direccion}
              </span>

              <span className="comercio-info-item">
                <FaPhoneAlt /> {comercio?.telefono}
              </span>
              {mostrarEstadoComercio && (
                <p className={comercio.activo ? `badge text-bg-success text-wrap` : `badge text-bg-danger text-wrap`} style={{ width: "4rem", marginTop: "10px" }}>
                  {comercio.activo ? "Abierto" : "Cerrado"}
                </p>
              )}

              <span className="comercio-info-item-rating">
                <AiFillStar /> {comercio?.rating}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroComercioPage;
