import { NextResponse } from 'next/server';
import { rateLimit, getClientIdentifier } from '@/lib/rateLimit';

export async function GET(request: Request) {
  // Apply rate limiting: 30 requests per minute
  const identifier = getClientIdentifier(request);
  const isAllowed = rateLimit(identifier, { interval: 60000, maxRequests: 30 });

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '30',
          'X-RateLimit-Remaining': '0',
        }
      }
    );
  }

  try {
    const isProduction = process.env.NODE_ENV === 'production';

    // In production, return minimal information to prevent information disclosure
    if (isProduction) {
      return NextResponse.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
      }, { status: 200 });
    }

    // In development, return detailed health information for debugging
    const healthData = {
      status: 'healthy',
      service: 'devops-portfolio',
      version: '1.2.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      checks: {
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          unit: 'MB'
        },
        analytics_api: process.env.NEXT_PUBLIC_ANALYTICS_API_URL || 'not configured'
      }
    };

    return NextResponse.json(healthData, { status: 200 });
  } catch (error) {
    const isProduction = process.env.NODE_ENV === 'production';

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        // Only include error details in development
        ...(isProduction ? {} : {
          service: 'devops-portfolio',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      },
      { status: 500 }
    );
  }
}

export async function HEAD() {
  // For simple health checks that only need status code
  return new Response(null, { status: 200 });
}
