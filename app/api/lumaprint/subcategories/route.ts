// app/api/lumaprint/subcategories/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categoryId = searchParams.get('categoryId');

  if (!categoryId) {
    return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
  }

  const { LUMAPRINT_API_KEY, LUMAPRINT_API_SECRET } = process.env;
  if (!LUMAPRINT_API_KEY || !LUMAPRINT_API_SECRET) {
    return NextResponse.json({ error: 'API credentials are not set in the environment variables' }, { status: 500 });
  }
  const authString = Buffer.from(`${LUMAPRINT_API_KEY}:${LUMAPRINT_API_SECRET}`).toString('base64');

  try {

    const response = await axios.get(`https://us.api-sandbox.lumaprints.com/api/v1/products/categories/${categoryId}/subcategories`, {
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json'
      }
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 });
  }
}
