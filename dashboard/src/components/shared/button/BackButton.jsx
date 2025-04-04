import React from "react";
import { NavLink } from "react-router-dom";
import ChevronRight from "@/components/icons/ChevronRight";

function BackButton({to}) {
  return (
    <div>
      <NavLink
        to={to}
        className={
          "fixed bottom-4 right-4 group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50"
        }
      >
        <ChevronRight />
      </NavLink>
    </div>
  );
}

export default BackButton;
