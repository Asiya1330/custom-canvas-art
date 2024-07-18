import React, { useState } from 'react';

interface Size {
    size: string;
    price: string;
}

const sizes: Size[] = [
    { size: '8x10', price: '$8.99' },
    { size: '8x12', price: '$13.99' },
    { size: '10x20', price: '$20.66' },
    { size: '10x30', price: '$24.00' },
    { size: '11x14', price: '$10.99' },
    { size: '12x12', price: '$16.64' },
    { size: '12x16', price: '$18.58' },
    { size: '12x18', price: '$19.25' },
    { size: '16x20', price: '$22.14' },
    { size: '16x24', price: '$24.82' },
    { size: '18x24', price: '$25.69' },
    { size: '20x20', price: '$24.96' },
    { size: '20x40', price: '$35.42' },
    { size: '24x30', price: '$33.34' },
    { size: '24x32', price: '$34.21' },
    { size: '24x36', price: '$35.96' },
    { size: '30x30', price: '$38.67' },
];

const SizesDropdown: React.FC = () => {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setSelectedSizes(selectedOptions);
    };

    return (
        <div className="py-4">
            <h2 className="text-2xl font-bold mb-4">Select Sizes</h2>
            <div className="relative inline-block w-full">
                <select
                    
                    value={selectedSizes}
                    onChange={handleSelectChange}
                    className="block w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {sizes.map((sizeItem) => (
                        <option key={sizeItem.size} value={sizeItem.size} className="py-2">
                            {sizeItem.size} - {sizeItem.price}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SizesDropdown;
