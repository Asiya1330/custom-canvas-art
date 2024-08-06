import React, { useEffect, useState } from 'react';
import { sizes } from '../utils/constants';

interface SizesDropdownProps {
    onSizeChange: (width: number, height: number) => void;
  }
  
  const SizesDropdown: React.FC<SizesDropdownProps> = ({ onSizeChange }) => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [useCustomSize, setUseCustomSize] = useState<boolean>(false);
    const [customHeight, setCustomHeight] = useState<string>('');
    const [customWidth, setCustomWidth] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSize(event.target.value);
    };
    useEffect(() => {
        if (selectedSize) {
          const [width, height] = selectedSize.split('x').map(Number);
          onSizeChange(width, height);
        }
      }, [selectedSize, onSizeChange]);

    const handleCustomSizeChange = () => {
        if (customWidth && customHeight) {
            const customSize = `${customWidth}x${customHeight}`;
            setSelectedSize(customSize);
        }
    };

    return (
        <div className="sm:max-w-xs flex items-center">
            <h2 className="text-lg font-bold w-1/3">Select Size:</h2>
            {/* <div className="mb-4">
                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={useCustomSize}
                        onChange={() => {
                            setUseCustomSize(!useCustomSize);
                            setSelectedSize('');
                            setCustomWidth('');
                            setCustomHeight('');
                        }}
                    />
                    <span className="ml-2">Use Custom Size</span>
                </label>
            </div> */}
            {!useCustomSize ? (
                <div className="relative inline-block w-full mb-4 md:w-2/3">
                    <select
                        value={selectedSize}
                        onChange={handleSelectChange}
                        className="block w-full p-2 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Select a size</option>
                        {sizes.map((sizeItem) => (
                            <option key={sizeItem.size} value={`${sizeItem.size}`} className="py-2">
                                {sizeItem.size}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="flex space-x-4 mb-4">
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700">Custom Width</label>
                        <input
                            type="text"
                            value={customWidth}
                            onChange={(e) => {
                                setCustomWidth(e.target.value);
                                handleCustomSizeChange();
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Custom Height</label>
                        <input
                            type="text"
                            value={customHeight}
                            onChange={(e) => {
                                setCustomHeight(e.target.value);
                                handleCustomSizeChange();
                            }}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div> */}
                </div>
            )}
            
        </div>
    );
};

export default SizesDropdown;
