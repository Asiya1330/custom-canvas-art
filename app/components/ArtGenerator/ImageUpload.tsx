import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface ImageUploadProps {
    loading: boolean;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFile: File | null;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ loading, handleFileChange, selectedFile }) => {
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

    return (
        <div className="text-right">
            <label className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer hover:bg-green-600">
                Upload Image
                <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
            {preview && (
                <div className="my-4">
                    <Image src={preview} alt="Selected File" className="max-w-full h-auto" width={200} height={200} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
