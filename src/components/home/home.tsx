import Carousel from './carousel'
import Categories from './categoryslide'
import './home.css';
import HomeSub from './homeSub';
import VideoGallery from './videoGallery';
const Home = () => {
  return (
    <>
    
     <VideoGallery/>
    <Carousel/>
    <Categories />
    <HomeSub />
    </>
  )
}

export default Home