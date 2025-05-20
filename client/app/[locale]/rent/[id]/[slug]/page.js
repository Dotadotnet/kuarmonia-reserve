import Main from "@/layouts/Main";
import "./Style.css";
import Head from "next/head";
import Container from "@/components/shared/container/Container";
import Left from "@/components/detail/rent/Left";
import Right from "@/components/detail/rent/Right";
import AllReviews from "@/components/detail/AllReviews";
import MoreRents from "@/components/detail/MoreRents";

const RentPost = async ({ params }) => {
  const { id, locale } = await params; 

  const api = `${process.env.NEXT_PUBLIC_API}/rent/get-rent/${id}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["rent", `rent/${id}`] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const rent = res.data;

  const directionClass = locale === "fa" ? "rtl" : "ltr";

  const { title, summary,slug } =
    rent?.translations?.find((t) => t.translation?.language === locale)
      ?.translation?.fields || {};

  return (
    <Main>
      <div
        className={`grid grid-cols-1  h-full md:pt-20 lg:grid-cols-3 gap-6 ${directionClass} md:px-4 pt-20`}
      >
        <Head>
          <title>{}</title>
        </Head>
        <Container>
          <div className="h-full w-full flex flex-col gap-y-8">
            <div className="grid grid-cols-12 gap-8">
              <Left />
              <Right />
            </div>
            <AllReviews className="!px-0" />
            <MoreRents className="!px-0" />
          </div>
        </Container>
      </div>
    </Main>
  );
};

export default RentPost;
