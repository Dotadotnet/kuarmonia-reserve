

import React from "react";
import Search from "../searchTrio/Search";
import Cart from "../cart/Cart";
import Auth from "../auth/Auth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageSwitcher from "../languageSwitch/page";
const UserMenu = () => {
  return (
    <div className="flex flex-row lg:col-span-2 items-center gap-x-3 z-[9999] ">
       <Search  />
       <ThemeToggle />
      <Cart   />
      <Auth />
      <LanguageSwitcher />
    </div>
  );
};

export default UserMenu;
