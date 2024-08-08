import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

interface EditImageModalContentProps {
    image: DocumentData | null;
    onSave: (name: string, image_description: string) => void;
    onClose: () => void;
}

const EditImageModalContent: React.FC<EditImageModalContentProps> = ({ image, onSave, onClose }) => {
    console.log("image", image);
    const [name, setName] = useState('');
    const [imageDescription, setImageDescription] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();
    const pathName = usePathname();
    useEffect(() => {
        if (image) {
            setName(image.name || '');
            setImageDescription(image.image_description || '');
        }
    }, [image]);

    const handleSave = async () => {
        setIsSaving(true);
        await onSave(name, imageDescription);
        setIsSaving(false);
        const currentPath = pathName;
        if (currentPath.includes('art-generation')) {
            router.push('/saved-art');
        } else {
            router.push(`/product/${image?.id}`);
        }
    };

    if (!image) return null;

    return (
        <div className="bg-white w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto sm:h-auto sm:max-h-none">
            <h2 className="text-2xl mb-4">Edit Image Details</h2>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2 sm:pr-4 sm:h-96 mb-4 sm:mb-0">
                    <img
                        src={image.imageUrl}
                        alt={image.description}
                        className="rounded-lg w-full object-contain h-64 sm:h-full"
                    />
                </div>
                <div className="w-full sm:w-1/2 sm:pl-4">
                    <div className="mb-4">
                        <label className="block mb-1 font-bold">Name: </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 font-bold">Image Description: </label>
                        <input
                            type="text"
                            value={imageDescription}
                            onChange={(e) => setImageDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    {image.aspectRatio && (
                        <div className="mb-4 flex">
                            <label className="block mb-1 font-bold">Aspect Ratio: </label>
                            <p className="">{image.aspectRatio}</p>
                        </div>
                    )}
                    {image.description && (
                        <div className="mb-4 flex flex-wrap">
                            <label className="block mb-1 font-bold">Description: </label>
                            <p className="">{image.description}</p>
                        </div>
                    )}
                    {image.seed !== undefined && (
                        <div className="mb-4 flex">
                            <label className="block mb-1 font-bold">Seed: </label>
                            <p className="">{image.seed}</p>
                        </div>
                    )}
                    {image.negativePrompt && (
                        <div className="mb-4 flex">
                            <label className="block mb-1 font-bold">Negative Prompt: </label>
                            <p className="">{image.negativePrompt}</p>
                        </div>
                    )}
                    <div className="flex">
                        <button
                            onClick={handleSave}
                            className="mt-4 px-4 py-2 bg-custom-purple text-white rounded mr-2 flex items-center hover:bg-dark-purple"
                            disabled={isSaving} // Disable the button while saving
                        >
                            {isSaving ? <ClipLoader size={20} color={"#fff"} className="mr-2" /> : "Buy Artwork"}
                        </button>
                        <button
                            onClick={onClose}
                            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditImageModalContent;
