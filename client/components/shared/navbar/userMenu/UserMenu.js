

import React from "react";
import Search from "../searchTrio/Search";
import Cart from "../cart/Cart";
import Favorites from "../ThemeToggle/ThemeToggle";
import Auth from "../auth/Auth";
const UserMenu = () => {
  return (
    <div className="flex flex-row lg:col-span-2 items-center gap-x-3 z-[9999] ">
      <Search  />
      <Favorites  />
      <Cart   />
      <Auth />
    </div>
  );
};

export default UserMenu;
