import { useContext, useEffect, useRef, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiHeart, CiSearch } from "react-icons/ci";
import { PiShoppingBagLight } from "react-icons/pi";
import { LiaUser } from "react-icons/lia";
import { HeaderContext } from "../../context/appContext";
import Fuse from 'fuse.js'
// import Logo from '../../assets/logo.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaFacebookSquare, FaMapMarkerAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SubCategory } from "../../types/CategoryType";
import { AiOutlineInstagram } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowBack, IoMdClose, IoMdLogOut } from "react-icons/io";
import {useSelector } from "react-redux";
import Bag from "./bag";
import Favorites from "./favourite";
import { BiSearchAlt } from "react-icons/bi";
import { RootState } from "../../store/store";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const inputref = useRef<any>(null);
  const { setisUserOpen,isUserOpen,setUser, setiscartOpen, isAuthenticated, setisAuthenticated,isFavouriteOpen,setisFavouriteOpen,searchOpen,setsearchOpen } = useContext(HeaderContext);
  const [isdropDown, setisdropDown] = useState(false);
  const [allProducts,setAllProducts] = useState([]);
  const [query,setQuery] = useState<any>([]);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchVal,setsearchVal] =useState("");
  const products:any = useSelector((state:RootState)=>state.Products);
  function getProduct() {
    return fetch("https://stile-backend.vercel.app/allproducts")
        .then((res) => res.json()) // Convert response to JSON
        .then((data) => {
           setAllProducts(data) // Process the data
           // Return data from the Promise
        }).catch((err)=>console.log(err))
}
   console.log(products)
  const fuse:any = allProducts.length>0 && new Fuse(allProducts,{keys:["name"],threshold:0.5,minMatchCharLength:2});
  const searchProducts = (query:any) => {
   const products = fuse.search(query).map((result:any) => result.item).slice(0,4)
    return products ;
  };
  async function isUser() {
    const response = await fetch("https://stile-backend.vercel.app/user", { credentials: 'include' });
    const data = await response.json();
    console.log(data);
    if (data) {
      setUser(data?.user);
    }
    if (response.status === 200) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }
  useEffect(() => 
    {
      getProduct();
    },[])
  useEffect(() => {
      isUser();
    }, [isAuthenticated]);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  async function handlelogout(){
    await fetch("https://stile-backend.vercel.app/user/logout",{method:'POST',credentials:'include'});
    setisAuthenticated(false);
    setisUserOpen(false);
    navigate("/")
    
  }

  const sendMessage = () => {
    const phoneNumber = "8220856333";
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
  function handleClose(){
    setsearchOpen(false);
    setsearchVal("");
    setQuery([]);
    
  }
  const handleDropdownClose = () => {
    const timeout = setTimeout(() => {
      setisdropDown(false); 
    }, 600); 
    setDropdownTimeout(timeout);
  };
  function handlesearch(){
    inputref.current.focus();
    setsearchOpen(true);
  }
  function searchvalue(e:any){
    setsearchVal(e.target.value)
    let timeout;
    if(timeout) {
      clearTimeout(timeout);
    }
   timeout = setTimeout(() => {
      const results = searchProducts(e.target.value);
      setQuery(results);
      console.log(results)
    }, 800);
    
  }
  useEffect(() => {
    if (searchOpen && inputref.current) {
      inputref.current.focus();
    }
  }, [searchOpen]);
  return (
    <>
    <Bag />
    <Favorites />
    <div className="fixed select-none bg-white top-[45px] w-full z-[200]">
      <button
        className="fixed bg-green-500 p-2 rounded-full bottom-8 z-[999] right-6"
        onClick={sendMessage}
      >
        <FaWhatsapp className="text-2xl  md:text-3xl text-white bg-green-500" />
      </button>
      <header className="border-b relative flex items-center justify-between shadow-sm px-3 py-2  md:h-auto md:px-3">
        <RxHamburgerMenu
          onClick={toggleMenu}
          className="md:hidden text-2xl cursor-pointer"
        />
       
        <Link to="/" className="flex-1 text-center md:hidden">
          <h1 className="flex justify-center items-center">
            <img
              className="h-5  object-contain"
              alt="stile sagio"
              src='/logo.png'
            />
            <p className="text-xs md:pl-2">STILE SAGIO</p>
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
                      {products && products.subCategories.map((subcategory: SubCategory) =>
                        <Link key={subcategory.slug} to={`/subcategory/${subcategory.slug}`} className="">
                          {subcategory.name}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>
              <Link to="/customize">
                <li>Customize </li>
              </Link>
              <a href="/">
                <h1 className="flex justify-center font-bold items-center">
                  <div className=" justify-center items-center flex">
                    <img
                      className="h-[35px] w-7 object-contain"
                      alt="stile sagio"
                      src='/logo.png'
                    />
                      <p className="">STILE SAGIO</p>
                  </div>
                
                </h1>
              </a>
              <li>Track Order</li>
              <Link to="/contact">
                <li>About Us</li>
              </Link>
             
            </ul>
          </div>
        </nav>

        {/* Mobile Menu */}
      
          <div className={`absolute ${isMenuOpen ?" translate-x-0":"translate-x-[-100%]"} duration-300 transition-all overflow-hidden top-0 transform  left-0 right-0 w-[300px] h-screen bg-white shadow-lg z-[999]  md:hidden`}>
            <div className="flex  justify-between">
              <h1 className="pb-4 p-4 font-semibold">Menu</h1>
              <IoCloseOutline onClick={toggleMenu} className="text-2xl m-4 cursor-pointer" />
              </div>
              <hr />
            <ul className="flex text-sm uppercase flex-col p-4 ">
              <li className="cursor-pointer flex justify-between relative border-b py-3" onClick={()=>setisdropDown(!isdropDown)} >
                Shop All
                <IoIosArrowDown className={`${isdropDown?"hidden":"block"}`} />
                <IoIosArrowUp className={`${isdropDown?"block":"hidden"}`}  />
              </li>
              {isdropDown && (
                  <>
                      {products && products.subCategories.map((subcategory: SubCategory) =>
                        <Link onClick={()=>setIsMenuOpen(false)} key={subcategory.slug} to={`/subcategory/${subcategory.slug}`} className="border-b font-light text-xs py-3">
                          {subcategory.name}
                        </Link>
                      )}
                  </>
                )}
                 <Link onClick={()=>setIsMenuOpen(false)} to='/customize'>
             <li className="border-b py-3">Customize Now</li> 
             </Link>
              <Link onClick={()=>setIsMenuOpen(false)} to="/">
                <li className="border-b py-3">Home</li>
              </Link>
              <Link onClick={()=>setIsMenuOpen(false)} to="/track-order">
                <li className="border-b py-3">Track Order</li>
              </Link>
              <Link onClick={()=>setIsMenuOpen(false)} to="/contact">
                <li className="border-b py-3">About Us</li>
              </Link>
             {isAuthenticated &&
             <Link onClick={()=>setIsMenuOpen(false)} to='/user/account'>
              <li className="border-b py-3">Account</li>
             </Link>
             }
           
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
     
         <div className={`w-full md:w-full inset-0 bg-white top-0 right-0 z-[999] transform transition-all duration-300 ease-in-out absolute  ${searchOpen ? " md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 opacity-100" : "-translate-y-full opacity-0"}`}>
          <div className="flex relative justify-end md:justify-center mr-3 h-full items-center">
           <div className="relative flex items-center justify-center w-[85%] md:w-1/2 ">
          
           <button  onClick={()=>setsearchOpen(false)} className="md:hidden absolute -left-8">
           <IoMdArrowBack className="text-2xl" />
           </button>
            <button className="absolute  md:pr-10 right-2 top-1/2 transform -translate-y-1/2">
            <BiSearchAlt  className="text-xl" />
            </button>
            <button className="absolute hidden md:block right-3 top-1/2 transform -translate-y-1/2">
            <IoMdClose onClick={handleClose}  className="text-xl text-red-600" />
            </button>
            <input value={searchVal} onChange={(e:any)=>searchvalue(e)} placeholder="Try Searching Polos.." ref={inputref} className="w-full h-8 placeholder:text-xs placeholder:text-gray-500 md:h-10 p-3 border" type="text" name="" id="" />
            {/* <Auto items={products.products} /> */}
            </div>
            {query.length>0 &&
           <div className="absolute md:top-[150%] top-full  w-full bg-white shadow-lg z-10 md:w-[50%]">
            <h3 className=" text-gray-600 text-[12px] md:text-md p-2">PRODUCTS</h3>
            <hr />
            {query.map((product:any)=>
            <Link  onClick={handleClose} to={`/product/${product.slug}`} className="w-full" key={product._id}>
             <div className="flex p-3 items-center space-x-4 w-full">
             <img src={product.images[0]} alt="Product" className="w-12 h-16 object-top object-cover" />
             <div className="flex-1">
               <div className="text-sm text-gray-800 sm:text-sm lg:text-md">{product.name}</div>
               {/* <div className="text-xs sm:text-sm md:text-md text-gray-500">{product.description.split(" ").slice(0,10).join(" ")}{product.description.length>50 && "..."}</div>
               <div className="text-xs sm:text-sm md:text-md font-bold text-gray-900">₹{product.price}</div> */}
               </div>
             </div>
             {/* <div className="w-full h-[1px] my-[2px] bg-black"></div> */}
           </Link>
            )}
          
         </div> 
           }
            </div>
            
          </div>
          
        {/* Right Side Icons */}
        <div className="flex  items-center justify-end space-x-1 md:space-x-2 px-3">
          <div className={`${searchOpen?"hidden":"block"}`}>
          <button onClick={()=>handlesearch()}>
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
    </>
  );
}
