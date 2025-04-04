import Banner from "@/components/properties/Banner";
import Destinations from "@/components/properties/Properties";
import Main from "@/layouts/Main";
import Head from "next/head";
import React from "react";

const Properties = () => {
  return (
    <main>
      <Head>
        <title>
          خرید و فروش املاک خارج از ایران - بهترین مسیر برای سرمایه‌گذاری و خرید ملک در کشورهای مختلف
        </title>
      </Head>
      <Main>
        <Banner />
        <Destinations />
      </Main>
    </main>
  );
};

export default Properties;
