
const Offer = () => {
  const brand = "Stile Sagio"
  const arr = Array(10).fill(brand)
  return (
    <div className="md:text-xs md:h-[50px] h-[45px] font-semibold fixed top-0 w-full  text-white z-[900] bg-black  text-[10px] flex justify-center items-center text-center">
    <p>Buy 3 stylish collar T-shirts for just ₹999—limited offer!</p>
    <div className="flex justify-center items-center animate-scroll whitespace-nowrap">
       {arr.map((val:any,index:any)=>
       <div className="flex gap-3">
        <img className="h-7 object-contain" src="/logoanimation.png" alt="" />
        <h1 key={index} className="text-white font-light uppercase md:text-sm text-[12px] ">{val}</h1>
        </div>
      )}
       
      </div>
    <hr />
    </div>
  )
}

export default Offer