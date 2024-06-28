"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import { fetchUserImages } from '../firebase/fetchImages';
import { DocumentData } from 'firebase/firestore';

interface ImageData {
  id: string;
  imageUrl: string;
  description: string;
}

const ImagesDisplay: React.FC = () => {
  const [images, setImages] = useState<DocumentData[]>([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchImages = async () => {
      if (!userId) {
        return;
      }

      try {
        const images = await fetchUserImages(userId);
        setImages(images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
      {images.map((image) => (
        <div key={image.id} className="relative">
          <Image
            src={image.imageUrl}
            alt={image.description}
            className="w-full h-auto object-cover"
            width={200}
            height={200}
            title={image.description}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesDisplay;
