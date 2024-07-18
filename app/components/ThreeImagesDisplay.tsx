"use client";
import React from 'react';
import ImageSlide from './ImageCarousal/ImageSlide';

const ThreeImageDisplay: React.FC = () => {
    const slides = [
        {
            src: '/home/mona lisa eating ice cream, oil painting, craquelure, 16th century.jpg',
            alt: 'mona lisa eating ice cream, oil painting, craquelure, 16th century',
            title: 'mona lisa eating ice cream, oil painting, craquelure, 16th century',
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
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-8 space-y-4 sm:space-y-0">
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
