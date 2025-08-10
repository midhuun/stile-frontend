import { Suspense, lazy } from 'react';
import './home.css';
import Loading from '../loading/loading';
import Carousel from './carousel';
import Categories from './categoryslide';
import SEO from '../seo/SEO';
const HomeSub = lazy(() => import('./homeSub'));
const VideoGallery = lazy(() => import('./videoGallery'));

const Home = () => {
  return (
    <>
      <SEO
        title="Stile Sagio | Affordable & Stylish Men's T-Shirts - TVT Textiles"
        description="Shop premium men's t-shirts from Stile Sagio by TVT Textiles – stylish, comfortable, and affordable. Made with high-quality fabrics for a perfect fit. Fast shipping & great deals!"
        keywords={["men's t-shirts","affordable t-shirts","stylish tees","Stile Sagio","TVT Textiles","premium cotton t-shirts","casual wear","trendy t-shirts","buy t-shirts online"]}
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/` : 'https://stilesagio.com'}
        image="/poster.png"
        type="website"
      />
      <VideoGallery />
      <Carousel />
      <Suspense fallback={<Loading />}>
        <Categories />
        <HomeSub />
      </Suspense>
    </>
  );
};

export default Home;
