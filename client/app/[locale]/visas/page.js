import Main from "@/layouts/Main";
import Head from "next/head";
import Banner from "@/components/visas/Banner";
import VisasSection from "@/components/visas/VisasSection";

const VisasPage = async () => {
  return (
    <main>
      <Head>
        <title>مسیر ویزاها - فیلتر بر اساس نوع و کشور</title>
      </Head>
      <Main>
        <Banner />
        <VisasSection />
      </Main>
    </main>
  );
};

export default VisasPage;

