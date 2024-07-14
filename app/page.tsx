"use client"
import { SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import ImageCarousel from "./components/ImageCarousal/ImageCarousal";
import ThreeImageDisplay from "./components/ThreeImagesDisplay";

export default function Home() {
  return (
    <>
      <section className="container mx-auto my-16">
        <div className="flex justify-between items-center flex-col md:flex-row px-4" >
          <div className="w-full md:w-3/4 md:text-start  text-center">
            <h2 className=" text-2xl md:text-4xl font-bold text-gray-700">Create custom art for your home in seconds, delivered to your door in days</h2>
            <p className="mt-2 text-gray-700">Get a one-of-a kind piece in the exact size you want.</p>
          </div>
          <SignedOut>
            <div className="w-full md:w-1/4 flex flex-col items-center mt-4 md:mt-0">
              <p className="text-custom-black mb-2">Create an account</p>
              <Link href={"/sign-up"} className="bg-custom-green text-white text-center px-10 py-2  hover:bg-green-500 w-fit">Start</Link>
            </div>
          </SignedOut>

        </div>
      </section>
      {/* <ImageCarousel /> */}
      <ThreeImageDisplay />
    </>
  );
}
