"use client";
import React from 'react';
import { motion } from 'framer-motion';

interface ImageSlideProps {
  src: string;
  alt: string;
  title: string;
  isCenter: boolean; // New prop
}

const ImageSlide: React.FC<ImageSlideProps> = ({ src, alt, title, isCenter }) => (
  <motion.div
    className={`overflow-hidden mx-2 relative group ${isCenter ? 'shadow-lg' : ''}`}
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ duration: 0.5 }}
  >
    <img
      src={src}
      alt={alt}
      className={`w-full object-cover ${isCenter ? 'h-[500px] p-2 centered-image-border' : 'h-96'}`}
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  </motion.div>
);

export default ImageSlide;
