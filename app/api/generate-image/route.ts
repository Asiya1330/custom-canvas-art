// app/api/generate-image/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';
import { NextRequest } from 'next/server';

const API_KEY = process.env.NEXT_PUBLIC_STABILITY_API_KEY;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body as FormData
    const formData = new FormData();
    const formBody = await request.formData();
    
    // Extract endpoint and other fields from the form data
    const endpoint = formBody.get('endpoint') as string;
    
    // Append all fields from the formBody to formData
    formBody.forEach((value, key) => {
      formData.append(key, value);
    });
    console.log(formData," formData ",endpoint);
    const response = await axios.post(
      `https://api.stability.ai/v2beta/stable-image/generate/${endpoint}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'image/*',
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      }
    );

    return new NextResponse(response.data, { status: response.status });
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: 'An error occurred while generating the image.' }), { status: 500 });
  }
}
