

import React from "react";
import Image from 'next/image'

const AdvantageBanner = () => {
  return (
    <Image
      src="/assets/static/Choosing Us Banner.png"
      alt={"advantage"}
      height={633}
      width={541}
      className="w-full rounded border border-primary dark:border-blue-500"
    />
  );
};

export default AdvantageBanner;
