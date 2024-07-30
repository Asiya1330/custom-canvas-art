import React from 'react';

const OrderImage: React.FC = () => {
    return (
        <div className="w-full md:w-1/2 p-4 flex justify-center">
            <img
                src="/order-demo-img.png" // Replace with actual image path
                alt="Order"
                className="w-64 h-auto border-4 border-black"
            />
        </div>
    );
};

export default OrderImage;
