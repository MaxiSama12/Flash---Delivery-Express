import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import "../../styles/carousel.css";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { axiosInstance } from "../../router/axiosInstance";
import { Link } from "react-router-dom";

const TopRatedStoresCarousel = () => {
  const [comercios, setComercios] = useState([]);

  const getComercios = async () => {
    try {
      const { data } = await axiosInstance.get("/comercios");
      setComercios(data.comercios);
      console.log("Comercios cargados:", data.comercios);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cargar los comercios",
        text: error.response?.data?.mensaje || "Error desconocido",
      });
    }
  };

  useEffect(() => {
    getComercios();
  }, []);

  return (
    <section id="top-rated-stores" className="position-relative">
      <div className="container mt-5">
        <p className="primary-subheading">Top-10</p>
        <div className="section-principal-category">
          <h1 className="primary-heading">Mejores Comercios</h1>
        </div>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={1}
          breakpoints={{
            620: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
            1280: { slidesPerView: 4, spaceBetween: 50 },
          }}
        >
          {comercios.map((comercio, index) => (
            <SwiperSlide key={index}>
              <Link className="link-carousel" to={`/comercio/${comercio.id_comercio}`}>
                <div className="store-card mt-5">
                  <img
                    src={comercio.url_imagen}
                    alt={comercio.nombre_comercio}
                    className="store-image"
                  />
                  <div className="rating-badge">
                    <FaStar className="me-1  star" />
                    {Number(comercio.rating).toFixed(1)}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopRatedStoresCarousel;
