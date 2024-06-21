"use client";
import { useState } from 'react';
import AspectRatioBox from './AspectRatioBox';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';
import Image from 'next/image';

const ArtGenerator: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);

  const aspectRatios = ['21:9', '16:9', '3:2', '5:4', '1:1', '4:5', '2:3', '9:16', '12:9'];

  const handleGenerate = async () => {
    setLoading(true);
    setImage(null); // Reset the image
    const resolution = '1024x1024';
  
    try {
      const payload = {
        prompt: description,
        aspect_ratio: selectedAspectRatio,
        resolution,
        output_format: 'webp'
      };
  
      const formData = new FormData();
      
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value as string);
        }
      });
      console.log(formData);
      const response = await axios.post(
        'https://api.stability.ai/v2beta/stable-image/generate/ultra',
        formData,
        {
          validateStatus: undefined,
          responseType: 'arraybuffer',
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STABILITY_API_KEY}`,
            'Accept': 'image/*'
          },
        }
      );
  
      if (response.status === 200) {
        const blob = new Blob([response.data], { type: 'image/webp' });
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
      } else {
        console.error(`${response.status}: ${response.data.toString()}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleAspectRatioClick = (aspectRatio: string) => {
    setSelectedAspectRatio(aspectRatio);
  };

  return (
    <div className="p-4">
      <div className="flex">
        {aspectRatios.map((ratio) => (
          <AspectRatioBox
            key={ratio}
            aspectRatio={ratio}
            selected={selectedAspectRatio === ratio}
            onClick={handleAspectRatioClick}
          />
        ))}
      </div>
      <div className="mt-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-4 text-right">
        <button
          className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {loading && <MoonLoader />}
      {image && <div className='relative'><img src={image} alt="Generated Art" className="mt-4"/></div>}
    </div>
  );
};

export default ArtGenerator;
