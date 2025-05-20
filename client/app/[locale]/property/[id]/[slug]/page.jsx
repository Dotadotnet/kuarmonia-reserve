import Main from "@/layouts/Main";

import PropertyDetail from "@/components/shared/content/PropertyContent";

const Property = async ({ params  }) => {
  const { id,locale } = params;
  const api = `${process.env.NEXT_PUBLIC_API}/property/get-property/${id}`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["property", `property/${id}`] },
    headers: {
      "Accept-Language": locale
    }
  });
  const res = await response.json();
  const property = res.data;
  return (
    <Main>
      <div className="pt-28"></div>
      <PropertyDetail property={property} />
    </Main>
  );
};

export default Property;
