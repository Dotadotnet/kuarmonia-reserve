import Api from '@/utils/api';
import { permanentRedirect } from 'next/navigation';
export default async function RedirectVisa({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const visa = await Api('/dynamic/get-one/visa/visaId/' + id);
    const url = hostLang + "/visa/" + id + "/" + encodeURIComponent(visa.translations.en.slug)
    return  permanentRedirect(url)
}