import SliderClient from "./SliderClient";

export default async function Slider({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const OPTIONS = { loop: true };
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  const api = `${process.env.NEXT_PUBLIC_API}/hero-slider/get-hero-sliders/?page=${page}&limit=${limit}`;

  let slides = [];

  try {
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["hero-slider"] },
      headers: {
        "Accept-Language": locale,
      },
    });

    if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

    const res = await response.json();
    slides = res.data || [];
  } catch (error) {
    console.error("❌ Error fetching hero sliders:", error.message);
    // به‌جای کرش، یه حالت fallback ساده نشون بده
  }

  // اگر داده نداریم (مثلاً سرور خاموش بود)
  if (slides.length === 0) {
    return (
      <section className="pt-10 flex flex-col gap-y-10">
        <div className="w-full h-[300px] bg-gray-100 flex items-center justify-center text-gray-500">
        </div>
        <div className="md:px-56 px-10">

        <div className="w-full px-20 rounded-2xl h-[100px] bg-gray-100 flex items-center justify-center text-gray-500">
        </div>
        </div>
      </section>
    );
  }

  return <SliderClient slides={slides} options={OPTIONS} />;
}
