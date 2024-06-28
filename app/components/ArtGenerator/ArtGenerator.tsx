"use client";
import { generateImage, uploadAndGenerateImage } from '@/app/api/stabilityApi';
import { DocumentData } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { LoadingOverlay, getHeightFromAspectRatio } from '../LoadingOverlay';
import RectanglesWithArrow from '../RectanglesWithArrow';
import AspectRatioBox from './AspectRatioBox';
import DescriptionInput from './DescriptionInput';
import FavoriteImage from './GeneratedImage';
import ImageUpload from './ImageUpload';
import ProgressBar from './ProgressBar';

interface ArtGeneratorProps {
  addImage: (newImage: DocumentData) => void;
}

const ArtGenerator: React.FC<ArtGeneratorProps> = ({ addImage }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
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
    else {
      setSelectedFile(null);
    }
  };

  const width = 200; // Set a fixed width for the loading box
  const height = selectedAspectRatio ? getHeightFromAspectRatio(selectedAspectRatio, width) : 0;


  return (
    <div className="py-4 relative">
      <label className="text-custom-black block">Aspect ratio</label>
      <div className="flex flex-wrap justify-center md:justify-start w-fit flex-col">
        <div className='block'>
          <RectanglesWithArrow />
        </div>
        <div className='flex flex-wrap justify-center'>


          {aspectRatios.map((ratio) => (
            <AspectRatioBox
              key={ratio}
              aspectRatio={ratio}
              selected={selectedAspectRatio === ratio}
              onClick={handleAspectRatioClick}
            />
          ))}
        </div>
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
          setSelectedFile={setSelectedFile}
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

      {loading && (
        <div className='relative flex mt-4 justify-center mx-auto items-center' style={{ height: `${height}px`, width: `${width}px` }}>
          <LoadingOverlay width={width} height={height} />
        </div>
      )}
      {imageBlob &&
        <FavoriteImage imageFile={imageBlob} description={description} addImage={addImage}/>
      }
    </div>
  );
};

export default ArtGenerator;
