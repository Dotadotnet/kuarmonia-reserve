import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectNews({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const news = await Api('/dynamic/get-one/news/newsId/' + id);
    if (!news) {
        return notFound()
    }
    const url = hostLang + "/news/" + id + "/" + encodeURIComponent(news.translations.en.slug.trim())
    return permanentRedirect(url)
}