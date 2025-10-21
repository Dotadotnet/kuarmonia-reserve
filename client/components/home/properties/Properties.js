import PropertiesClient from "./PropertiesClient";
import { getTranslations } from "next-intl/server";

export default async function Properties({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/property/get-properties/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["property"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const properties = res.data;
console.log(properties)
  return 
  <>
  {/* <PropertiesClient properties={properties} />; */}
  </>
}
