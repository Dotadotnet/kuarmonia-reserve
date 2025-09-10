import Image from "next/image";
import { Link } from "@/i18n/navigation";


const Logo = ({ justify = "center" }) => {
  return (
    <Link rel="nofollow" href="/" className={`flex justify-${justify} items-center cursor-pointer w-full`}>
      <Image priority={false} quality={20} width={1383} height={827} alt="logo" src="/logo.png" className="w-[100px] h-[60px]" />
    </Link>
  );
};

export default Logo;
