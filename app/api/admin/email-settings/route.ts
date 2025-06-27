import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { EmailModel } from '@/lib/models/email';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !hasPermission(session.user.permissions, 'settings:read')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const settings = EmailModel.getSettings();
    
    // Don't send password in response
    if (settings) {
      const { smtp_password, ...safeSettings } = settings;
      return NextResponse.json(safeSettings);
    }

    return NextResponse.json(null);
  } catch (error) {
    console.error('Email settings fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !hasPermission(session.user.permissions, 'settings:write')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const data = await request.json();
    const updatedSettings = EmailModel.updateSettings(data);

    // Don't send password in response
    const { smtp_password, ...safeSettings } = updatedSettings;
    
    return NextResponse.json(safeSettings);
  } catch (error) {
    console.error('Email settings update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}