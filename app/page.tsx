import Hero from "@/app/components/hero";
import Search from "@/app/components/search";

export default function Home() {
 
  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="w-[600px] flex flex-col">
        <Hero />
        <Search />
      </div>
    </div>
  );
}
