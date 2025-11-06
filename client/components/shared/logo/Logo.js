'use client';

import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Logo = ({ justify = "center" }) => {
  return (
    <Link
      href="/"
      rel="nofollow"
      className={`flex items-center justify-${justify} cursor-pointer w-full`}
    >
    <Image
      src="/logo.png"
      alt="لوگو کارمونیا"
      width={1383}
      height={827}
      className="w-[100px] h-[60px] object-contain"
      priority 
    />
    </Link>
  );
};

export default Logo;
