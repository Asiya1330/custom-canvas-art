// components/ArtGenerator.tsx
"use client";
import axios from 'axios';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getHeightFromAspectRatio } from '../LoadingOverlay';
import ImageToImage from './Tabs/ImageToImageTab';
import Tabs from './Tabs/Tabs';
import TextToImage from './Tabs/TextToImageTab';
import { generateImage, uploadAndGenerateImage } from '@/app/api/stabilityApi';


interface ArtGeneratorProps {
  addImage: (newImage: DocumentData) => void;
  setGeneratedImage: (image: Blob | null, description: string, seed: number, negativePrompt: string, aspectRatio: string,loading:boolean) => void;
}

const ArtGenerator: React.FC<ArtGeneratorProps> = ({ addImage, setGeneratedImage }) => {
  const [activeTab, setActiveTab] = useState('text-to-image');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>('1:1');
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
    setGeneratedImage(null, '', 0, '', '',true);
    try {
      let response;
      if (activeTab === 'image-to-image' && selectedFile) {
        // Call SD3 API
        response = await uploadAndGenerateImage(selectedFile, description, strength, seed, negativePrompt);
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
          output_format: 'jpeg',
          negative_prompt: negativePrompt,
        };
        response = await generateImage(payload);
      }

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: selectedFile ? 'image/jpeg' : 'image/webp' });
        setGeneratedImage(blob, description, seed, negativePrompt, selectedAspectRatio ?? '',false);
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

  // const handleGenerate = async () => {
  //   if (!description) {
  //     toast.error("Please add a prompt.");
  //     return;
  //   }
  //   setLoading(true);
  //   setGeneratedImage(null, '', 0, '', '', true);
  //   try {
  //     let response;
  //     const endpoint = activeTab === 'image-to-image' ? 'sd3' : 'ultra';
  //     console.log("selected image",selectedFile)
  //     // Create FormData
  //     const formData = new FormData();
  //     formData.append('endpoint', endpoint); // Add the endpoint to FormData
  //     if (selectedFile) {
  //       formData.append('image', selectedFile);
  //       formData.append('mode', 'image-to-image');
  //     }
  //     formData.append('prompt', description);
  //     formData.append('output_format', 'jpeg');
  //     formData.append('strength', strength.toString());
  //     formData.append('seed', seed.toString());
  //     formData.append('negative_prompt', negativePrompt || '');
  //     if (activeTab === 'ultra') {
  //       formData.append('aspect_ratio', selectedAspectRatio || '');
  //     }
  
  //     // Make the API request with axios
  //     response = await axios.post('/api/generate-image', formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //       responseType: 'arraybuffer',
  //     });
      
  //     if (response.status === 200) {
  //       const blob = new Blob([response.data], { type: 'image/jpeg' });
  //       setGeneratedImage(blob, description, seed, negativePrompt, selectedAspectRatio ?? '', false);
  //       toast.success("Image generated successfully!");
  //     } else {
  //       console.error(`${response.status}: ${response.data.toString()}`);
  //       toast.error(`Error: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("An error occurred while generating the image.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  

  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log("File changed",event.target.files[0]);
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
      
    </div>
  );
};

export default ArtGenerator;
