
const Offer = () => {
  const arr = Array(10).fill("Stile Sagio");

  return (
    <div className="md:text-xs md:h-[50px] h-[45px] font-semibold fixed top-0 w-full text-white z-[900] bg-black text-[10px] flex justify-center items-center text-center">
      <div className="flex justify-start items-center animate-scroll whitespace-nowrap">
        {arr.map((text, index) => (
          <div key={index} className="mr-8">{text}</div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default Offer;
