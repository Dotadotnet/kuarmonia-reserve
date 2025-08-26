import Container from "@/components/shared/container/Container";
import Banner1 from "./Banner1";

const Hero = () => {
  return (
    <section className="bg-no-repeat h-auto  bg-white dark:bg-gray-900 ">
      <Container className=" px-1 lg:px-primary">
        <Banner1 />
      </Container>
    </section>
  );
};

export default Hero;
