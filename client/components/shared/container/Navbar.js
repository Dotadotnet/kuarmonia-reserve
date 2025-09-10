import React from 'react'; 
import { RxCross2 } from 'react-icons/rx';
import { HiMenuAlt4 } from 'react-icons/hi';
import ToggleThemeButton from "@/components/shared/theme/ToggleThemeButton";
import {SettingPannelIcon,SearchPannelIcon,NotificationPannelIcon} from "@/utils/SaveIcon";
const Navbar = ({ router, open, setOpen }) => {
    return (
        <div className="2xl:mx-auto">
            <div className=" bg-gray-100 dark:bg-slate-800   p-2 border-b dark:border-blue-800">
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <div className="lg:hidden md:hidden block">
                    <button
                        className="border p-1 rounded-secondary dark:border-gray-600"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <RxCross2 className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        ) : (
                            <HiMenuAlt4 className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        )}
                    </button>

                    </div>
                    </div>

                    {/* <p className="flex flex-row items-center gap-x-2 text-sm capitalize whitespace-nowrap overflow-x-auto scrollbar-hide text-ellipsis">
                        <Link href="/">
                            <IoHomeOutline className="h-5 w-5 text-gray-800 dark:text-gray-200" />
                        </Link>
                        {router?.route?.split("/")?.map((route, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && " / "}
                                <Link href={index === 1 ? `/dashboard` : `/dashboard/${route}`} className="text-gray-800 dark:text-gray-200">
                                    {index === 1 ? "Dashboard" : route.split("-").join(" ")}
                                </Link>
                            </React.Fragment>
                        ))}
                    </p> */}
                    <div className="p-2 flex justify-center gap-3 " >
             

                    <button
  className="p-2 text-green-500 dark:text-gray-500  transition-all duration-300 ease-in-out rounded-full bg-blue-50 dark:bg-gray-900 hover:text-blue-600 dark:hover:text-light dark:hover:bg-gray-700 dark:bg-dark focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-offset-4 dark:focus:ring-offset-gray-800"
>


        <span className="sr-only">Open Notification panel</span>
        <NotificationPannelIcon />
        </button>

      {/* Search button */}
      <button
  className="p-2 text-green-500 dark:text-gray-500 transition-all duration-300 ease-in-out rounded-full bg-blue-50 dark:bg-gray-900 hover:text-blue-600 dark:hover:text-light dark:hover:bg-gray-700 dark:bg-dark focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-offset-4 dark:focus:ring-offset-gray-800"
>
      <span className="sr-only">Open search panel</span>
      <SearchPannelIcon />

      </button>

      {/* Settings button */}
      <button
  className="p-2 text-green-500 dark:text-gray-500  transition-all duration-300 ease-in-out rounded-full bg-blue-50 dark:bg-gray-900 hover:text-blue-600 dark:hover:text-light dark:hover:bg-gray-700 dark:bg-dark focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 focus:ring-offset-4 dark:focus:ring-offset-gray-800"
>
        <span className="sr-only">Open settings panel</span>
       <SettingPannelIcon />
      </button>
                    <ToggleThemeButton />
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default Navbar;
