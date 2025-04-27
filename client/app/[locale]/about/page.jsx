
import React from "react";
import Main from "@/layouts/Main";
import Head from "next/head";
import Container from "@/components/shared/container/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import Introduction from "./Introduction";
import HeaderSection from "./HeaderSection";
import TeamSection from "./TeamSection";
import CompanyResults from "./CompanyResult";
import UserTestimonials from "./UserTestimonials";
import TeamSlider from "./TeamMembers";
import NewsLetter from "@/components/home/news-letter/NewsLetter";

function AboutUs() {
  return (
    <Main>
      <HeaderSection />
      <Container
        className={"max-w-full bg-blue-100 relative dark:bg-gray-900"}
      >
        <Introduction />
        <TeamSection />
        <CompanyResults />
        <UserTestimonials />
        <TeamSlider />
        <NewsLetter />
      </Container>
    </Main>
  );
}

export default AboutUs;
