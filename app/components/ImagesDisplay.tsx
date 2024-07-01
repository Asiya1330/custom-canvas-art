"use client";
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';

interface ImagesDisplayProps {
  images: DocumentData[];
}

const ImagesDisplay: React.FC<ImagesDisplayProps> = ({ images }) => {


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
