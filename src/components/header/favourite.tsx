import { useContext, useEffect } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { TfiClose } from 'react-icons/tfi';
import { HeaderContext } from '../../context/appContext';
const Favorites = () => {
  const { isFavouriteOpen, setisFavouriteOpen, favourites, setFavourites } =
    useContext(HeaderContext);
  async function getFavorites() {
    const token = localStorage.getItem('token');
    const res = await fetch('https://stile-backend.vercel.app/user/favourites', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Send token in header
      },
    });
    const data = await res.json();
    setFavourites(data.favourites);
  }
  useEffect(() => {
    getFavorites();
  }, []);
  const handleRemoveFavorite = async (item: any) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`https://stile-backend.vercel.app/user/removeFromFavourites`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Send token in header
        },
        body: JSON.stringify({ productId: item._id }),
      });
      await res.json();
      getFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div
      className={`!top-0 right-0 min-h-screen w-full fixed duration-200 sm:w-[350px] bg-white z-[999] overflow-y-auto shadow-lg rounded-lg ${
        isFavouriteOpen ? 'translate-x-0' : 'translate-x-[100%]'
      }`}
    >
      {favourites && favourites.length > 0 ? (
        <div className="px-4 relative mt-5 max-h-[calc(100vh-160px)] mb-5 border-b border-gray-300 overflow-y-scroll">
          <TfiClose
            onClick={() => setisFavouriteOpen(false)}
            size={18}
            className="absolute cursor-pointer text-md md:text-2xl right-4 top-4"
          />
          <h2 className="text-2xl mt-2 font-bold text-gray-900">Your Favorites</h2>
          <div className="flex mt-5 text-gray-500 uppercase justify-between w-full text-[10px]">
            <p>Product</p>
            <p>Action</p>
          </div>
          <hr />
          <div className="space-y-4 mt-5">
            {favourites.map((item: any) => (
              <div
                key={item._id}
                className="flex justify-between items-start bg-gray-50 p-3 rounded-lg shadow-sm"
              >
                <div className="flex w-2/3 gap-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-[70px] h-[100px] md:w-[100px] md:h-[150px] border rounded-md object-cover"
                  />
                  <div className="desc w-full flex flex-col justify-between h-full text-gray-700 text-sm">
                    <div>
                      <Link to={`/product/${item.slug}`}>
                        <h1 className="text-sm md:text-md font-semibold cursor-pointer hover:underline">
                          {item.name.slice(0, 15)}
                          {item.name.length > 15 && '...'}
                        </h1>
                      </Link>
                      <p className="text-gray-700 text-sm md:text-md font-light">
                        Rs.{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFavorite(item)}
                  className="mx-3 text-lg transition duration-200"
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-5 px-4 relative">
          <TfiClose
            onClick={() => setisFavouriteOpen(false)}
            size={16}
            className="absolute cursor-pointer right-4 top-1"
          />
          <h2 className="text-lg md:text-xl font-light text-gray-900">Your Favorites</h2>
          <hr />
          <div className="space-y-10 flex flex-col items-center justify-center">
            <p>Oops....Your Favorites List is Empty</p>
            <Link to="/">
              <button className="p-3 w-full font-light text-xs border bg-black text-white rounded-lg transition duration-200 hover:bg-gray-800">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
