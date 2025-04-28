import React from "react";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Cart from "../cart/Cart";
import Search from "../searchTrio/Search";
import Auth from "../auth/Auth";

function ToolBar() {

	  
  return (
    <div className="px-6 sm:px-25 z-50 fixed w-full bottom-4">
      <div className=" md:hidden  p-2  w-full  bg-white dark:bg-gray-900 shadow-3xl text-gray-500 rounded-2xl cursor-pointer">
        <div className=" p-2 rounded-2xl flex items-center justify-between">
          <Search forToolbar={true} />

          <Cart forToolbar={true} />

          <div className="flex flex-col items-center  hover:text-blue-400 ">
            <div className="absolute bottom-8  text-center flex items-center justify-center rounded-full border-4 text-3xl  border-white dark:border-gray-900 bg-white dark:bg-gray-900  w-[68px] h-[68px] p-2 text-white transition ease-in duration-200 ">
           
              <span className="animate-ping dark:border-[rgb(43,127,255)] border-[rgb(34,197,94)] absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
            </div>
          </div>
          <ThemeToggle />
          <Auth />
        </div>
      </div>
    </div>
  );
}

export default ToolBar;
