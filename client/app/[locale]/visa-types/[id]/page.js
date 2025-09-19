import Api from '@/utils/api';
import { permanentRedirect } from 'next/navigation';

export default async function RedirectVisaType({ params }) {
  const { id, locale } = await params;
  const host = process.env.NEXT_PUBLIC_BASE_URL;
  const hostLang = host + (locale == "fa" ? "" : "/" + locale);
  
  try {
    const visaType = await Api('/dynamic/get-one/visaType/visaTypeId/' + id + "?fields=slug_en");
    const url = hostLang + "/visa-types/" + id + "/" + visaType.slug_en;
    return permanentRedirect(url);
  } catch (error) {
    // اگر ویزا تایپ پیدا نشد، به صفحه 404 هدایت شود
    return permanentRedirect(hostLang + "/not-found");
  }
}
