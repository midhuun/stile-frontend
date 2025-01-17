import { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiHeart, CiSearch } from "react-icons/ci";
import { PiShoppingBagLight } from "react-icons/pi";
import { LiaUser } from "react-icons/lia";
import { HeaderContext } from "../../context/appContext";
// import Logo from '../../assets/logo.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaFacebookSquare, FaMapMarkerAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SubCategory } from "../../types/CategoryType";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";
import { auth } from "../../firestore/store";
import Auto from "../home/autoComplete";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setisUserOpen,isUserOpen, setiscartOpen, isAuthenticated, setisAuthenticated,isFavouriteOpen,setisFavouriteOpen,searchOpen,setsearchOpen } = useContext(HeaderContext);
  const [isdropDown, setisdropDown] = useState(false);
  const [subcategories, setsubCategories] = useState([]);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobile, setMobile] = useState(null);
  const products = useSelector((state:RootState)=>state.Products);
  console.log("prod",products);
  console.log(mobile);
  async function isUser() {
    const response = await fetch("https://stile-backend-gnqp.vercel.app/user", { credentials: 'include' });
    const data = await response.json();
    if (data) {
      console.log(data);
      setMobile(data?.user?.phone);
    }
    if (response.status === 200) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }
  useEffect(() => {
    isUser();
    
  }, []);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  async function handlelogout(){
    console.log("hello");
    await signOut(auth);
    const token = Cookies.get('token');
    console.log(token)
    Cookies.remove('token');
    setisAuthenticated(false);
    setisUserOpen(false);
    // window.location.reload();
  }
  async function getcategories() {
    const response = await fetch("https://stile-backend.vercel.app/products");
    const data: any = await response.json();
    setsubCategories(data.subCategories);
  }
  useEffect(() => {
    getcategories();
  }, []);

  const sendMessage = () => {
    const phoneNumber = "9677966333";
    const message = encodeURIComponent("Hello! I'm interested in your product.");
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, "_blank");
  };

  const handleDropdownOpen = () => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout); 
      setDropdownTimeout(null);
    }
    setisdropDown(true);
  };

  const handleDropdownClose = () => {
    const timeout = setTimeout(() => {
      setisdropDown(false); 
    }, 600); 
    setDropdownTimeout(timeout);
  };

  return (
    <div className="fixed select-none bg-white top-[45px] w-full z-[200]">
      <button
        className="fixed bg-green-500 p-2 rounded-full bottom-8 z-[999] right-3"
        onClick={sendMessage}
      >
        <FaWhatsapp className="text-xl md:text-3xl text-white bg-green-500" />
      </button>
      <header className="border-b relative flex items-center justify-between shadow-sm ml-1 py-2  md:h-auto md:px-3">
        <RxHamburgerMenu
          onClick={toggleMenu}
          className="md:hidden text-2xl cursor-pointer"
        />
       
        <Link to="/" className="flex-1 text-center md:hidden">
          <h1 className="flex justify-center items-center">
            <img
              className="h-[25px] w-[40px] object-contain"
              alt="stile sagio"
              src='/logo.png'
            />
            <p className="text-xs pl-2">STILE SAGIO</p>
          </h1>
        </Link>

        <nav className="uppercase hidden md:block w-full">
          <div className="flex text-[12px] md:text-xs items-center py-4">
            <ul className="flex w-full justify-center items-center space-x-4">
              {/* <li>New Arrivals</li> */}
              <li
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
                className="cursor-pointer "
              >
                Shop All
                {isdropDown && (
                  <div
                    className="absolute bg-white shadow-lg border rounded-lg p-2 w-[100vw] left-0 h-[300px] top-14"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    <div className="flex flex-col flex-wrap px-[10%] py-6 justify-center gap-4">
                      {subcategories.map((subcategory: SubCategory) =>
                        <Link key={subcategory.slug} to={`/subcategory/${subcategory.slug}`} className="">
                          {subcategory.name}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>

              <a href="/">
                <h1 className="flex justify-center font-bold items-center">
                  <div className="">
                    <img
                      className="h-[35px]  object-contain"
                      alt="stile sagio"
                      src='/logo.png'
                    />
                  </div>
                  <p className="pl-2">STILE SAGIO</p>
                </h1>
              </a>
              <li>Track Order</li>
              <Link to="/contact">
                <li>About Us</li>
              </Link>
              <Link to="/customize">
                <li>Customize </li>
              </Link>
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-0  left-0 right-0 w-[300px] h-screen bg-white shadow-lg z-[999]  md:hidden">
            <div className="flex  justify-between">
              <h1 className="pb-4 p-4 font-semibold">Menu</h1>
              <IoCloseOutline onClick={toggleMenu} className="text-2xl m-4 cursor-pointer" />
              </div>
              <hr />
            <ul className="flex text-sm uppercase flex-col p-4 ">
              <li
                onMouseEnter={handleDropdownOpen}
                onMouseLeave={handleDropdownClose}
                className="cursor-pointer relative border-b py-3"
              >
                Shop All
                {isdropDown && (
                  <div
                    className="absolute border-b py-3 bg-white shadow-lg border rounded-lg p-2 w-full left-0 h-auto top-full mt-1"
                    onMouseEnter={handleDropdownOpen}
                    onMouseLeave={handleDropdownClose}
                  >
                    <div className="flex flex-col gap-2">
                      {subcategories.map((subcategory: SubCategory) =>
                        <Link key={subcategory.slug} to={`/subcategory/${subcategory.slug}`} className="">
                          {subcategory.name}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>
              <Link to="/">
                <li className="border-b py-3">Home</li>
              </Link>
              <Link to="/track-order">
                <li className="border-b py-3">Track Order</li>
              </Link>
              <Link to="/contact">
                <li className="border-b py-3">About Us</li>
              </Link>
             {isAuthenticated &&
             <Link to='/user/account'>
              <li className="border-b py-3">Account</li>
             </Link>
             }
            <Link to='/customize'>
             <li className="border-b py-3">Customize Now</li> 
             </Link>
            </ul>
            <div className="flex gap-5 justify-center items-center">
              <a href="https://www.instagram.com/stilesagio" className=" flex items-center justify-center ">
              <AiOutlineInstagram className="text-2xl" />
              </a>
              <a href="https://www.youtube.com/@Stilesagio" className="cursor-pointer  flex items-center justify-center ">
              <FaYoutube className="text-2xl" />
              </a>
              <a href="https://maps.app.goo.gl/gsi1unahDiVUFr6z9" className="cursor-pointer  flex items-center justify-center ">
              <FaMapMarkerAlt className="text-xl " />
              </a>
              <a href="https://www.facebook.com/share/18bLtJETLq" className="cursor-pointer  flex items-center justify-center ">
              <FaFacebookSquare className="text-xl " />
              </a>
            </div>
          </div>
        )}
          <div className={`w-full md:w-auto left-1/2 transform -translate-x-1/2 ${searchOpen ? "absolute" : "hidden"} right-0 z-[999]`}>
           <div className="relative">
           
            <button onClick={()=>setsearchOpen(false)} className="absolute right-3 z-[1000] top-3 text-3xl">
           <IoCloseOutline className="" />
           </button>
            <Auto items={products} />
            </div>
          </div>
        {/* Right Side Icons */}
        <div className="flex  items-center justify-end space-x-1 md:space-x-2 px-3">
       
          <div>
          <button onClick={()=>setsearchOpen(true)}>
            <CiSearch className="text-2xl" />
          </button>
          </div>
          <div>
          <button onClick={() => setisFavouriteOpen(!isFavouriteOpen)}>
            <CiHeart className="text-2xl" />
          </button>
          </div>
          {isAuthenticated ?
          <div className="relative">
          <div className={` ${isUserOpen?'absolute':'hidden' } -left-[170px] -bottom-[142px] p-1 bg-white z-[100] h-[120px] w-[190px] border`}>
            <div className="flex flex-col h-full   p-2 border-b">
              <Link onClick={()=>setisUserOpen(false)} className="flex gap-1 p-2 cursor-pointer" to='/user/account'>
            <FiShoppingBag className="text-xl" />
            <p className="px-2 text-sm">Order History</p>
            </Link>
            <button onClick={handlelogout} className="flex gap-1 p-2 mt-3 border cursor-pointer">
            <IoMdLogOut className="text-xl" />
            <p className="px-2 text-sm">Logout</p>
            </button> 
            </div>
          </div>
          <button onClick={() => setisUserOpen(!isUserOpen)}>
            <LiaUser className=" text-2xl" />
          </button>
          </div>
          :
          <div>
          <button onClick={() => setisUserOpen(!isUserOpen)}>
            <LiaUser className=" text-2xl" />
          </button>
          </div>
          }
          <div>
          <button onClick={() => setiscartOpen(true)}>
            <PiShoppingBagLight className=" text-2xl" />
          </button>
          </div>
        </div>
      </header>
    </div>
  );
}
