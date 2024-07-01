// components/RectanglesWithArrow.tsx
import React from 'react';
import { FaArrowsAltH } from 'react-icons/fa';

const RectanglesWithArrow: React.FC = () => {
    return (
        <div className="flex items-center space-x-4 justify-evenly">
            <div className="w-8 h-4 border-4 border-gray-900"></div>
            <div className="flex items-center space-x-1">
                <FaArrowsAltH />
            </div>
            <div className="w-4 h-4 border-4 border-gray-900"></div>
            <div className="flex items-center space-x-1">
                <FaArrowsAltH />
            </div>
            <div className="w-4 h-8 border-4 border-gray-900"></div>
        </div>
    );
};

export default RectanglesWithArrow;
