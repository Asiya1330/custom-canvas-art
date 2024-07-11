"use client";
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ImageSlide from './ImageSlide';

const CarouselWrapper: React.FC = () => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  useEffect(() => {
    const updateSlidePercentage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCenterSlidePercentage(33.33);
        setVisibleSlides(3); // 3 images on large screens
      } else if (width >= 768) {
        setCenterSlidePercentage(50);
        setVisibleSlides(2); // 2 images on tablets
      } else {
        setCenterSlidePercentage(100);
        setVisibleSlides(1); // 1 image on mobile
      }
    };

    updateSlidePercentage();

    window.addEventListener('resize', updateSlidePercentage);
    return () => window.removeEventListener('resize', updateSlidePercentage);
  }, []);

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
    {
      src: '/home/propaganda poster, dia de los muertos, a dancing skeleton, _dia de los muertos_.jpeg',
      alt: 'propaganda poster, dia de los muertos, a dancing skeleton, _dia de los muertos',
      title: 'propaganda poster, dia de los muertos, a dancing skeleton, _dia de los muertos',
    },
    {
      src: '/home/mona lisa eating ice cream, oil painting, craquelure, 16th century.jpg',
      alt: 'mona lisa eating ice cream, oil painting, craquelure, 16th century',
      title: 'mona lisa eating ice cream, oil painting, craquelure, 16th century',
    },
    {
      src: '/home/1950s tourism poster for san diego.jpeg',
      alt: '1950s tourism poster for san diego',
      title: '1950s tourism poster for san diego',
    },
    {
      src: '/home/1950s travel tourism propaganda poster for Monument Valley National Park.jpeg',
      alt: '1950s travel tourism propaganda poster for Monument Valley National Park',
      title: '1950s travel tourism propaganda poster for Monument Valley National Park',
    },
    {
      src: '/home/art print on canvas in the style of Zarina Hashmi.jpeg',
      alt: 'art print on canvas in the style of Zarina Hashmi',
      title: 'art print on canvas in the style of Zarina Hashmi',
    },
    {
      src: '/home/la calaca dia de los muertos poster art washed out color.jpeg',
      alt: 'la calaca dia de los muertos poster art washed out color',
      title: 'la calaca dia de los muertos poster art washed out color',
    },

    {
      src: '/home/travel tourism propaganda poster for Monument Valley National Park washed out color, _Visit Monument Valley_ National Parks Service logo.jpeg',
      alt: 'travel tourism propaganda poster for Monument Valley National Park washed out color',
      title: 'travel tourism propaganda poster for Monument Valley National Park washed out color',
    },


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
      showIndicators={false}
      className="mx-auto container"
      selectedItem={currentIndex}
      onChange={(index) => setCurrentIndex(index)}
    >
      {slides.map((slide, index) => {
        const isCenter = index === currentIndex % slides.length; // Ensure index wraps around
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
    </Carousel>
  );
};

export default CarouselWrapper;
