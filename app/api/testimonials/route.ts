import { NextResponse } from 'next/server';
import { TestimonialModel } from '@/lib/models/testimonial';

export async function GET() {
  try {
    const testimonials = TestimonialModel.findAll();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}