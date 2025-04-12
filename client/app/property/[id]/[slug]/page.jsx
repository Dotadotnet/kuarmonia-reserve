import Main from "@/layouts/Main";

import PropertyDetail from "@/components/shared/content/PropertyContent";


export async function generateMetadata( { params, searchParams }, parent) {
  
  // read route params
  const { id } = await params

  // fetch data

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/property/get-by-id/' + id);
  const res_decoded = await res.json();
  const data = res_decoded.data;

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: data.title,
    openGraph: {
      images: [data.thumbnail.url],
    },
  }
}

const Property = async ({ params }) => {
  const { id, slug } = params;
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/property/get-by-id/' + id);
  const res_decoded = await res.json();
  const data = res_decoded.data;

  return (
    <Main>
      <div className="pt-28"></div>
      <PropertyDetail
        property={data}
      />
    </Main>

  );
};

export default Property;
