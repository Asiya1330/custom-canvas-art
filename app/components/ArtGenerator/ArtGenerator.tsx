"use client";
import { generateImage, uploadAndGenerateImage } from '@/app/api/stabilityApi';
import { useAuth } from '@clerk/nextjs';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import AspectRatioBox from './AspectRatioBox';
import DescriptionInput from './DescriptionInput';
import FavoriteImage from './GeneratedImage';
import ImageUpload from './ImageUpload';
import ProgressBar from './ProgressBar';


const ArtGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [strength, setStrength] = useState(0.5);
  const aspectRatios = ['21:9', '16:9', '3:2', '5:4', '1:1', '4:5', '2:3', '9:16', '9:21'];

  const handleGenerate = async () => {
    if (!description) {
      toast.error("Please add a prompt.");
      return;
    }
    setLoading(true);
    setImageBlob(null);

    try {
      let response;
      if (selectedFile) {
        // Call SD3 API
        response = await uploadAndGenerateImage(selectedFile, description, strength);
      } else {
        // Call Ultra API
        if (!selectedAspectRatio) {
          toast.error("Please select an aspect ratio.");
          return;
        }
        // const resolution = '1024x1024';
        const payload = {
          prompt: description,
          aspect_ratio: selectedAspectRatio,
          // resolution,
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

  const handleAspectRatioClick = (aspectRatio: string) => {
    setSelectedAspectRatio(aspectRatio);
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log(event.target.files[0], "changed");
      setSelectedFile(event.target.files[0]);
    }
  };

  return (
    <div className="py-4">
      <label className="text-custom-black block">Aspect ratio</label>
      <div className="flex flex-wrap justify-center md:justify-start">

        {aspectRatios.map((ratio) => (
          <AspectRatioBox
            key={ratio}
            aspectRatio={ratio}
            selected={selectedAspectRatio === ratio}
            onClick={handleAspectRatioClick}
          />
        ))}
      </div>
      <ProgressBar strength={strength} setStrength={setStrength} />
      <DescriptionInput
        description={description}
        setDescription={setDescription}
      />
      <div className='flex justify-center sm:justify-between flex-wrap mt-4 md:items-start'>
        <ImageUpload
          loading={loading}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
        />
        <div className="text-right">
          <button
            className={`ml-2 px-4 py-2 text-white rounded-md ${loading ? 'bg-green-500' : 'bg-custom-purple hover:bg-custom-purple-dark'}`}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </div>

      {loading && <div className='flex mt-4 justify-center items-center'> <MoonLoader /></div>}
      {imageBlob &&
        <FavoriteImage imageFile={imageBlob} description={description} />
      }
    </div>
  );
};

export default ArtGenerator;
