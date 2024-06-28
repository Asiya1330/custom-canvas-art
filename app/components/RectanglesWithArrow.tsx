// components/RectanglesWithArrow.tsx
import React from 'react';
import { FaArrowsAltH } from 'react-icons/fa';

const RectanglesWithArrow: React.FC = () => {
    return (
        <div className="flex items-center space-x-4 justify-evenly">
            <div className="w-8 h-4 bg-blue-500"></div>
            <div className="flex items-center space-x-1">
                <FaArrowsAltH />
            </div>
            <div className="w-4 h-4 bg-green-500"></div>
            <div className="flex items-center space-x-1">
                <FaArrowsAltH />
            </div>
            <div className="w-4 h-8 bg-red-500"></div>
        </div>
    );
};

export default RectanglesWithArrow;
