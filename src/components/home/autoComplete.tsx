import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { HeaderContext } from '../../context/appContext';
import { IoCloseOutline } from 'react-icons/io5';
function Auto({items}:any) {
  const navigate = useNavigate();
  const {setsearchOpen} = useContext(HeaderContext)
  const handleOnSearch = (string:any, results:any) => {
    console.log(string, results)
  }

  const handleOnHover = (result:any) => {
    console.log(result)
  }

  const handleOnSelect = (item:any) => {
    setsearchOpen(false);
    navigate(`/product/${item.slug}`);
    window.location.reload();
    console.log(item)
  }


  const formatResult = (item:any) => {
    return (
        <div className="flex cursor-pointer font-mono  p-2 transition-transform transform duration-200">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="h-16 w-[30%] md:w-20 md:h-28 object-cover rounded-md mr-4" 
        />
        <div className="flex flex-col">
          <span className="text-xs font-semibold md:text-sm text-gray-600 hover:underline duration-300">
            {item.name}
          </span>
          <span className="text-[10px] hidden md:block md:text-xs text-gray-600 duration-300">
            {item.description.split(" ").slice(0, 9).join(" ")}...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className=" relative">
      <header className='flex justify-center items-center'>
        <div className=' w-[80%] md:w-full  mt-6 '>
        <button onClick={()=>setsearchOpen(false)} className="absolute -right-0 sm:right-7  -translate-y-[40%] top-[38px] md:top-10 md:-right-7 z-[1000] text-3xl">
           <IoCloseOutline className="" />
           </button>
        <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            placeholder='Search'
            fuseOptions={{ keys: ["name", "description"] }}
            autoFocus= {true}
            formatResult={formatResult}
            showIcon={false}
            showClear={false}
            className='search-autocomplete '
            styling={{
                height:'35px',
                backgroundColor: 'white',
                hoverBackgroundColor: '#f7fafc', // Light gray on hover
                color: '#333',
                fontSize: '1rem',
                zIndex: 999,
               
                boxShadow:'0px',
                placeholderColor: '#aaa',
                iconColor: '#aaa',
            }}
            />

        </div>
      </header>
    </div>
  )
}

export default Auto;
