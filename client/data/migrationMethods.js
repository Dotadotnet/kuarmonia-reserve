import { FaPassport } from 'react-icons/fa'; 
import { IoIosPeople } from 'react-icons/io'; 
import { MdHomeWork } from 'react-icons/md'; 
import { GiBoatFishing } from 'react-icons/gi'; 
import { FaHospital } from 'react-icons/fa'; 
import { MdLocationCity } from 'react-icons/md';
import { FaPlaneDeparture } from 'react-icons/fa';
import { FaUniversity } from 'react-icons/fa';
import { GiFamilyHouse } from 'react-icons/gi'; 
import { FaHandshake } from 'react-icons/fa'; 

const migrationMethods = [
  { name: "پاسپورت", icon: <FaPassport /> },
  { name: "مهاجرت کاری", icon: <MdHomeWork /> },
  { name: "مهاجرت از طریق کارآفرینی", icon: <FaHandshake /> },
  { name: "مهاجرت از طریق تحصیل", icon: <FaUniversity /> },
  { name: "مهاجرت به عنوان پناهنده", icon: <IoIosPeople /> },
  { name: "مهاجرت پزشکی", icon: <FaHospital /> },
  { name: "مهاجرت با کشتی", icon: <GiBoatFishing /> },
  { name: "مهاجرت به مناطق خاص", icon: <MdLocationCity /> },
  { name: "مهاجرت از طریق پرواز", icon: <FaPlaneDeparture /> },
  { name: "مهاجرت خانواده", icon: <GiFamilyHouse /> },
];

export default migrationMethods;
