import { useEffect, useState } from "react";
import Dashboard from "@/components/icons/Dashboard";
import { useSelector } from "react-redux";
import OutsideClick from "../../outsideClick/OutsideClick";
import Image from "next/image";
import Logout from "@/components/icons/Logout";
import { Link } from "@/i18n/navigation";
import { useUserLogoutMutation } from "@/services/auth/authApi";
import toast from "react-hot-toast";
import UserNav from "@/components/icons/UserNav";

function Auth() {
  const user = useSelector((state) => state?.auth?.user);
  const [isOpen, setIsOpen] = useState(false);
  
  const [userLogout, { isLoading: userIsLoading, error: userError, data: userData }] = useUserLogoutMutation();

  const isLoggedIn = user && Object.keys(user).length > 0;

  const handleLogout = () => {
    if (user) {
      userLogout();
    }
  };

  useEffect(() => {
    if (userIsLoading) {
      toast.loading("در حال خروج ...", { id: "logout" });
    }

    if (userData?.success) {
      toast.success(userData?.message, { id: "logout" });
      window.location.href = "/";
    }

    if (userData && !userData?.success) {
      toast.error(userData?.message, { id: "logout" });
    }

    if (userError?.data) {
      toast.error(userError?.data?.message, { id: "logout" });
    }
  }, [userIsLoading, userData, userError]);

  return (
    <div>
      {isLoggedIn ? (
        <button
          className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Dashboard className="h-6 w-6" />
        </button>
      ) : (
        <div className="flex items-center">
          <Link
            className="p-2 rounded-secondary flex items-center hover:bg-slate-200 bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            href="/auth/signin"
            rel="nofollow"
          >
            <UserNav className="h-6 w-6" />
          </Link>
        </div>
      )}

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute md:top-full bottom-full left-2 md:right-0 md:w-80 w-52 h-fit bg-white dark:bg-slate-900 border border-primary dark:border-blue-500 rounded p-2 flex flex-col mb-4 md:mb-0 dark:text-gray-100"
        >
          <div className="flex flex-col">
            <div className="flex flex-row gap-x-2 p-4">
              <Image
                src={user?.avatar?.url || "/placeholder.png"}
                alt="User Avatar"
                height={300}
                width={300}
                className="rounded object-cover h-[50px] w-[50px]"
              />
              <article className="flex flex-col">
                <h2 className="line-clamp-1">
                  {user?.name || "نام کاربر ثبت نشده است"}
                </h2>
                <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis dark:text-gray-100">
                  {user?.phone || user?.email || "شماره تلفن"}
                </p>
              </article>
            </div>

            {user?.status === "inactive" && (
              <p className="bg-red-50 border border-red-900 px-2 rounded-secondary text-red-900 text-xs lowercase w-fit">
                در انتظار تأیید
              </p>
            )}

            <p className="mt-2 text-sm px-4">
              سطح کاربری:{" "}
              <span className="text-green-500">
                {user?.userLevel === "basic"
                  ? "پایه"
                  : user?.userLevel === "verified"
                  ? "تأیید شده"
                  : user?.userLevel === "completed"
                  ? "کامل"
                  : "نامشخص"}
              </span>
            </p>

            <hr className="border-primary" />

            <div className="flex flex-col p-2 md:flex-row justify-between">
              <div
                className="w-full flex md:flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
                onClick={handleLogout}
              >
                <span className="bg-sky-500/5 p-1 rounded rotate-180">
                  <Logout />
                </span>
                <article className="whitespace-nowrap">
                  <h2 className="text-sm">خروج</h2>
                  <p className="text-xs">حذف اطلاعات ورود</p>
                </article>
              </div>

              <div
                className="w-full flex flex-row-reverse md:flex-row md:justify-end justify-end gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer items-center"
                onClick={() => window.open("/dashboard", "_self")}
              >
                <article className="whitespace-nowrap">
                  <h2 className="text-sm">پنل کاربری</h2>
                </article>
                <span className="bg-sky-500/5 p-1 rounded">
                  <Logout />
                </span>
              </div>
            </div>
          </div>
        </OutsideClick>
      )}
    </div>
  );
}

export default Auth;
