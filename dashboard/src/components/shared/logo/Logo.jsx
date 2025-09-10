
import { NavLink } from "react-router-dom";

const Logo = ({ justify = "center" }) => {
  return (
    <NavLink to="/" className={`flex justify-${justify} items-center cursor-pointer w-full`}>
      <img width={1383} height={1383} alt="logo" src="/logo.gif" className="w-[100px] h-[100px]" />
    </NavLink>
  );
};

export default Logo;
