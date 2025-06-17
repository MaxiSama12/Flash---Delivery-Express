import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { COMERCIOS } from "../../endpoints/endpoints";

import "../../styles/comercio.css";

const HeroComercioPage = () => {
  const { id } = useParams();
  const [comercio, setComercio] = useState(null);
  const [loading, setLoading] = useState(true);

  const getComercio = async () => {
    try {
      const res = await axios.get(`${COMERCIOS}/${id}`);
      setComercio(res.data);
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
            <h3>{comercio?.nombre}</h3>
            <div className="comercio-info">
              <span className="comercio-info-item">
                <FaMapMarkerAlt /> {comercio?.direccion}
              </span>

              <span className="comercio-info-item">
                <FaPhoneAlt /> {comercio?.telefono}
              </span>

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
