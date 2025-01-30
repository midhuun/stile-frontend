import { Suspense, lazy } from 'react';
import './home.css';
import Loading from '../loading/loading';
// Lazy load the components
import Carousel from './carousel';
import Categories from './categoryslide';
const HomeSub = lazy(() => import('./homeSub'));
const VideoGallery = lazy(() => import('./videoGallery'));

const Home = () => {
  return (
    <>
    <Suspense fallback={<Loading/>}>
     <VideoGallery />
     <Carousel />    
      <Categories />
      <HomeSub />
    </Suspense>
    </>
  );
};

export default Home;
