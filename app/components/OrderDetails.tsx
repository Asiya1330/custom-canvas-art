import React from 'react';
interface Step {
    title: string;
    description: string;
    icon: string; // URL or path to the icon image
}

interface StepsProps {
    steps: Step[];
}
const steps = [
    {
        title: "Pending",
        description:"We have received your order and we will check it first."

    },
    {
        title: "Printing",
        description:"We have received your order and we are printing it."

    },
    {
        title: "Shipped",
        describe:"We have received your order and shipped it."

    }
];
const OrderDetails: React.FC = () => {

    return (
        <div className="w-full md:w-1/2  p-4">
            <div className="border p-4 sm:max-w-xs rounded-md shadow-md">
                <h2 className="text-xl font-bold mb-2">Order Number: #123456</h2>
                <div className='p-4 border bg-[#8119EB1F] mb-2 flex items-center'>

                <p className="text-gray-600 ">Expected Delivery Time: 3-5 business days</p>
                </div>

                <div className="mb-4">
                    <h3 className=" text-custom-purple underline mb-2">Details Orders</h3>
                    <ul className="flex flex-col">
                        {steps.map((step, index) => (
                            <li key={index} className="group relative flex flex-col pb-8 pl-7 last:pb-0">
                                <div className={`absolute ${index !== steps.length - 1 ? "bottom-0" : "bottom-4"} left-2 top-0 w-[3px] bg-custom-purple group-first:top-3`}></div>
                                <div className="absolute w-4 h-4 bg-white border-4 border-custom-purple rounded-full left-[0.1rem]"></div>
                                <p className="font-semibold">{step.title}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col space-y-4">
                    <button className="border border-custom-purple text-custom-purple px-4 py-2 rounded hover:bg-custom-purple hover:text-white">
                        Check Order Status
                    </button>
                    <button className="bg-custom-purple text-white px-4 py-2 rounded hover:bg-purple-500">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
