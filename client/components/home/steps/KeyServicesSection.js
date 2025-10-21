import KeyServicesClient from "./KeyServicesClient";
import { getTranslations } from "next-intl/server";

export default async function KeyServices({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/service/get-services/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["service"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const services = res.data;

  return <KeyServicesClient services={services} />;
}