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
  seed: number,
  setSeed: (seed: number) => void;
  negativePrompt: string,
  setNegativePrompt: (negativePrompt: string) => void,
}

const TextToImage: React.FC<TextToImageProps> = ({ description, setDescription, selectedAspectRatio, setSelectedAspectRatio, aspectRatios, seed, setSeed, negativePrompt, setNegativePrompt }) => {
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
      <div className="flex flex-wrap mt-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="seed">Seed <span className='text-gray-500'>(Optional)</span>: </label>
          <input
            type="number"
            value={seed}
            onChange={(e) => setSeed(Number(e.target.value))}
            placeholder="Seed value"
            className="w-full mt-2 p-2 border rounded"
            min={0}
            max={4294967294}
          />
        </div>
        <div className="w-1/2 pl-2">
          <label htmlFor="negativePrompt">Negative Prompt<span className='text-gray-500'>(Optional)</span>: </label>
          <input
            type='text'
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="Enter negative prompt"
            className="w-full mt-2 p-2 border rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default TextToImage;
