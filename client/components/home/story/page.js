import StoriesSectionClient from "./StoriesSectionClient";
import { getTranslations } from "next-intl/server";

export default async function StoriesSectionServer({params}) {
    const { locale } = await params;
const limit = 15;
const page = 1; 
const api = `${process.env.NEXT_PUBLIC_API}/banner/get-banners/?page=${page}&limit=${limit}`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["banner"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const banners = res.data;
  console.log(banners)
  const t = await getTranslations("HomePage", locale);
  return <StoriesSectionClient banners={banners} />;
}
