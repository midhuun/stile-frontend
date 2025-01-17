import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { Product } from '../../types/CategoryType'
import { GoSearch } from 'react-icons/go'
import { Link, useNavigate } from 'react-router-dom'
function Auto({items}:any) {
  // note: the id field is mandatory
  const navigate = useNavigate();
  const handleOnSearch = (string:any, results:any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result:any) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item:any) => {
    // the item selected
    navigate(`/product/${item.slug}`)
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item:any) => {
    return (
        <div className="flex cursor-pointer items-center p-2 transition-transform transform duration-200">
        <img 
          src={item.images[0]} 
          alt={item.name} 
          className="w-20 h-28 object-cover rounded-md mr-4" 
        />
        <div className="flex flex-col">
          <span className="text-xs md:text-sm text-gray-600 hover:underline duration-300">
            {item.name}
          </span>
          <span className="text-[10px] md:text-xs text-gray-600 duration-300">
            {item.description.split(" ").slice(0, 9).join(" ")}...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className=" relative">
      <header >
        <div className='w-full pl-5'>

        <ReactSearchAutocomplete
  items={items}
  onSearch={handleOnSearch}
  onHover={handleOnHover}
  onSelect={handleOnSelect}
  onFocus={handleOnFocus}
  placeholder='Search'
  autoFocus
  formatResult={formatResult}
  showIcon={false}
  className=''
  styling={{
    height: '50px',
    backgroundColor: 'white',
    hoverBackgroundColor: '#f7fafc', // Light gray on hover
    color: '#333',
    fontSize: '1rem',
    zIndex: 999,
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
