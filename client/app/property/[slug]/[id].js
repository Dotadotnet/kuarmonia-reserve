import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { useGetPropertyQuery } from "@/services/property/propertyApi";
import PropertyDetail from "@/components/shared/content/PropertyContent";

const Property = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetPropertyQuery(id);
  console.log(fetchData);
  return (
    <main>
      <Head>
        <title>{fetchData?.data?.title}</title>
      </Head>

      <Main>
        <div className="pt-28"></div>
        <PropertyDetail
         property={fetchData?.data}
        />
      </Main>
    </main>
  );
};

export default Property;
