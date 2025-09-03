import NotFound from '@/app/not-found';
import Api from '@/utils/api';
import { permanentRedirect , notFound } from 'next/navigation';
export default async function RedirectTag({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const tag = await Api('/dynamic/get-one/tag/tagId/' + id);
    if (!tag) {
        return notFound()
    }
    const url = hostLang + "/tag/" + id + "/" + encodeURIComponent(tag.translations.en.title.trim().replaceAll(" ", "-"))
    return permanentRedirect(url)
}