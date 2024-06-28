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
  const { userId } = useAuth();

  const handleFavoriteClick = async () => {
    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    try {
      await uploadImageToFirestore(userId, imageFile, description);
      toast.success("Image saved to favorites!");
      setIsFavorite(true);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the image.");
    }
  };

  const imageUrl = URL.createObjectURL(imageFile);

  return (
    <div className='w-full flex justify-center mt-4 relative'>
      <div className='relative max-w-full w-full min-h-80'>
        <Image src={imageUrl} alt="Generated Art" className="absolute top-0 left-0 w-full h-full object-contain" layout="fill" />
      </div>
      <button
        className="absolute top-2 right-2 text-red-500"
        onClick={handleFavoriteClick}
      >
        {isFavorite ? <AiFillHeart size={30} /> : <AiOutlineHeart size={30} />}
      </button>
    </div>
  );
};

export default FavoriteImage;
