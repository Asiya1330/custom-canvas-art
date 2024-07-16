import { useState } from 'react';

const aspectRatios = ['9:21', '9:16', '2:3', '4:5', '1:1', '5:4', '3:2', '16:9', '21:9'];

interface AspectRatioSelectorProps {
  onAspectRatioChange: (aspectRatio: string) => void;
}

const AspectRatioSelector: React.FC<AspectRatioSelectorProps> = ({ onAspectRatioChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(4);
  const [selectedTab, setSelectedTab] = useState<'portrait' | 'square' | 'landscape'>('square');

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

  const handleTabChange = (tab: 'portrait' | 'square' | 'landscape') => {
    setSelectedTab(tab);
    if (tab === 'portrait') {
      setSelectedIndex(1); // '9:16' as a default portrait aspect ratio
      onAspectRatioChange('9:16');
    } else if (tab === 'square') {
      setSelectedIndex(4); // '1:1' as a default square aspect ratio
      onAspectRatioChange('1:1');
    } else if (tab === 'landscape') {
      setSelectedIndex(7); // '16:9' as a default landscape aspect ratio
      onAspectRatioChange('16:9');
    }
  };

  return (
    <div className="flex items-center flex-wrap">
      <label htmlFor="aspect-ratio" className="text-sm text-gray-700 w-full block mb-2">
        Select Aspect Ratio:<sup className='text-red-600'>*</sup>
      </label>

      <div className='flex flex-wrap sm:h-32 w-full items-center'>
        <div className='flex flex-col'>
          <div className="flex w-full justify-center mb-4">
            <button
              className={`px-4 py-2 ${selectedTab === 'portrait' ? 'bg-red-300 text-red-900' : 'bg-gray-200 text-gray-700'} rounded-l-3xl`}
              onClick={() => handleTabChange('portrait')}
            >
              Portrait
            </button>
            <button
              className={`px-4 py-2 ${selectedTab === 'square' ? 'bg-red-300 text-red-900' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleTabChange('square')}
            >
              Square
            </button>
            <button
              className={`px-4 py-2 ${selectedTab === 'landscape' ? 'bg-red-300 text-red-900' : 'bg-gray-200 text-gray-700'} rounded-r-3xl`}
              onClick={() => handleTabChange('landscape')}
            >
              Landscape
            </button>
          </div>
          <input
            type="range"
            id="aspect-ratio"
            min="0"
            max={aspectRatios.length - 1}
            value={selectedIndex}
            onChange={handleChange}
            className="mt-4 appearance-none h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700"
          />
        </div>
        <div className='flex items-start md:items-center md:mt-0 my-4'>

          <div className="text-center mx-8 w-6">
            {aspectRatios[selectedIndex]}
          </div>
          <div className="w-12 relative bg-gray-200 p-1">
            <div className="inset-0 w-full border-2 border-gray-900 rounded-md bg-white"
              style={getAspectRatioStyles(aspectRatios[selectedIndex])}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AspectRatioSelector;
