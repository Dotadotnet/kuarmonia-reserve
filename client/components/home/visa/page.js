import VisaClient from "./VisaClient";

export default async function Visa({ params }) {
  const locale = params?.locale || "fa";
  const limit = 10;
  const page = 1;

  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas-client/?page=${page}&limit=${limit}`;

  let visas = [];

  try {
    const response = await fetch(api, {
      cache: "no-store",
      next: { tags: ["visa"] },
      headers: {
        "Accept-Language": locale,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch visas: ${response.status}`);
    }

    const res = await response.json();
    visas = res?.data || [];
  } catch (error) {
    console.error("❌ Error fetching visas:", error);
  }

  // اگر داده‌ای نبود، اسکلت لودر نمایش بده تا UI خالی نمونه
  if (!visas || visas.length === 0) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="group overflow-hidden bg-white border border-gray-200 dark:border-gray-700 rounded-xl 
                       hover:shadow-md dark:bg-gray-800 flex flex-col p-2 h-[180px] animate-pulse"
          >
            <div className="bg-gray-200 dark:bg-gray-700 h-24 rounded-md mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto" />
          </div>
        ))}
      </section>
    );
  }

  return <VisaClient visas={visas} locale={locale} />;
}
