// components/ImageToImage.tsx
import React from 'react';
import DescriptionInput from '../DescriptionInput';
import ImageUpload from '../ImageUpload';
import ProgressBar from '../ProgressBar';


interface ImageToImageProps {
    description: string;
    setDescription: (description: string) => void;
    strength: number;
    setStrength: (strength: number) => void;
    loading: boolean;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFile: File | null;
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;
    seed: number,
    setSeed: (seed: number) => void;
}

const ImageToImage: React.FC<ImageToImageProps> = ({ description, setDescription, strength, setStrength, loading, handleFileChange, selectedFile, setSelectedFile, seed, setSeed }) => {
    return (
        <div>
            <DescriptionInput
                description={description}
                setDescription={setDescription}
            />
            <label htmlFor="seed">Seed <span className='text-gray-500'>(Optional)</span>: </label>
            <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(Number(e.target.value))}
                placeholder="Seed value"
                className="w-fit mt-2 p-2 border rounded"
                min={0}
                max={4294967294}
            />
            <div className='flex justify-between w-full flex-col md:flex-row mt-4'>
                <ImageUpload
                    loading={loading}
                    handleFileChange={handleFileChange}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                />
                <div className='md:mt-0 mt-4 w-full md:w-auto'>
                    <ProgressBar strength={strength} setStrength={setStrength} />
                </div>
            </div>

        </div>
    );
};

export default ImageToImage;
