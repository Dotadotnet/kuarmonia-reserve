import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectProperty({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const property = await Api('/dynamic/get-one/property/propertyId/' + id);
    if (!property) {
        return notFound()
    }
    const url = hostLang + "/property/" + id + "/" + encodeURIComponent(property.translations.en.slug.trim())
    return permanentRedirect(url)
}