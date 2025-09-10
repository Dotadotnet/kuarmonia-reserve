import Search from "../searchTrio/Search";
import Auth from "../auth/Auth";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import LanguageSwitcher from "../languageSwitch/page";
const UserMenu = ({setSearchIsOpen}) => {
  return (
    <div className="flex flex-row lg:col-span-2 items-center gap-x-3 z-[9999] ">
      <Auth />
      <LanguageSwitcher />
      <ThemeToggle />
      <Search setSearchIsOpen={setSearchIsOpen} />
    </div>
  );
};

export default UserMenu;
