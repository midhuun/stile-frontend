
const Offer = () => {
  const brand = ""
  const arr = Array(10).fill(brand)
  return (
    <div className="md:text-xs md:h-[50px] h-[45px] font-semibold fixed top-0 w-full  text-white z-[900] bg-black  text-[10px] flex justify-center items-center text-center">
    <div className="flex justify-center items-center animate-scroll whitespace-nowrap">
       {arr.map((__,index:any)=>
       <div key={index} className="flex gap-3">
        <img className="h-7 object-contain" src="/logoanimation.png" alt="" />
        </div>
      )}
       
      </div>
    <hr />
    </div>
  )
}

export default Offer