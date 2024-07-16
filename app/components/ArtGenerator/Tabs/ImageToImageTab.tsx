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
    negativePrompt: string,
    setNegativePrompt: (negativePrompt: string) => void,

}

const ImageToImage: React.FC<ImageToImageProps> = ({ description, setDescription, strength, setStrength, loading, handleFileChange, selectedFile, setSelectedFile, seed, setSeed, negativePrompt, setNegativePrompt }) => {
    return (
        <div>
            <DescriptionInput
                description={description}
                setDescription={setDescription}
            />
            <div className="flex flex-wrap mt-4">
                <div className="w-1/2 pr-2">
                    <label htmlFor="seed">Seed <small className='text-gray-500 text-sm'>(Optional)</small>: </label>
                    <input
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(Number(e.target.value))}
                        placeholder="Seed value"
                        className="w-full mt-2 p-2 border rounded"
                        min={0}
                        max={4294967294}
                    />
                </div>
                <div className="w-1/2 pl-2">
                    <label htmlFor="negativePrompt">Negative Prompt <small className='text-gray-500 text-sm'>(Optional)</small>: </label>
                    <input
                        type='text'
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="Enter negative prompt"
                        className="w-full mt-2 p-2 border rounded"
                    />
                </div>
            </div>
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
