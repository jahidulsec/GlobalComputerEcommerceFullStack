import getGeneralGET from "@/hook/getGeneralGET"
import DptMenuHome from "./DptMenuHome"
import FeaturedProduct from "./FeaturedProduct"
import Slider from "./Slider"
import TrendingProduct from "./TrendingProduct"


const Home = async() => {

  const sliderRes = await getGeneralGET({name: 'slider'})

  return (
    <section id="page" className="home-page">
        <Slider sliderRes={sliderRes} />
        <DptMenuHome />
        <TrendingProduct />
        <FeaturedProduct />
    </section>
  )
}

export default Home