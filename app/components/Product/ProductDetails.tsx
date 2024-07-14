"use client";
import { FC, useState } from 'react';
import CategoryList from './CategoryList';

interface ProductDetailsProps {
    product: any;
}

const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(2);
    };

    const handleBackStep = () => {
        setStep(1);
    };

    return (
        <div>
            {step === 1 ? (
                <>
                    <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                        {product.name}
                    </h2>
                    <p className="text-gray-500 text-sm mb-2">
                        By <a href="#" className="text-indigo-600 hover:underline">{product.company}</a>
                    </p>
                    <div className="flex items-center space-x-4 mb-2">
                        <div>
                            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                <span className="text-indigo-400 mr-1 mt-1">$</span>
                                <span className="font-bold text-indigo-600 text-3xl">{product.price}</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-gray-500"><strong>Description: </strong>{product.description}</p>
                    <p className="text-gray-500"><strong>Aspect Ratio:</strong> {product.aspectRatio}</p>
                    <p className="text-gray-500"><strong>Seed:</strong> {product.seed}</p>
                    {product.negativePrompt && (
                        <p className="text-gray-500"><strong>Negative Prompt:</strong> {product.negativePrompt}</p>
                    )}
                    <div className="flex py-4 space-x-4">
                        <button
                            type="button"
                            className="h-14 px-6 py-2 font-semibold bg-custom-purple hover:bg-purple-500 text-white"
                            onClick={handleNextStep}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <CategoryList />
                    <div className="flex py-4 space-x-4">
                        <div className="relative">
                            <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                                Qty
                            </div>
                            <input
                                type="number"
                                className="cursor-pointer appearance-none rounded-xl border border-gray-200 h-14 flex items-end pb-1"
                                min="1"
                                max="100"
                                defaultValue="1"
                            />
                        </div>
                    </div>
                    <div className="flex py-4 space-x-4">
                        <button
                            type="button"
                            className="h-14 px-6 py-2 font-semibold bg-gray-400 hover:bg-gray-500 text-white"
                            onClick={handleBackStep}
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="h-14 px-6 py-2 font-semibold bg-custom-purple hover:bg-purple-500 text-white"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
