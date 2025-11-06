import StoriesSkeleton from "@/components/shared/skeleton/StoriesSkeleton";
import StoriesSectionClient from "./StoriesSectionClient";
import { getTranslations } from "next-intl/server";

export default async function StoriesSectionServer({ params }) {
  const { locale } = await params;

  // Use the new API endpoint that only fetches stories with children
  const api = `${process.env.NEXT_PUBLIC_API}/story/get-stories-with-children`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["story"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const stories = res.data;
  
  
  return (
    <>
      {stories.length === 0 ? (
        <section className="pt-24 overflow-auto max-w-7xl mx-auto">
          <StoriesSkeleton />
        </section>
      ) : (
        <StoriesSectionClient stories={stories} />
      )}
    </>
  );
}