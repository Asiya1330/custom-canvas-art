// components/Card.tsx

import React from 'react';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description }) => {
  return (
    <div className="flex p-4 text-white">
      <img src={imageSrc} alt={title} className="w-16 h-16 mr-4 mt-1" />
      <div>
        <p className="text-lg font-bold">{title}</p>
        <p className="text-sm ">{description}</p>
      </div>
    </div>
  );
};

export default Card;
