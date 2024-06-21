"use client";
import { useState } from 'react';
import AspectRatioBox from './AspectRatioBox';
import { MoonLoader } from 'react-spinners';
import axios from 'axios';

const ArtGeneratorMobile: React.FC = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedAspectRatio, setSelectedAspectRatio] = useState<string | null>(null);

  const aspectRatios = ['21/9', '16/9', '3/2', '5/4', '1/1', '4/5', '2/3', '9/16', '12/9'];

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
      console.table(formData);
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
    <div className="">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900">Describe Your Art</label>
        <textarea
          className="w-full border rounded-md"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center mb-4">
        {aspectRatios.map((ratio) => (
          <AspectRatioBox
            key={ratio}
            aspectRatio={ratio}
            selected={selectedAspectRatio === ratio}
            onClick={handleAspectRatioClick}
          />
        ))}
      </div>
      <div className="text-center">
        <button
          className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-green-500' : 'bg-purple-500 hover:bg-purple-600'}`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Uploading Image...' : 'Generate'}
        </button>
      </div>
      {loading && <MoonLoader />}
      {image && <img src={image} alt="Generated Art" className="mt-4 w-full" />}
    </div>
  );
};

export default ArtGeneratorMobile;
