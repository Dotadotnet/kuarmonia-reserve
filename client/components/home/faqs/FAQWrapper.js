// app/components/faq/FAQWrapper.jsx
import FAQ from "./FAQ";

const FAQWrapper = async () => {
  const api = `${process.env.NEXT_PUBLIC_API}/faqs/get-faqs`;
  console.log(api)
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["faqs"] },
  });
  const res = await response.json();

  return <FAQ faqs={res.data} />;
};

export default FAQWrapper;
