"use client"
import CategoryList from '@/app/components/Product/CategoryList';
import ProductDetails from '@/app/components/Product/ProductDetails';
import ProductImage from '@/app/components/Product/ProductImage';
import { fetchImage } from '@/app/firebase/fetchImages';
import { useAuth } from '@clerk/nextjs';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { LuShoppingCart } from 'react-icons/lu';

interface ProductPageProps {
    params: {
        id: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    const [image, setImage] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useAuth();


    useEffect(() => {
        const getImage = async () => {
            try {
                if (!userId) {
                    setLoading(false);
                    return;
                }
                const fetchedImage = await fetchImage(userId, params.id);
                console.log(fetchedImage, "image fetched");
                setImage(fetchedImage);
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setLoading(false);
            }
        };

        getImage();
    }, [userId, params.id]);

    if (loading) {
        return <div><MoonLoader size={20} /></div>;
    }

    if (!image) {
        return <div>Image not found</div>;
    }



    const product = {
        id: params.id,
        imageUrl: image.imageUrl ?? '', // Replace with actual image URL
        name: image.name ?? 'Product Name',
        company: 'ABC Company',
        prompt: image.description,
        price: 25,
        description: image.image_description ?? 'Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.',
        quantity: 1,
        seed: image.seed,
        negativePrompt: image.negativePrompt,
        aspectRatio: image.aspectRatio,

    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <ProductImage imageUrl={image.imageUrl} />
                        <div className="mt-4">

                            <label htmlFor="" className='text-sm font-bold'>Name</label>
                            <input
                                type="text"
                                value={image.name}
                                // onChange={(e) => setProductName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter Title"
                            />
                            <label htmlFor="" className='text-sm font-bold'>Description</label>
                            <textarea
                                value={image.description}
                                // onChange={(e) => setImageDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows={4}
                                placeholder="Enter Image Description"
                            />
                        </div>

                    </div>
                    <div className="md:flex-1 px-4">
                        <CategoryList />

                        <div className="flex items-center space-x-4 sm:max-w-xs">
                            <button className="flex-1 bg-custom-purple rounded text-white text-center px-10 py-2 hover:bg-purple-500">
                                Checkout
                            </button>
                            <button className="flex-none border border-custom-purple bg-white text-custom-purple rounded text-center px-4 py-2 hover:bg-custom-purple hover:text-white transition">
                                <LuShoppingCart />
                            </button>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductPage;
