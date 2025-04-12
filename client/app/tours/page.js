import Banner from "@/components/tours/Banner";
import Destinations from "@/components/tours/Destinations";
import Main from "@/layouts/Main";
export const metadata = {
  title: "تور های ما",
  description:
    "دسته بندی تمام تور ها بر اساس کشور و قیمت",
};
const Tours = () => {
  return (
      <Main>
        <Banner />
        <Destinations />
      </Main>
  );
};

export default Tours;
