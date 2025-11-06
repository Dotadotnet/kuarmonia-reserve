import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/page";
import { BiRightArrowAlt } from "react-icons/bi";
import OpportunitySlider from "./opportunitySlider";
import OpportunityClient from "./OpportunityClient";
import { getTranslations } from "next-intl/server";

export default async function Opportunity({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/opportunity/get-opportunities/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["opportunity"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const opportunities = res.data;

  return <OpportunityClient opportunities={opportunities} />;
}
