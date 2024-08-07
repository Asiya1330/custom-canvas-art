// components/FooterTop.tsx

import Image from 'next/image';
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
    <div className="bg-custom-purple flex sm:flex-row flex-col justify-center items-center relative md:h-80 h-40 text-white">
      <div className='lg:w-48 lg:h-48 md:w-28 md:h-28 h-10 w-10 absolute top-0 left-0'>
        <Image src={topLeftIconSrc} alt="Top Left Icon" className=""
          fill />
      </div>
      <h2 className="lg:text-6xl md:text-3xl text-2xl mb-2 sm:mb-0 font-bold mr-4">{title}</h2>
      <Link href={"/art-generation"}
        className="bg-custom-black sm:text-xl text-lg text-white px-4 py-2 rounded-md hover:bg-gray-800"
      >
        {buttonText}
      </Link>
      <div className='lg:w-48 lg:h-48 md:w-28 md:h-28 h-10 w-10 absolute bottom-0 right-0'>

        <Image src={bottomRightIconSrc} alt="Bottom Right Icon" className=""
          fill />
      </div>
    </div>
  );
};

export default FooterTop;
