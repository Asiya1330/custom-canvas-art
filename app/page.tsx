import Image from "next/image";
import ImageCarousel from "./components/ImageCarousal";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="container mx-auto my-8">
        <div className="flex justify-around items-center">
        <div className="w-6/10 p-4">
          <h2 className="text-2xl font-bold text-gray-700">Create custom art for your home in seconds, delivered to your door in days</h2>
          <p className="mt-2 text-gray-700">Get a one-of-a kind piece in the exact size you want.</p>
        </div>
        <div className="w-4/10 p-4 flex flex-col items-center">
          <p className="text-custom-black mb-2">Create an account</p>
          <Link href={"/sign-up"} className="bg-custom-green text-white text-center px-4 py-2 w-full hover:bg-green-500">Start</Link>
        </div>
        </div>
      </section>
      <ImageCarousel />
    </>
  );
}
