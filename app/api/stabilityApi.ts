import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_STABILITY_API_KEY;

export const generateImage = async (payload: Record<string, string | null>) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value as string);
    }
  });

  const response = await axios.post(
    'https://api.stability.ai/v2beta/stable-image/generate/ultra',
    formData,
    {
      validateStatus: undefined,
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'image/*'
      },
    }
  );

  return response;
};

export const uploadAndGenerateImage = async (file: File, prompt: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prompt', prompt);
  formData.append('output_format', 'jpeg');

  const response = await axios.post(
    'https://api.stability.ai/v2beta/stable-image/generate/sd3',
    formData,
    {
      validateStatus: undefined,
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'image/*'
      },
    }
  );

  return response;
};