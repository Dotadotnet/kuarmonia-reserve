import Main from "@/layouts/Main";

import PropertyDetail from "@/components/shared/content/PropertyContent";

const Property = async ({ params  }) => {
  const { id,locale } = params;
  console.log(id,locale);
  const api = `${process.env.NEXT_PUBLIC_API}/property/get-property/${id}`;
  console.log(api);
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["property", `property/${id}`] },
    headers: {
      "Accept-Language": locale
    }
  });
  const res = await response.json();
  const property = res.data;
  console.log("property", property);
  return (
    <Main>
      <div className="pt-28"></div>
      <PropertyDetail property={property} />
    </Main>
  );
};

export default Property;
