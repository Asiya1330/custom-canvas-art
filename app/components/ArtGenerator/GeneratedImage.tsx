// components/FavoriteImage.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';
import { uploadImageToFirestore } from '@/app/firebase/uploadImage';
import { ClipLoader } from 'react-spinners';
import { DocumentData } from 'firebase/firestore';

interface FavoriteImageProps {
  imageFile: Blob;
  description: string;
  seed: number;
  negativePrompt: string;
  aspectRatio: string;
  addImage: (newImage: DocumentData) => void;
}

const FavoriteImage: React.FC<FavoriteImageProps> = ({ imageFile, description, seed, negativePrompt, aspectRatio, addImage }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const handleFavoriteClick = async () => {
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }
    if (isFavorite) {
      toast.info("Image is already in favorites.");
      return;
    }
    setLoading(true);
    try {
      await uploadImageToFirestore(userId, imageFile, description, seed, negativePrompt, aspectRatio);
      toast.success("Image saved to favorites!");
      setIsFavorite(true);
      const newImage = { id: new Date().toISOString(), imageUrl: URL.createObjectURL(imageFile), description, seed, negativePrompt, aspectRatio };
      addImage(newImage);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the image.");
    } finally {
      setLoading(false);
    }
  };
  const imageUrl = URL.createObjectURL(imageFile);

  return (
    <div className='w-full flex justify-center mt-4 relative'>
      <div className='relative max-w-full w-1/2 min-h-80'>
        <img src={imageUrl} alt="Generated Art" className="object-contain" />
        <button
          className={`absolute top-2 right-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} 
         ${isFavorite ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={handleFavoriteClick}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color={isFavorite ? 'red' : 'black'} />
          ) : (
            isFavorite ? <AiFillHeart size={20} /> : <AiOutlineHeart color='black' size={20} />
          )}
        </button>
      </div>

    </div>

  );
};

export default FavoriteImage;
