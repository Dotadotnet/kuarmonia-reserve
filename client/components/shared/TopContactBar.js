import { useTranslations } from "next-intl";
import Link from "next/link";
import LTRText from "@/components/shared/LTRText";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const TopContactBar = () => {
  const t = useTranslations("ContactUs");
  
  return (
    <div className="bg-primary fixed top-0 w-full text-white py-1 px-4 text-sm z-40">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="tel:+14376675933" className="text-white hover:text-gray-200 flex items-center space-x-1">
            <FaPhone className="text-xs" />
            <LTRText>+1(437)667-5933</LTRText>
          </Link>
    
        </div>
        <div className="flex items-center space-x-4">
          <Link href="mailto:info@kuarmonia.com" className="text-white hover:text-gray-200 flex items-center space-x-1">
            <FaEnvelope className="text-xs" />
            <span>info@kuarmonia.com</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopContactBar;