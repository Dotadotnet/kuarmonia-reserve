import React from "react";
import Image from 'next/image';

const Screen = () => {
  return (
    <section className="flex justify-center items-center h-screen w-screen bg-secondary/10">
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
