// components/ColorSelector.tsx

'use client';

import { colors } from '@/app/utils/constants';
import { useState } from 'react';

interface ColorSelectorProps {
  onSelect: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ onSelect }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onSelect(color);
  };

  return (
    <div className="flex space-x-4 my-2">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-5 h-5 rounded-full cursor-pointer ${selectedColor === color ? 'ring-1 ring-offset-1 ring-indigo-500' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => handleColorSelect(color)}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
