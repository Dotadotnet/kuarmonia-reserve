import TestimonialsClient from "./TestimonialsClient";
import Container from "@/components/shared/container/Container";
import HighlightText from "@/components/shared/highlightText/HighlightText";
const testimonials = [
    {
      image: "/assets/images/user1.jpg",
      title: "متقاضی مهاجرت",
      name: "ونسا مارتینز",
      text: "همکاری با این شرکت مهاجرتی تجربه‌ای فوق‌العاده بود. در تمام مراحل راهنمایی و پشتیبانی کامل داشتند."
    },
    {
      image: "/assets/images/user2.jpg",
      title: "متقاضی مراسم",
      name: "سارا بوئن",
      text: "تیم برگزارکننده مراسم بسیار حرفه‌ای و دقیق بود. همه چیز طبق برنامه و با کیفیت عالی انجام شد."
    },
    {
      image: "/assets/images/user3.jpg",
      title: "متقاضی مهاجرت",
      name: "دیوید مورفی",
      text: "با کمک این شرکت، روند مهاجرتم آسان و سریع پیش رفت. بسیار از خدماتشان راضی‌ام."
    },
    {
      image: "/assets/images/user4.jpg",
      title: "متقاضی مراسم",
      name: "کِلسی وست",
      text: "برگزاری مراسم با این تیم بسیار خاطره‌انگیز و بی‌نقص بود. پیشنهاد می‌کنم حتماً از خدماتشان استفاده کنید."
    },
    {
      image: "/assets/images/user4.jpg",
      title: "متقاضی مراسم",
      name: "کِلسی وست",
      text: "برگزاری مراسم با این تیم بسیار خاطره‌انگیز و بی‌نقص بود. پیشنهاد می‌کنم حتماً از خدماتشان استفاده کنید."
    }
  ];
  
  

const Testimonials = async () => {
  return (
    <Container>
      <section className="w-full h-full flex flex-col gap-y-4 ">
        <div className="flex flex-row justify-between items-center">
          <article className="flex flex-col gap-y-4">
            <h2 className="lg:text-5xl md:text-4xl text-4xl whitespace-normal">
              <HighlightText title={"نظرات کاربران"} />
            </h2>
          </article>
          
        </div>
        <p className="text-base"> بازخورد کاربران ما از تجربه همکاری با کارمونیا</p>
        <TestimonialsClient testimonials={testimonials} />
      </section>
    </Container>
  );
};

export default Testimonials;
