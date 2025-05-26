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

  console.log(rent);
  return (
    <Main>
      <div
        className={`  h-full md:pt-24  gap-6 ${directionClass} md:px-4 pt-20`}
      >
        <Container>
          <div className="h-full w-full flex flex-col gap-y-8">
            <div className="grid grid-cols-12 gap-8">
              <Left rent={rent} />
              <Right rent={rent} />
            </div>
            <AllReviews
              className="!px-0"
              targetId={rent._id}
              targetType="rent"
              reviews={rent.reviews}
            />{" "}
            <MoreRents />
          </div>
        </Container>
      </div>
    </Main>
  );
};

export default RentPost;
