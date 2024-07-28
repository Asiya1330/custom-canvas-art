// components/CardGrid.tsx

import React from 'react';
import Card from './Card';

interface CardGridProps {
  cards: { imageSrc: string; title: string; description: string }[];
}

const CardGrid: React.FC<CardGridProps> = ({ cards }) => {
  return (
    <div className="bg-dark-purple py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-8">Inspiring Your Artistic Expression</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <Card
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
