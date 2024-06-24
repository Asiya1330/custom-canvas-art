"use client";
import { generateImage, uploadAndGenerateImage } from '@/app/api/stabilityApi';
import Image from 'next/image';
import { useState } from 'react';
import { MoonLoader } from 'react-spinners';
import AspectRatioBox from './AspectRatioBox';
import DescriptionInput from './DescriptionInput';
import ImageUpload from './ImageUpload';
import ProgressBar from './ProgressBar';
import { ToastContainer, toast } from 'react-toastify';

const ArtGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [strength, setStrength] = useState(0.5);
  const aspectRatios = ['21:9', '16:9', '3:2', '5:4', '1:1', '4:5', '2:3', '9:16', '12:9'];

  const handleGenerate = async () => {
    if (!description) {
      toast.error("Please add a prompt.");
      return;
    }
    setLoading(true);
    setImage(null); // Reset the image

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
        console.log(selectedAspectRatio, "aspect ratio")
        const resolution = '1024x1024';
        const payload = {
          prompt: description,
          aspect_ratio: selectedAspectRatio,
          resolution,
          output_format: 'jpeg'
        };
        response = await generateImage(payload);
      }

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: selectedFile ? 'image/jpeg' : 'image/webp' });
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
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
      <ToastContainer />
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
      {image &&
        <div className='w-100 flex justify-center'>
          <div className='relative w-60 h-60 md:w-96 md:h-96'><Image src={image} alt="Generated Art" className="mt-4" fill />
          </div>
        </div>
      }
    </div>
  );
};

export default ArtGenerator;
