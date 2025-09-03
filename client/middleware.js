import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';


export default async function middleware(request) {
  const host = process.env.NEXT_PUBLIC_BASE_URL ;
  const handleI18nRouting = createMiddleware({
    ...routing,
    localeDetection: false
  });
  const response = handleI18nRouting(request);
  response.headers.set('url', request.url.replace("https://localhost:3000", host));
  return response;
}


export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};