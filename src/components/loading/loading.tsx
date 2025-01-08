import './loading.css';
const Loading = () => {
  return (
    <div className='fixed z-[400] bg-white min-h-screen w-full'>
  <div className="flex w-full h-screen justify-center items-center">
 <div className="spinner">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
    </div>
    </div>
  )
}

export default Loading;