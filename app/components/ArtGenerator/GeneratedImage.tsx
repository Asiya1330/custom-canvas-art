// components/FavoriteImage.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useAuth } from '@clerk/nextjs';
import { uploadImageToFirestore } from '@/app/firebase/uploadImage';

interface FavoriteImageProps {
  imageFile: Blob;
  description: string;
}

const FavoriteImage: React.FC<FavoriteImageProps> = ({ imageFile, description }) => {
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
      await uploadImageToFirestore(userId, imageFile, description);
      toast.success("Image saved to favorites!");
      setIsFavorite(true);
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
      <div className='relative max-w-full w-full min-h-80'>
        <Image src={imageUrl} alt="Generated Art" className="absolute top-0 left-0 w-full h-full object-contain" layout="fill" />
      </div>
      <button
        className={`absolute top-2 right-2 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} 
         ${isFavorite ? 'text-red-500 hover:text-red-700' : 'text-gray-500 hover:text-gray-700'}`}

        onClick={handleFavoriteClick}
        disabled={loading}
      >
        {isFavorite ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
      </button>
    </div>
  );
};

export default FavoriteImage;
