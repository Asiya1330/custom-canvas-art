// components/FooterTop.tsx

import Link from 'next/link';
import React from 'react';

interface FooterTopProps {
  title: string;
  buttonText: string;
  topLeftIconSrc: string;
  bottomRightIconSrc: string;
}

const FooterTop: React.FC<FooterTopProps> = ({
  title,
  buttonText,
  topLeftIconSrc,
  bottomRightIconSrc
}) => {
  return (
    <div className="bg-custom-purple flex justify-center items-center relative h-80 text-white">
      <img src={topLeftIconSrc} alt="Top Left Icon" className="absolute top-0 left-0 w-48 h-4w-48" />
      <h2 className="text-6xl font-bold mr-4">{title}</h2>
      <Link href={"/art-generation"}
        className="bg-custom-black text-xl text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        {buttonText}
      </Link>
      <img src={bottomRightIconSrc} alt="Bottom Right Icon" className="absolute bottom-0 right-0 w-48 h-4w-48" />
    </div>
  );
};

export default FooterTop;
