import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <hr />
      <div className="flex justify-center py-16">
        <div className="flex flex-col justify-center min-h-[80svh] px-2 md:px-8 xl:max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-bold text-center py-2">FIND YOUR OWN STYLE</h1>
          <p className="text-lg md:text-xl font-semibold text-center py-2">Buy and sell clothes, build your own style from our variety of clothes and accessories.</p>
          {/*
          <div className="flex justify-center gap-2">
            <button className="border border-black px-4 py-2 xl:py-4 font-bold transition-all duration-300 hover:bg-black hover:text-white w-full">SHOP MEN</button>
            <button className="border border-black px-4 py-2 xl:py-4 font-bold transition-all duration-300 hover:bg-black hover:text-white w-full">SHOP WOMEN</button>
          </div>
          */}
        </div>
        </div>
    </div>
  );
}
