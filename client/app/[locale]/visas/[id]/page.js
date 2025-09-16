import Api from '@/utils/api';
import { permanentRedirect } from 'next/navigation';
export default async function RedirectVisa({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const visa = await Api('/dynamic/get-one/visa/visaId/' + id + "?fields=" + "slug_en" );
    const url = hostLang + "/visas/" + id + "/" + visa.slug_en
    return  permanentRedirect(url)
}