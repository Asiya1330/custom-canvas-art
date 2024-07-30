import React from 'react';
import Image from 'next/image';

type NoResultsProps = {
  message: string;
  imageSrc: string;
};

const NoResults: React.FC<NoResultsProps> = ({ message, imageSrc }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-48 h-48">
        <Image src={imageSrc} alt="No results" layout="fill" objectFit="contain" />
      </div>
      <p className="text-lg  mt-4">{message}</p>
    </div>
  );
};

export default NoResults;
