// components/Hero.tsx

import Image from "next/image";
import Link from "next/link";


const Hero = () => {
  return (
    <section className="container mx-auto my-16">
      <div className="flex justify-between items-center flex-col md:flex-row px-4">
        <div className="w-full md:w-3/4 text-center mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold">
            Create custom art for your home in seconds, delivered to your door in days
          </h2>
          <p className="mt-2">Get a one-of-a kind piece in the exact size you want.</p>
        </div>
        
      </div>
      <div className="mt-8 flex justify-center">
        <Link href={"/art-generation"} className="bg-custom-purple rounded-s rounded-e text-white text-center px-10 py-2 hover:bg-purple-500">
        Start Creating Art
        </Link>
      </div>
      <div className="mt-8 flex justify-center h-36 sm:h-80 md:h-[30rem] relative">
        <Image src="/home/Home-hero.png" alt="Home Art" className="object-contain" fill />

      </div>
    </section>
  );
};

export default Hero;
