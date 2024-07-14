"use client";
import React from 'react';
import ImageSlide from './ImageCarousal/ImageSlide';

const ThreeImageDisplay: React.FC = () => {
  const slides = [
    {
      src: '/home/bauhaus print 2-3.png',
      alt: 'bauhaus print 2-3',
      title: 'bauhaus print 2-3',
    },
    {
      src: '/home/oil painting, jackson pollock.jpeg',
      alt: 'oil painting, jackson pollock',
      title: 'oil painting, jackson pollock',
    },
    {
      src: '/home/la calaca dia de los muertos poster art.jpeg',
      alt: 'la calaca dia de los muertos poster art',
      title: 'la calaca dia de los muertos poster art',
    },
  ];

  return (
    <div className="flex justify-center items-center space-x-8">
      {slides.map((slide, index) => {
        const isCenter = index === 1; // The middle image
        return (
          <ImageSlide
            key={index}
            src={slide.src}
            alt={slide.alt}
            title={slide.title}
            isCenter={isCenter}
          />
        );
      })}
    </div>
  );
};

export default ThreeImageDisplay;
