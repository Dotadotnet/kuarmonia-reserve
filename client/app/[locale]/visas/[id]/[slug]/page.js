import Main from "@/layouts/Main";
import Container from "@/components/shared/container/Container";
import Api from "@/utils/api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import VisaContent from "./VisaContent"; // بخش کلاینت جدا شده

const VisaPost = async ({ params }) => {
  const { id, locale } = await params;
  
  const visa = await Api(`/dynamic/get-one/visa/visaId/${id}`);
  const seoTranslations = await getTranslations("Seo");
  const api = `${process.env.NEXT_PUBLIC_API}/visa/get-visas`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["visa"] },
    headers: {
      "Accept-Language": locale
    }
  });
  const res = await response.json();
  const visas = res.data;
  return (
    <Main>
      <Container className="!px-0">
    

        <VisaContent visa={visa}  locale={locale} related={visas} />
      </Container>
    </Main>
  );
};

export default VisaPost;
