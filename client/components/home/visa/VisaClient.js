"use client";

import Container from "@/components/shared/container/Container";
import VisaSlider from "./VisaSlider";

export default function VisaClient({ visas }) {

  return (
    <section
      id="flights"
      className=" pt-4 dark:bg-gray-900"
      style={{
        backgroundImage: "url(/assets/home-page/blogs-and-travel-guide/bg.svg)",
        backgroundPosition: "125% 80%"
      }}
    >      <Container>



          <VisaSlider visas={visas} />
      </Container>
    </section>
  );
}