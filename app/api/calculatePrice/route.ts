// app/api/calculatePrice/route.ts

import calculatePrice from '@/app/lib';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { product, subProduct, width, height } = body;

    if (!product || !subProduct || !width || !height) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const price = calculatePrice(product, subProduct, width, height);
    return NextResponse.json({ price }, { status: 200 });
  } catch (error) {
    console.error('Error calculating price:', error);
    return NextResponse.json({ error: 'Error calculating price' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'This endpoint only supports POST requests' }, { status: 405 });
}
