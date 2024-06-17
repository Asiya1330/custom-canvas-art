"use client";
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const ImageCarousel: React.FC = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      useKeyboardArrows
      autoPlay
      interval={3000}
      showArrows
      centerMode
      centerSlidePercentage={33.33}
      emulateTouch={true}
      className="mx-auto container" // Center the carousel and set max width
    >
      <div className="rounded-lg overflow-hidden mx-2 relative">
        <img src="/more.jpg" alt="Image 1" className="w-full rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
          <h3 className="text-xl font-bold">Content Below Image 1</h3>
          <p className="mt-2">Description or additional text here...</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden mx-2 relative">
        <img src="/more.jpg" alt="Image 2" className="w-full rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
          <h3 className="text-xl font-bold">Content Below Image 2</h3>
          <p className="mt-2">Description or additional text here...</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden mx-2 relative">
        <img src="/more.jpg" alt="Image 3" className="w-full rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
          <h3 className="text-xl font-bold">Content Below Image 3</h3>
          <p className="mt-2">Description or additional text here...</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden mx-2 relative">
        <img src="/more.jpg" alt="Image 4" className="w-full rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
          <h3 className="text-xl font-bold">Content Below Image 4</h3>
          <p className="mt-2">Description or additional text here...</p>
        </div>
      </div>
      <div className="rounded-lg overflow-hidden mx-2 relative">
        <img src="/more.jpg" alt="Image 5" className="w-full rounded-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
          <h3 className="text-xl font-bold">Content Below Image 5</h3>
          <p className="mt-2">Description or additional text here...</p>
        </div>
      </div>
    </Carousel>
  );
};

export default ImageCarousel;
