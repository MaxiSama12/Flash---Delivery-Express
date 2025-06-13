
import CatalogoHomePage from '../components/ui/CatalogoHomePage'
import CommerceCarousel from '../components/ui/CommerceCarousel'
import HeroHomePage from '../components/ui/HeroHomePage'
import InfoHomePage from '../components/ui/InfoHomePage'
import SectionRegister from '../components/ui/SectionRegister'

const HomePage = () => {
  return (
    <div>
      <HeroHomePage />
      <CatalogoHomePage />
      <CommerceCarousel />
      <InfoHomePage />
      <SectionRegister />
    </div>
  )
}

export default HomePage