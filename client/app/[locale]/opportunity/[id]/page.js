import Api from '@/utils/api';
import { notFound, permanentRedirect } from 'next/navigation';
export default async function RedirectOpportunity({ params }) {
    const { id, locale } = params;
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const hostLang = host + (locale == "fa" ? "" : "/" + locale);
    const opportunity = await Api('/dynamic/get-one/opportunity/opportunityId/' + id + "?fields=slug");
    if (!opportunity) {
        return notFound()
    }
    const url = hostLang + "/opportunity/" + id + "/" + opportunity.slug
    return permanentRedirect(url)
}