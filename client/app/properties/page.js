import Banner from "@/components/properties/Banner";
import Destinations from "@/components/properties/Properties";
import Main from "@/layouts/Main";
export const metadata = {
  title: "خرید و فروش ملک",
  description:
    "خرید و فروش ملک در همه جای جهان با سند تک برگ و شیش دانگ",
};
const Properties = () => {
  return (
      <Main>
        <Banner />
        <Destinations />
      </Main>
  );
};

export default Properties;
