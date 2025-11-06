import VisaClient from "./VisaClient";

export default async function Visa({ params }) {
  const { locale } = await params;
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas-client/?page=${page}&limit=${limit}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["visa"] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const visas = res.data;
  console.log("visa",visas)
  return <VisaClient visas={visas} />;
}