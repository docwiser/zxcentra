import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models/product';

export async function GET() {
  try {
    const products = ProductModel.findAll();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}