import "../styles/comercio.css";
import HeroComercioPage from "../components/ui/HeroComercioPage";
import ProductosComercioPage from "../components/ui/ProductosComercioPage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const ComercioPage = () => {
  return (
    <>
      <Navbar />
      <HeroComercioPage />
      <ProductosComercioPage />
      <Footer />
    </>
  );
};

export default ComercioPage;
