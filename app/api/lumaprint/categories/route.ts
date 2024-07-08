// app/api/lumaprint/categories/route.ts

import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  const { LUMAPRINT_API_KEY, LUMAPRINT_API_SECRET } = process.env;
  if (!LUMAPRINT_API_KEY || !LUMAPRINT_API_SECRET) {
    return NextResponse.json({ error: 'API credentials are not set in the environment variables' }, { status: 500 });
  }
  const authString = Buffer.from(`${LUMAPRINT_API_KEY}:${LUMAPRINT_API_SECRET}`).toString('base64');
  try {
  console.log("API credentials are set in the environment variables",authString);

    const response = await axios.get('https://us.api-sandbox.lumaprints.com/api/v1/products/categories', {
      headers: {
        'Authorization': `Basic ${authString}`,
        // Authorization: `Basic THVtYXByaW50czpSb2Nrcw==`
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });

  }
}
