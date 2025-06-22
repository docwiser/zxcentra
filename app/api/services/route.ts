import { NextResponse } from 'next/server';
import { ServiceModel } from '@/lib/models/service';

export async function GET() {
  try {
    const services = ServiceModel.findAll();
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}