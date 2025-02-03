import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import HeaderProvider from './context/appContext';
import OtpLoginPopup from './components/login/login';
import Offer from './components/offer';
import { Suspense, lazy, useEffect } from 'react';
import Loading from './components/loading/loading';
import Home from './components/home/home';
import PrivacyPolicy from './components/FooterDetails/privacyPolicy';
import ScrollToTop from './components/home/scrollTop';
import PaymentStatus from './components/cart/paymentStatus';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/reducers/productReducer';
import HomeSub from './components/home/homeSub';
const About = lazy(() => import('./components/about/about'));
const CategoryPage = lazy(() => import('./components/categoryPage/categoryPage'));
const ProductPage = lazy(() => import('./components/product/ProductPage'));
const CartPage = lazy(() => import('./components/cart/cart'));
const CustomizeOrder = lazy(() => import('./components/customize/customize'));
const CustomizeNowForm = lazy(() => import('./components/customize/customizeForm'));
const ShippingPolicy = lazy(() => import('./components/FooterDetails/shippingPolicy'));
const ReturnAndExchanges = lazy(() => import('./components/FooterDetails/returnExchange'));
const TermsAndConditions = lazy(() => import('./components/FooterDetails/terms'));
const Account = lazy(() => import('./account/account'));
function App() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(fetchProducts());
    console.log("Claee")
     // Fetch products when page loads
  }, [dispatch]);
  return (
    <>
      <Router>
        <HeaderProvider>
          <OtpLoginPopup />
          <ScrollToTop />
          <Offer />
          <div className="md:pt-[90px] pt-[40px]">
            <Header />
            <Suspense fallback={<Loading/>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:product" element={<ProductPage />} />
                <Route path="/subcategory/:subcategoryName" element={<CategoryPage />} />
                <Route path="/contact" element={<About />} />
                <Route path="/customize" element={<CustomizeOrder />} />
                <Route path="/customize/quote" element={<CustomizeNowForm />} />
                <Route path="/shipping" element={<ShippingPolicy />} />
                <Route path="/returns" element={<ReturnAndExchanges />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/checkout" element={<CartPage />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/user/account" element={<Account />} />
                <Route path="/payment/status" element={<PaymentStatus />} />
                <Route path="/products/all" element={<HomeSub />} />
              </Routes>
            </Suspense>

            <Footer />
          </div>
        </HeaderProvider>
      </Router>
    </>
  );
}

export default App;
