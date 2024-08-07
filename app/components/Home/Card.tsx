// components/Card.tsx

import Image from 'next/image';
import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="flex p-4 text-white">
      <Image src={imageSrc} alt={title} className="mr-4 mt-1 object-contain" height={64} width={64}/>
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm ">{description}</p>
      </div>
    </div>
  );
};

export default Card;
