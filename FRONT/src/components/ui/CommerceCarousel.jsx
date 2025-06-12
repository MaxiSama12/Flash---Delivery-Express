import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import "../../styles/carousel.css";

const TopRatedStoresCarousel = () => {
  const stores = [
    {
      name: "Supermercado Vea",
      category: "Supermercado",
      image:
        "https://www.webretail.com.ar/wp-content/uploads/2023/04/Vea-Cencosud.jpg",
      rating: 4.7,
    },
    {
      name: "Farmacia del Pueblo",
      category: "Farmacia",
      image:
        "https://images.rappi.com.ar/marketplace/store_type_1626975357300.jpg",
      rating: 4.9,
    },
    {
      name: "Librería San Pablo",
      category: "Librería",
      image:
        "https://recursos-we-us-east-1.s3.amazonaws.com/Weyop/LSP/Contenidos/2024-08-15%2015%3A25%3A51/descarga%20%284%29.png",
      rating: 4.6,
    },
    {
      name: "Mc Donald's",
      category: "Comida Rápida",
      image:
        "https://cdn.aarp.net/content/dam/aarpe/es/home/trabajo/pequenos-negocios/info-2021/comprar-franquicia-de-McDonalds/_jcr_content/root/container_main/container_body_main/container_body1/container_body_cf/container_image/articlecontentfragment/cfimage.coreimg.50.932.jpeg/content/dam/aarp/work/work_at_plus/2021/09/1140-mcdonalds-esp.jpg",
      rating: 4.8,
    },
    {
      name: "La Pizzada",
      category: "Pizzería",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0D7HfefHBN8fEVhms12IV_7Wfx7mBbwqANg&s",
      rating: 4.5,
    },
  ];

  return (
    <section id="top-rated-stores" className="position-relative py-4">
      <div className="container mt-5">
        <p className="primary-subheading">Catálogo</p>
        <div className="section-principal-category">
          <h1 className="primary-heading">Mejores Comercios</h1>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
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
          {stores.map((store, index) => (
            <SwiperSlide key={index}>
              <div className="store-card mt-5">
                <img
                  src={store.image}
                  alt={store.name}
                  className="store-image"
                />
                <div className="rating-badge">
                  <FaStar className="me-1  star" /> {store.rating.toFixed(1)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopRatedStoresCarousel;
