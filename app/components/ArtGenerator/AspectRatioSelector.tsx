import { useState } from 'react';

const aspectRatios = ['21:9', '16:9', '3:2', '5:4', '1:1', '4:5', '2:3', '9:16', '9:21'];

interface AspectRatioSelectorProps {
  // aspectRatio: string;
  onAspectRatioChange: (aspectRatio: string) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ onAspectRatioChange }) => {
   const [selectedIndex, setSelectedIndex] = useState(4);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = Number(event.target.value);
    setSelectedIndex(newIndex);
    onAspectRatioChange(aspectRatios[newIndex]);
  };

  const getAspectRatioStyles = (aspectRatio: string) => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return {
      paddingBottom: `${(height / width) * 100}%`,
    };
  };

  return (
    <div className="flex  items-center flex-wrap">
      <label htmlFor="aspect-ratio" className="text-sm text-gray-700 w-full block">
        Select Aspect Ratio:<sup className='text-red-600'>*</sup>
      </label>
      <div className='flex h-24 w-full items-center'>


        <input
          type="range"
          id="aspect-ratio"
          min="0"
          max={aspectRatios.length - 1}
          value={selectedIndex}
          onChange={handleChange}
          className="w-1/2 !mt-0"
        />
        <div className="text-center mx-8 w-6">
          {aspectRatios[selectedIndex]}
        </div>
        <div className="w-12 relative bg-gray-200 p-1">
          <div className="inset-0 w-full  border-2 border-gray-900 rounded-md"
            style={getAspectRatioStyles(aspectRatios[selectedIndex])}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
