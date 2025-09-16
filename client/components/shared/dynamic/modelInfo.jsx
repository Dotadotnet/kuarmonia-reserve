import { IoHome } from "react-icons/io5";
import { HiNewspaper } from "react-icons/hi2";
import { FaBlog } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaUserGear } from "react-icons/fa6";
import { BiConversation } from "react-icons/bi";
import { FaCcVisa } from "react-icons/fa6";

export const modelsInfo = {
    property: { icon: <IoHome />, schema: "Residence" },
    news: { icon: <HiNewspaper />, schema: "NewsArticle" },
    blog: { icon: <FaBlog />, schema: "BlogPosting" },
    rent: { icon: <FaHotel />, schema: "Hotel" },
    opportunity: { icon: <FaUserGear />, schema: "JobPosting" },
    service: { icon: <BiConversation />, schema: "Service" },
    visa: { icon: <FaCcVisa />, schema: "Service" }
}
