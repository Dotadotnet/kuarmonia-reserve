import Image from "next/image";
import { Link } from "@/i18n/navigation";
import React from "react";

const Logo = ({ justify = "center" }) => {
  return (
    <Link href="/" className={`flex justify-${justify} items-center cursor-pointer w-full`}>
      <Image width={1383} height={827} alt="logo" src="/logo.png" className="w-[100px] h-[60px]" />
    </Link>
  );
};

export default Logo;
