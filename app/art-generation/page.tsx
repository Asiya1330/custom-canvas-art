"use client"
import { FaHeart } from "react-icons/fa";
import ArtGenerator from "../components/ArtGenerator/ArtGenerator";
import ImagesDisplay from "../components/ImagesDisplay";
import AuthWrapper from "../components/AuthWrapper";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useAuth } from "@clerk/nextjs";
import { fetchUserImages } from "../firebase/fetchImages";
import Link from "next/link";

const ArtGenerationPage: React.FC = () => {
  const [images, setImages] = useState<DocumentData[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) {
        return;
      }

      try {
        const fetchedImages = await fetchUserImages(userId);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [userId]);

  const addImage = (newImage: DocumentData) => {
    setImages((prevImages) => [newImage, ...prevImages]);
  };
  return (
    <div className="min-h-screen flex justify-between items-start ">
      <div className="container mx-auto flex flex-col md:flex-row gap-4">
        <div className="md:w-3/5">
          <ArtGenerator addImage={addImage} />
        </div>
        <div className="md:w-2/5 flex flex-col items-center mt-2">
          <Link href={"/saved-art"} className="flex items-center px-4 py-2 bg-custom-green text-white rounded-full hover:bg-green-600">
            Go to Saved Art
            <FaHeart className="ml-2" />
          </Link>
          <label className="text-custom-green mt-2">Recent Favourites</label>

          <ImagesDisplay images={images} />
        </div>
      </div>
    </div>
  );
};

export default ArtGenerationPage;
