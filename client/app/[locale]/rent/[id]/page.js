import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectRent({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const rent = await Api('/dynamic/get-one/rent/rentId/' + id + "?fields=slug");
    if (!rent) {
        return notFound()
    }
    const url = hostLang + "/rent/" + id + "/" + rent.slug
    return permanentRedirect(url)
}