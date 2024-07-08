import { FC } from 'react';

interface ProductImageProps {
    imageUrl: string;
}

const ProductImage: FC<ProductImageProps> = ({ imageUrl }) => {
    return (
        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
            <img src={imageUrl} alt="Product" className="h-64 md:h-80 rounded-lg object-cover" />
        </div>
    );
};

export default ProductImage;
