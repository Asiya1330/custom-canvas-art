"use client";
import React from 'react';

interface ImageSlideProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const ImageSlide: React.FC<ImageSlideProps> = ({ src, alt, title, description }) => (
    <div className="rounded-lg overflow-hidden mx-2 relative group">
    <img src={src} alt={alt} className="w-full h-64 object-cover rounded-lg" />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2">{description}</p>
    </div>
  </div>
);

export default ImageSlide;
