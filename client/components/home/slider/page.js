import SliderClient from "./SliderClient";


export default async function Slider({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;
const OPTIONS = { loop: true }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  const api = `${process.env.NEXT_PUBLIC_API}/hero-slider/get-hero-sliders/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["hero-slider"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const slides = res.data;
  return <SliderClient  slides={slides} options={OPTIONS} />;
}
