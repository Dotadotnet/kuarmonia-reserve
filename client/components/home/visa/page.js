import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import VisaSlider from "./VisaSlider";
import VisaClient from "./VisaClient";
import { getTranslations } from "next-intl/server";

export default async function Visa({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["visa"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const visas = res.data;

  return <VisaClient visas={visas} />;
}
