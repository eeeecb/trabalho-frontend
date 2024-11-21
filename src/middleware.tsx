import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rotas que não precisam de autenticação
const publicRoutes = ['/', '/login', '/register'];
// Rotas que precisam de autenticação
const protectedRoutes = ['/dashboard'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Obter o token do localStorage (disponível apenas no cliente)
  const token = request.cookies.get('auth_token')?.value;

  // Se não está autenticado e tenta acessar uma rota protegida
  if (!token && path.startsWith('/dashboard')) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Rotas que queremos proteger
    '/dashboard/:path*',
    // Excluir arquivos estáticos e API
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}