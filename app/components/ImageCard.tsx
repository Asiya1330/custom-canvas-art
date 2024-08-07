import { DocumentData } from "firebase/firestore";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from "next/image";

interface ImageCardProps {
    image: DocumentData;
    onEdit: (image: DocumentData) => void;
    onDelete: (imageId: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onEdit, onDelete }) => {
    const router = useRouter();

    const handleViewClick = () => {
        onEdit(image);
        // router.push(`/product/${image.id}`);
    };

    return (
        <div
            className="relative block overflow-hidden rounded-lg shadow-lg cursor-pointer group h-96"
            onClick={handleViewClick}
        >
            <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end p-2 space-x-2">
                <MdDeleteOutline
                    className="w-7 h-7 text-white bg-red-500 p-1 rounded-full"
                    onClick={(e) => { e.stopPropagation(); onDelete(image.id); }}
                />
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-2 text-center">
                {image.description}
            </div>
        </div>
    );
};

export default ImageCard;
