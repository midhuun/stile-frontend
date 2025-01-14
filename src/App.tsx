import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Header from './components/header/header'
import Home from './components/home/home'
import About from './components/about/about'
import Footer from './components/footer/footer'
import CategoryPage from './components/categoryPage/categoryPage'
import ProductPage from './components/product/ProductPage'
import CartPage from './components/cart/cart'
import CustomizeOrder from './components/customize/customize'
import CustomizeNowForm from './components/customize/customizeForm'
import Bag from './components/header/bag'
import HeaderProvider from './context/appContext'
import ShippingPolicy from './components/FooterDetails/shippingPolicy'
import ReturnAndExchanges from './components/FooterDetails/returnExchange'
import TermsAndConditions from './components/FooterDetails/terms'
import OtpLoginPopup from './components/login/login'
import Favorites from './components/header/favourite'
import Account from './account/account'
import Offer from './components/offer';
function App() {
  return (
    <>
     <Router>
    <HeaderProvider> 
    <OtpLoginPopup />
    <Offer />
  <div className='md:pt-[90px] pt-[40px]'>

    <Header />
    <Bag/>
    <Favorites />
<Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:product" element={<ProductPage />} />
      <Route path="/subcategory/:subcategoryName" element={<CategoryPage/>} />
      <Route path="/contact" element={<About/>} /> 
      <Route path="/customize" element={<CustomizeOrder/>} /> 
      <Route path="/customize/quote" element={<CustomizeNowForm/>} />
          <Route path="/shipping" element={<ShippingPolicy/>} />
      <Route path="/returns" element={<ReturnAndExchanges/>} />
      <Route path="/terms" element={<TermsAndConditions/>} />
      <Route path="/checkout" element={<CartPage/>} />
      <Route path="/user/account" element={<Account/>} />
    </Routes> 
     <Footer />
     </div> 
     </HeaderProvider>
     
     </Router>
     
         </>
  )
}

export default App
