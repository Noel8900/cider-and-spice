import { NextResponse, type NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || '';

  if (host.includes('lchub-pos.netlify.app')) {
    return NextResponse.redirect(new URL('/hall-os/index.html', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
