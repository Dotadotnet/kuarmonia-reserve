import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectService({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const service = await Api('/dynamic/get-one/service/serviceId/' + id + "?fields=slug");
    if (!service) {
        return notFound()
    }
    const url = hostLang + "/service/" + id + "/" + service.slug
    return permanentRedirect(url)
}