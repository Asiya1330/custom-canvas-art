import { useState } from 'react';

const aspectRatios = ['21:9', '16:9', '3:2', '5:4', '1:1', '4:5', '2:3', '9:16', '9:21'];

const AspectRatioSelector = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIndex(Number(event.target.value));
  };

  const getAspectRatioStyles = (aspectRatio: string) => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return {
      paddingBottom: `${(height / width) * 100}%`,
    };
  };

  return (
    <div className="flex space-x-4 items-center h-24">
      <label htmlFor="aspect-ratio" className="font-medium text-gray-700">
        Select Aspect Ratio: 
      </label>
      <input
        type="range"
        id="aspect-ratio"
        min="0"
        max={aspectRatios.length - 1}
        value={selectedIndex}
        onChange={handleChange}
        className="w-1/3 !mt-0"
      />
      <div className="text-center mx-2 w-6">
        {aspectRatios[selectedIndex]}
      </div>
      <div className="w-9 relative bg-gray-200 p-1">
        <div className="inset-0 w-full  border-2 border-gray-900 "
          style={getAspectRatioStyles(aspectRatios[selectedIndex])}
        >
            
            </div>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
