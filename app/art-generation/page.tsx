"use client"
import { useAuth } from "@clerk/nextjs";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import ArtGenerator from "../components/ArtGenerator/ArtGenerator";
import FavoriteImage from "../components/ArtGenerator/GeneratedImage";
import { fetchUserImages } from "../firebase/fetchImages";
import NoResults from "../components/ArtGenerator/Noresults";

const ArtGenerationPage: React.FC = () => {
  const [images, setImages] = useState<DocumentData[]>([]);
  const { userId } = useAuth();
  const [generatedImage, setGeneratedImage] = useState<Blob | null>(null);
  const [description, setDescription] = useState('');
  const [seed, setSeed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('');
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

  const handleSetGeneratedImage = (
    image: Blob | null,
    description: string,
    seed: number,
    negativePrompt: string,
    aspectRatio: string,
    loading: boolean
  ) => {
    setGeneratedImage(image);
    setDescription(description);
    setSeed(seed);
    setNegativePrompt(negativePrompt);
    setAspectRatio(aspectRatio);
    setLoading(loading);
  };
  const addImage = (newImage: DocumentData) => {
    setImages((prevImages) => [newImage, ...prevImages]);
  };
  return (
    <div className="min-h-screen flex justify-between items-start ">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 p-4">
        <div className="md:w-3/5">
          <ArtGenerator addImage={addImage} setGeneratedImage={handleSetGeneratedImage} />
        </div>
        <div className="md:w-2/5 flex flex-col items-center mt-2">

          <h3 className="text-2xl font-bold my-2">Artwork Result</h3>
          {loading ? (
            <div className="relative flex mt-4 justify-center mx-auto items-center">
              <BounceLoader color="#7500EA" />
            </div>
          ) : !generatedImage ? (
            <NoResults
              message="No results yet"
              imageSrc="/no-results.png"
            />
          ) : (
            <FavoriteImage
              imageFile={generatedImage}
              description={description}
              seed={seed}
              negativePrompt={negativePrompt}
              aspectRatio={aspectRatio || ''}
              addImage={addImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtGenerationPage;
