import Container from "@/components/shared/container/Container";
import KeyServices from "@/components/home/steps/KeyServices";
import Banner1 from "./Banner1";

const Hero = () => {
  return (
    <section className="bg-no-repeat h-auto  bg-white dark:bg-gray-900 pt-24">
      <Container className=" px-1 lg:px-primary">
        <Banner1 />
        <KeyServices />
      </Container>
    </section>
  );
};

export default Hero;
