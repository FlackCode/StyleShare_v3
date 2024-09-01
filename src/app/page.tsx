import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      {/*
      <div className="border-t border-b border-gray-300 p-4 flex justify-between xl:px-16">
        <h1 className="font-bold md:text-lg transition-all duration-300 hover:scale-105 select-none cursor-pointer">BRANDS</h1>
        <h1 className="font-bold md:text-lg transition-all duration-300 hover:scale-105 select-none cursor-pointer">MEN</h1>
        <h1 className="font-bold md:text-lg transition-all duration-300 hover:scale-105 select-none cursor-pointer">WOMEN</h1>
        <h1 className="font-bold md:text-lg transition-all duration-300 hover:scale-105 select-none cursor-pointer">SALES</h1>
        <h1 className="font-bold md:text-lg transition-all duration-300 hover:scale-105 select-none cursor-pointer">NEW</h1>
      </div>
      */}
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
