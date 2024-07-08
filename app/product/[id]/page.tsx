"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { fetchImage } from '@/app/firebase/fetchImages';
import ProductImage from '@/app/components/Product/ProductImage';
import ProductDetails from '@/app/components/Product/ProductDetails';
import { useAuth } from '@clerk/nextjs';
import CategoryList from '@/app/components/Product/CategoryList';
import { MoonLoader } from 'react-spinners';

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
                console.log(fetchedImage,"image fetched");
                setImage(fetchedImage);
            } catch (error) {
                console.error("Error fetching image:", error);
            } finally {
                setLoading(false);
            }
        };

        getImage();
    }, [userId,params.id]);

    if (loading) {
        return <div><MoonLoader /></div>;
    }

    if (!image) {
        return <div>Image not found</div>;
    }



    const product = {
        id: params.id,
        imageUrl: image.imageUrl ?? '', // Replace with actual image URL
        name: image.description ?? 'Product Name',
        company: 'ABC Company',
        price: 25,
        description: image.description ?? 'Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.',
        versions: ['Version 1', 'Version 2'],
        quantity: 1,
        discount: '',
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <ProductImage imageUrl={image.imageUrl} />
                    </div>
                    <div className="md:flex-1 px-4">
                        <ProductDetails product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ProductPage;
