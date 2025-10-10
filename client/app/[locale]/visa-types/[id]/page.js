import Api from '@/utils/api';
import { permanentRedirect } from 'next/navigation';
export default async function RedirectVisaType({ params }) {
  const { id, locale } = params;
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
  const visaType = await Api('/dynamic/get-one/visaType/visaTypeId/' + id + "?fields=slug_en,visaTypeId");
  const url = hostLang + "/visa-types/" + visaType.visaTypeId + "/" + visaType.slug_en;
  return permanentRedirect(url);
}
