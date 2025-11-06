import StoriesSkeleton from "@/components/shared/skeleton/StoriesSkeleton";
import StoriesSectionClient from "./StoriesSectionClient";
import { getTranslations } from "next-intl/server";

export default async function StoriesSectionServer({ params }) {
  const { locale } = await params;

  const api = `${process.env.NEXT_PUBLIC_API}/story/get-stories-with-children`;

  let stories = [];

  try {
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["story"] },
      headers: {
        "Accept-Language": locale,
      },
    });

    // اگر پاسخ نامعتبر بود (مثل 500، 404 و ...) خطا بنداز
    if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);

    const res = await response.json();
    stories = res.data || [];
  } catch (error) {
    console.error("❌ Error fetching stories:", error.message);
    // مانع کرش شدن سرور می‌شه
  }

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
