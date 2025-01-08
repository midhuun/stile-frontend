import { useContext, useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { CiHeart, CiSearch } from "react-icons/ci";
import { PiShoppingBagLight } from "react-icons/pi";
import { LiaUser } from "react-icons/lia";
import { HeaderContext } from "../../context/appContext";
import Logo from '../../assets/logo.png';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaFacebook, FaFacebookSquare, FaMapMarkerAlt, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SubCategory } from "../../types/CategoryType";
import { AiOutlineInstagram } from "react-icons/ai";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setisUserOpen, iscartOpen, setiscartOpen, isAuthenticated, setisAuthenticated } = useContext<any>(HeaderContext);
  const [isdropDown, setisdropDown] = useState(false);
  const [subcategories, setsubCategories] = useState([]);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [mobile, setMobile] = useState(null);

  async function isUser() {
    const response = await fetch("https://stile-backend.vercel.app/user", { credentials: 'include' });
    const data = await response.json();
    if (data) {
      setMobile(data.user);
    }
    if (response.status === 200) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }
  console.log(mobile);
  useEffect(() => {
    isUser();
  }, []);
  console.log(isAuthenticated)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    }, 1000); 
    setDropdownTimeout(timeout);
  };

  return (
    <div className="fixed bg-white top-0 w-full z-[200]">
      <button
        className="fixed bg-green-500 p-2 rounded-full bottom-8 z-[500] right-3"
        onClick={sendMessage}
      >
        <FaWhatsapp className="text-xl md:text-3xl text-white bg-green-500" />
      </button>
      <header className="border-b relative flex items-center justify-between shadow-sm p-2 md:px-3">
        <RxHamburgerMenu
          onClick={toggleMenu}
          className="md:hidden text-2xl cursor-pointer"
        />

        <Link to="/" className="flex-1 text-center md:hidden">
          <h1 className="flex justify-center items-center">
            <img
              className="h-[25px] w-[40px] object-cover"
              alt="stile sagio"
              src={Logo}
            />
            <p className="text-xs pl-2">STILE SAGIO</p>
          </h1>
        </Link>

        <nav className="uppercase hidden md:block w-full">
          <div className="flex text-[12px] md:text-xs items-center py-4">
            <ul className="flex w-full justify-center items-center space-x-4">
              <li>New Arrivals</li>
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
                        <Link key={subcategory._id} to={`/subcategory/${subcategory._id}`} className="">
                          {subcategory.name}
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>

              <a href="/">
                <h1 className="flex justify-center font-bold items-center">
                  <div className="border-r">
                    <img
                      className="h-[25px] w-[40px] object-cover"
                      alt="stile sagio"
                      src={Logo}
                    />
                  </div>
                  <p className="pl-2">STILE SAGIO</p>
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
        {isMenuOpen && (
          <div className="absolute top-0 left-0 right-0 w-[300px] h-screen bg-white shadow-lg z-[300]  md:hidden">
            <div className="flex  justify-between">
              <h1 className="pb-4 p-4 font-semibold">Menu</h1>
              <IoCloseOutline onClick={toggleMenu} className="text-2xl m-4 cursor-pointer" />
              </div>
              <hr />
            <ul className="flex text-sm uppercase flex-col p-4 ">
              <li className="border-b py-3">New Arrivals</li>
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
                        <Link key={subcategory._id} to={`/subcategory/${subcategory._id}`} className="">
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
              <li className="border-b py-3">Account</li>
            </ul>
            <div className="flex gap-5 justify-center items-center">
              <a href="" className=" flex items-center justify-center ">
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

        {/* Right Side Icons */}
        <div className="flex items-center justify-end space-x-1 md:space-x-2">
          <button>
            <CiSearch className="text-xl md:text-2xl" />
          </button>
          <button>
            <CiHeart className="text-xl md:text-2xl" />
          </button>
          <button onClick={() => setisUserOpen(true)}>
            <LiaUser className="text-xl md:text-2xl" />
          </button>
          <button onClick={() => setiscartOpen(true)}>
            <PiShoppingBagLight className="text-xl md:text-2xl" />
          </button>
        </div>
      </header>
    </div>
  );
}
