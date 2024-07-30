"use client";
import React from 'react';
import OrderImage from '../components/OrderImage';
import OrderDetails from '../components/OrderDetails';

const OrderStatusPage: React.FC = () => {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-center p-4 min-h-[60vh]">
            <OrderImage />
            <OrderDetails />
        </div>
    );
};

export default OrderStatusPage;
