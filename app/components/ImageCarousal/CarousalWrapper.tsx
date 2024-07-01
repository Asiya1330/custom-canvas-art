"use client";
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageSlide from './ImageSlide';

const CarouselWrapper: React.FC = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCenterSlidePercentage(33.33); // 3 images on large screens
      } else if (width >= 768) {
        setCenterSlidePercentage(50); // 2 images on tablets
      } else {
        setCenterSlidePercentage(100); // 1 image on mobile
      }
    };

    updateSlidePercentage(); // Initial call to set the correct value

    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

  const slides = [
    { src: '/carousal-1.jpg', alt: 'Image 1', title: 'Content Below Image 1', description: 'Description or additional text here...' },
    { src: '/carousal-2.jpeg', alt: 'Image 2', title: 'Content Below Image 2', description: 'Description or additional text here...' },
    { src: '/carousal-3.jpg', alt: 'Image 3', title: 'Content Below Image 3', description: 'Description or additional text here...' },
    { src: '/carousal-4.jpg', alt: 'Image 4', title: 'Content Below Image 4', description: 'Description or additional text here...' },
    { src: '/carousal-5.png', alt: 'Image 5', title: 'Content Below Image 5', description: 'Description or additional text here...' },
  ];

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
      centerSlidePercentage={centerSlidePercentage}
      emulateTouch={true}
      showIndicators={false} // Hide dots
      className="mx-auto container"
    >
      {slides.map((slide, index) => (
        <ImageSlide
          key={index}
          src={slide.src}
          alt={slide.alt}
          title={slide.title}
          description={slide.description}
        />
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
