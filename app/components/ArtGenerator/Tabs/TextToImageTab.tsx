// components/TextToImage.tsx
import React from 'react';
import DescriptionInput from '../DescriptionInput';
import AspectRatioBox from '../AspectRatioBox';
import RectanglesWithArrow from '../../RectanglesWithArrow';

interface TextToImageProps {
  description: string;
  setDescription: (description: string) => void;
  selectedAspectRatio: string | null;
  setSelectedAspectRatio: (aspectRatio: string) => void;
  aspectRatios: string[];
}

const TextToImage: React.FC<TextToImageProps> = ({ description, setDescription, selectedAspectRatio, setSelectedAspectRatio, aspectRatios }) => {
  return (
    <div>
      <label className="text-custom-black block">Aspect ratio</label>
      <div className="flex flex-wrap justify-center md:justify-start w-fit flex-col">
        <div className='block'>
          <RectanglesWithArrow />
        </div>
        <div className='flex flex-wrap justify-center'>
          {aspectRatios.map((ratio) => (
            <AspectRatioBox
              key={ratio}
              aspectRatio={ratio}
              selected={selectedAspectRatio === ratio}
              onClick={() => setSelectedAspectRatio(ratio)}
            />
          ))}
        </div>
      </div>
      <DescriptionInput
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default TextToImage;
