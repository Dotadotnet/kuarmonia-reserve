import React from "react";
import Image from 'next/image';

const Screen = () => {
  return (
    <section className="flex loader-div fixed top-0 right-0 z-[2222222222222] justify-center items-center h-screen w-screen  bg-white">
      <Image
        src="/loading.png"
        alt="loading"
        height={300}
        width={300}
        priority // Add the priority prop
      />   
    </section>
  );
};

export default Screen;
