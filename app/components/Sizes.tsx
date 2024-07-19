import React, { useState } from 'react';
import { sizes } from '../utils/constants';

const SizesDropdown: React.FC = () => {
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [useCustomSize, setUseCustomSize] = useState<boolean>(false);
    const [customHeight, setCustomHeight] = useState<string>('');
    const [customWidth, setCustomWidth] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSize(event.target.value);
    };

    const handleCustomSizeChange = () => {
        if (customWidth && customHeight) {
            const customSize = `${customWidth}x${customHeight}`;
            setSelectedSize(customSize);
        }
    };

    return (
        <div className="py-4">
            <h2 className="text-2xl font-bold mb-4">Select Size</h2>
            <div className="mb-4">
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
            </div>
            {!useCustomSize ? (
                <div className="relative inline-block w-full mb-4">
                    <select
                        value={selectedSize}
                        onChange={handleSelectChange}
                        className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="" disabled>Select a size</option>
                        {sizes.map((sizeItem) => (
                            <option key={sizeItem.size} value={`${sizeItem.size} - ${sizeItem.price}`} className="py-2">
                                {sizeItem.size} - {sizeItem.price}
                            </option>
                        ))}
                    </select>
                </div>
            ) : (
                <div className="flex space-x-4 mb-4">
                    <div>
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
                    </div>
                </div>
            )}
            {selectedSize && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Selected Size:</h3>
                    <p>{selectedSize}</p>
                </div>
            )}
        </div>
    );
};

export default SizesDropdown;
