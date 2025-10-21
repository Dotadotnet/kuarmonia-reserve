import StoriesSkeleton from "@/components/shared/skeleton/StoriesSkeleton";
import StoriesSectionClient from "./StoriesSectionClient";
import { getTranslations } from "next-intl/server";

export default async function StoriesSectionServer({ params }) {
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
  const t = await getTranslations("HomePage", locale);

  return (
    <>
      {banners.length === 0 ? (
        <section className="pt-24 overflow-auto max-w-7xl mx-auto">
          <StoriesSkeleton />
        </section>
      ) : (
        <StoriesSectionClient banners={banners} />
      )}
    </>
  );
}
