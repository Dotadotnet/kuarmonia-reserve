import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';


export default async function middleware(request) {
  const handleI18nRouting = createMiddleware({
    ...routing,
    localeDetection: false
  });
  const response = handleI18nRouting(request);
  response.headers.set('url', request.url);
  return response;
}


export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};