"use client"
import CategoryList, { ProductCateory } from '@/app/components/Product/CategoryList';
import ProductImage from '@/app/components/Product/ProductImage';
import QuantitySelector from '@/app/components/Product/QunatitySelector';
import SizesDropdown from '@/app/components/Sizes';
import { addProductToCart, fetchImage } from '@/app/firebase/services';
import { useAuth } from '@clerk/nextjs';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { LuShoppingCart } from 'react-icons/lu';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';

interface ProductPageProps {
    params: {
        id: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    const [image, setImage] = useState<DocumentData | null>(null);
    const [loading, setLoading] = useState(true);
    const [addingToCart, setAddingToCart] = useState(false);
    const { userId } = useAuth();
    const [quantity, setQuantity] = useState<number>(1);
    const [productName, setProductName] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [width, setWidth] = useState<number | null>(null);
    const [height, setHeight] = useState<number | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);


    const [productCateory, setProductCateory] = useState<ProductCateory>({
        categoryId: null,
        categoryName: null,
        subCategoryId: null,
        subCategoryName: null,
        selectedOptions: [],
    });

    const fetchPrice = async () => {
        if (!productCateory.categoryName || !productCateory.subCategoryName || !width || !height) {
            return;
        }

        try {
            console.log('Fetch', productCateory.categoryName, productCateory.subCategoryName, width, height);
            const response = await fetch('/api/calculatePrice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    product: productCateory.categoryName,
                    subProduct: productCateory.subCategoryName,
                    width,
                    height,
                }),
            });

            if (!response.ok) {
                throw new Error('Error fetching price');
            }

            const data = await response.json();
            setPrice(data.price);
            setTotalPrice(data.price * quantity);
        } catch (error) {
            console.error('Error calculating price:', error);
            toast.error('Error calculating price. Please try again.');
        }
    };

    useEffect(() => {
        fetchPrice();
    }, [productCateory, width, height]);
    useEffect(() => {
        if (price !== null) {
            setTotalPrice(price * quantity);
        }
    }, [price, quantity]);
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
        price: totalPrice,
        description: image.image_description ?? 'Lorem ipsum, dolor sit, amet consectetur adipisicing elit. Vitae exercitationem porro saepe ea harum corrupti vero id laudantium enim, libero blanditiis expedita cupiditate a est.',
        quantity: image.quantity,
        seed: image.seed,
        negativePrompt: image.negativePrompt,
        aspectRatio: image.aspectRatio,
        categoryId: productCateory.categoryId, // Include category, subcategory, and options
        subCategoryId: productCateory.subCategoryId,
        selectedOptions: productCateory.selectedOptions,

    };


    // Define the `validateSelections` function outside the useEffect
    const validateSelections = (product: any) => {
        return product.categoryId && product.subCategoryId && product.selectedOptions.length > 0;
    };

    const handleSizeChange = (width: number, height: number) => {
        setWidth(width);
        setHeight(height);
    };


    const addToCart = async () => {
        if (!userId) {
            toast.error('Please log in to add items to the cart.');
            return;
        }

        if (!validateSelections(product)) {
            toast.error('Please select a category, subcategory, and options before adding to the cart.');
            return;
        }

        try {
            setAddingToCart(true);
            const productToAdd = {
                productId: product.id,
                name: productName,
                imageUrl: product.imageUrl,
                price: totalPrice,
                quantity: quantity,
                description: imageDescription,
                seed: product.seed,
                negativePrompt: product.negativePrompt,
                aspectRatio: product.aspectRatio,
                categoryId: productCateory.categoryId, // Include category, subcategory, and options
                subCategoryId: productCateory.subCategoryId,
                selectedOptions: productCateory.selectedOptions,
            };
            await addProductToCart(userId, productToAdd);
            toast.success('Product added to cart!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Error adding product to cart. Please try again.');
        } finally {
            setAddingToCart(false);
        }
    };

    const handleProductUpdate = (updatedProduct: ProductCateory) => {
        console.log("Update Product", updatedProduct);
        setProductCateory(updatedProduct);
    };

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <ProductImage imageUrl={image.imageUrl} />
                        <div className="mt-4">

                            <label htmlFor="name" className='text-sm font-bold'>Name:</label>
                            <input
                                type="text"
                                value={image.name}
                                onChange={(e) => setProductName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter Title"
                            />
                            <label htmlFor="" className='text-sm font-bold'>Description:</label>
                            <textarea
                                value={image.description}
                                onChange={(e) => setImageDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                rows={4}
                                placeholder="Enter Image Description"
                            />
                        </div>

                    </div>
                    <div className="md:flex-1 px-4">
                        <CategoryList onProductUpdate={handleProductUpdate} />
                        <SizesDropdown onSizeChange={handleSizeChange} />
                        <QuantitySelector
                            quantity={quantity}
                            onQuantityChange={(q) => setQuantity(q)}
                        />
                        {price !== null && (
                            <div className="flex justify-between items-center mt-4 sm:max-w-xs">
                                <label className="text-xl font-bold">Price:</label>
                                <span className="text-xl font-semibold">${totalPrice?.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex items-center space-x-4 sm:max-w-xs mt-4">
                            <button
                                disabled={addingToCart}
                                className="flex-1 bg-custom-purple rounded text-white text-center px-10 py-2 hover:bg-purple-500">
                                Checkout
                            </button>
                            <button
                                className={`flex-none border border-custom-purple bg-white text-custom-purple rounded text-center px-4 py-2 ${addingToCart ? 'cursor-not-allowed opacity-50' : 'hover:bg-custom-purple hover:text-white transition'}`}
                                onClick={addToCart}
                                disabled={addingToCart} // Disable while adding to cart
                            >
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
