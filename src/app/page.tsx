import { BsSearch, BsPersonFill } from "react-icons/bs";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="flex justify-between py-2 px-4 xl:px-16">
        <h1 className="font-bold tracking-wider text-lg md:text-xl">STYLESHARE</h1>
        <div className="flex gap-2">
          <button className="border border-black font-bold text-xs md:text-base px-1 transition-all duration-300 hover:bg-black hover:text-white">SELL</button>
          <button className="border border-black font-bold text-xs md:text-base px-1 transition-all duration-300 hover:bg-black hover:text-white">SHOP</button>
          <button className="border border-black font-bold text-xs md:text-base px-1 transition-all duration-300 hover:bg-black hover:text-white">LOGIN</button>
          <button className="border border-black font-bold text-xs md:text-base px-1 transition-all duration-300 hover:bg-black hover:text-white">SIGN UP</button>
        </div>
      </div>
      <form className="px-2 py-2 m-2 border border-black flex flex-row items-center xl:mx-16">
        <label htmlFor="search" className="px-2">
          <BsSearch />
        </label>
        <input type="text" name="search" id="search" placeholder="Search..." 
          className="flex-1 h-full focus:outline-none border-none"/>
        <button className="border border-black font-bold text-sm md:text-base px-2 py-1 transition-all duration-300 hover:bg-black hover:text-white">
          GO
        </button>
      </form>
      <div className="border-t border-b border-gray-300 p-4 flex justify-between xl:px-16">
        <h1 className="font-bold md:text-lg">BRANDS</h1>
        <h1 className="font-bold md:text-lg">MEN</h1>
        <h1 className="font-bold md:text-lg">WOMEN</h1>
        <h1 className="font-bold md:text-lg">SALES</h1>
        <h1 className="font-bold md:text-lg">NEW</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center min-h-[80svh] px-2 md:px-8 xl:max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-center py-2">FIND YOUR OWN STYLE</h1>
          <p className="text-lg md:text-xl font-semibold text-center py-2">Buy and sell clothes, build your own style from our variety of clothes and accessories.</p>
          <div className="flex justify-center gap-2">
            <button className="border border-black px-4 py-2 xl:py-4 font-bold transition-all duration-300 hover:bg-black hover:text-white w-full">SHOP MEN</button>
            <button className="border border-black px-4 py-2 xl:py-4 font-bold transition-all duration-300 hover:bg-black hover:text-white w-full">SHOP WOMEN</button>
          </div>
        </div>
        </div>
    </div>
  );
}
