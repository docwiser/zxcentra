import { NextResponse } from 'next/server';
import { FAQModel } from '@/lib/models/faq';

export async function GET() {
  try {
    const faqs = FAQModel.findAll();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}