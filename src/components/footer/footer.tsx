import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#070b2a] text-white py-8 px-4">
       <div className=" p-4 md:p-6 flex flex-col md:flex-row justify-between items-center">
      <div className="flex items-center  mb-4 md:mb-0">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSudproXHcbk7MbCOfHi7sGiv1-uE73Cb4diA&s" 
          alt="100% Original Guarantee" 
          className="h-8 w-auto mr-2" 
        />
        <span className="text-[13px] md:text-md text-white font-semibold">
          100% Original Guarantee
        </span>
      </div>
     
    </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h2 className="text-md md:text-xl font-bold mb-4">Stile Sagio</h2>
          <p className="text-xs md:text-sm">
            Redefining fashion with premium quality and unique styles. Your go-to destination for modern and stylish clothing.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm md:text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><a href="/" className="hover:text-gray-400">Home</a></li>
            <li><a href="/shop" className="hover:text-gray-400">Shop</a></li>
            <li><a href="/about-us" className="hover:text-gray-400">About Us</a></li>
            <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            <li><a href="/faq" className="hover:text-gray-400">FAQs</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-sm md:text-lg font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2 text-xs md:text-sm">
            <li><a href="/returns" className="hover:text-gray-400">Returns & Exchanges</a></li>
            <li><a href="/shipping" className="hover:text-gray-400">Shipping Policy</a></li>
            <li><a href="/terms" className="hover:text-gray-400">Terms & Conditions</a></li>
           
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-sm md:text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-xs md:text-sm">Email: support@stilesagio.com</p>
          <p className="text-xs md:text-sm">Phone: +91 96779 66333</p>
          <div className="flex space-x-4 mt-4">
            <a href="https://www.facebook.com/share/18bLtJETLq" className="p-2 bg-blue-500 rounded-full hover:bg-gray-500">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/stilesagio" className="p-2 bg-red-500 rounded-full hover:bg-gray-500">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@Stilesagio" className="p-2 bg-white text-red-500 rounded-full hover:bg-gray-500">
              <FaYoutube />
            </a>
            <a href="https://maps.app.goo.gl/gsi1unahDiVUFr6z9" className="p-2 bg-white text-blue-600 rounded-full hover:bg-gray-500">
              <MdLocationPin />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>© {new Date().getFullYear()} Stile Sagio. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
