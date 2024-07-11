// components/ArtGenerator.tsx
"use client";
import { generateImage, uploadAndGenerateImage } from '@/app/api/stabilityApi';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingOverlay, getHeightFromAspectRatio } from '../LoadingOverlay';
import FavoriteImage from './GeneratedImage';
import Tabs from './Tabs/Tabs';
import TextToImage from './Tabs/TextToImageTab';
import ImageToImage from './Tabs/ImageToImageTab';


interface ArtGeneratorProps {
  addImage: (newImage: DocumentData) => void;
}

const ArtGenerator: React.FC<ArtGeneratorProps> = ({ addImage }) => {
  const [activeTab, setActiveTab] = useState('text-to-image');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [strength, setStrength] = useState(0.5);
  const aspectRatios = ['21:9', '16:9', '3:2', '5:4', '1:1', '4:5', '2:3', '9:16', '9:21'];
  const [seed, setSeed] = useState(0);
  const [negativePrompt, setNegativePrompt] = useState('');

  const handleGenerate = async () => {
    if (!description) {
      toast.error("Please add a prompt.");
      return;
    }
    setLoading(true);
    setImageBlob(null);

    try {
      let response;
      if (activeTab === 'image-to-image' && selectedFile) {
        // Call SD3 API
        response = await uploadAndGenerateImage(selectedFile, description, strength,seed);
      } else {
        // Call Ultra API
        if (!selectedAspectRatio) {
          toast.error("Please select an aspect ratio.");
          return;
        }
        const payload = {
          prompt: description,
          aspect_ratio: selectedAspectRatio,
          seed: seed,
          output_format: 'jpeg'
        };
        response = await generateImage(payload);
      }

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: selectedFile ? 'image/jpeg' : 'image/webp' });
        const imageUrl = URL.createObjectURL(blob);
        setImageBlob(blob);
        toast.success("Image generated successfully!");
      } else {
        console.error(`${response.status}: ${response.data.toString()}`);
        toast.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const width = 200; // Set a fixed width for the loading box
  const height = selectedAspectRatio ? getHeightFromAspectRatio(selectedAspectRatio, width) : 0;

  return (
    <div className="py-4 relative">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'text-to-image' && (
        <TextToImage
          description={description}
          setDescription={setDescription}
          selectedAspectRatio={selectedAspectRatio}
          setSelectedAspectRatio={setSelectedAspectRatio}
          aspectRatios={aspectRatios}
          seed={seed}
          setSeed={setSeed}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
          />
      )}

      {activeTab === 'image-to-image' && (
        <ImageToImage
          description={description}
          setDescription={setDescription}
          strength={strength}
          setStrength={setStrength}
          loading={loading}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          seed={seed}
          setSeed={setSeed}
          negativePrompt={negativePrompt}
          setNegativePrompt={setNegativePrompt}
        />
      )}

      <div className="text-right mt-4">
        <button
          className={`ml-2 px-4 py-2 text-white rounded-md ${loading ? 'bg-green-500' : 'bg-custom-purple hover:bg-custom-purple-dark'}`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {loading && (
        <div className='relative flex mt-4 justify-center mx-auto items-center' style={{ height: `${height}px`, width: `${width}px` }}>
          <LoadingOverlay width={width} height={height} />
        </div>
      )}
      {imageBlob &&
        <FavoriteImage imageFile={imageBlob} description={description} addImage={addImage} />
      }
    </div>
  );
};

export default ArtGenerator;
