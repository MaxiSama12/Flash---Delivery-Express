//import Navbar from "../components/layout/Navbar";
import CatalogoHomePage from "../components/ui/CatalogoHomePage";
import CommerceCarousel from "../components/ui/CommerceCarousel";
import HeroHomePage from "../components/ui/HeroHomePage";
import InfoHomePage from "../components/ui/InfoHomePage";
import SectionRegister from "../components/ui/SectionRegister";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const HomePage = ({ onAddToCartAnimation }) => {
  return (
    <div>
      <Navbar />
      <HeroHomePage />
      <CatalogoHomePage onAddToCartAnimation={onAddToCartAnimation} />
      <CommerceCarousel />
      <InfoHomePage />
      <SectionRegister />
      <Footer />
    </div>
  );
};

export default HomePage;
