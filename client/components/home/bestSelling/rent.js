import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
import { BiRightArrowAlt } from "react-icons/bi";
import RentSlider from "./rentSlider";
import RentClient from "./RentClient";
import { getTranslations } from "next-intl/server";

export default async function Rent({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/rent/get-rents/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["rent"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const rents = res.data;

  return <RentClient rents={rents} />;
}
