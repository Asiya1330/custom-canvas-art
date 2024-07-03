import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ImageUploadProps {
    loading: boolean;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFile: File | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ loading, handleFileChange, selectedFile, setSelectedFile }) => {
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);

            // Clean up the object URL to avoid memory leaks
            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setPreview(null);
        }
    }, [selectedFile]);

    const handleRemoveImage = () => {
        setPreview(null);
        setSelectedFile(null);
    };

    return (
        <div className="text-center flex flex-col">
            <label className="w-fit px-4 py-2 bg-custom-green text-white rounded-md cursor-pointer hover:bg-green-600">
                Upload Image
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {preview && (
                <div className="my-4 relative">
                <Image src={preview} alt="Selected File" className="max-w-full h-auto" width={100} height={200} />
                <button
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                    onClick={handleRemoveImage}
                >
                    <AiOutlineClose size={10} />
                </button>
            </div>
            )}
        </div>
    );
};

export default ImageUpload;
