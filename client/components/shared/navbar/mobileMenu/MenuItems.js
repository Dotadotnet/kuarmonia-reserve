

import Link from "next/link";
import React from "react";
import OutsideClick from "../../outsideClick/OutsideClick";
import { useSelector } from "react-redux";

const MenuItems = ({ isOpen, setIsOpen }) => {
  const admin = useSelector((state) => state?.auth);
  const handleOutsideClick = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      id: 1,
      name: "داشبورد",
      href: "/dashboard",
    },
  ];

  const adminItems = [
    {
      id: 2,
      name: "ثبت نام",
      href: "/auth/signup",
    },
    {
      id: 3,
      name: "ورود",
      href: "/auth/signin",
    },
  ];

  return (
    isOpen && (
      <OutsideClick onOutsideClick={handleOutsideClick}>
        <section className="absolute top-full right-0 w-40 mt-2 z-50">
          <div className="w-full h-full bg-secondary dark:bg-gray-700 shadow rounded border border-primary/20 dark:border-blue-500">
            <div className="flex flex-col gap-y-3 py-primary">
              {Object.keys(admin).length > 0 && (
                <>
                  <div className="flex flex-col gap-y-2 px-secondary">
                    {menuItems.map(({ id, name, href }) => (
                      <Link
                        key={id}
                        href={href}
                        className="flex justify-between group text-sm"
                      >
                        {name}{" "}
                        <span className="group-hover:opacity-100 opacity-5 font-bold">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                  <hr className="border-primary/20" />
                </>
              )}
              <div className="flex flex-col gap-y-2 px-secondary">
                {localStorage.getItem("accessToken") &&
                Object.keys(admin).length > 0 ? (
                  <button
                    type="button"
                    className="flex justify-between group text-sm"
                    onClick={() => {
                      localStorage.removeItem("accessToken");
                      window.location.reload();
                    }}
                  >
                    خروج{" "}
                    <span className="group-hover:opacity-100 opacity-5 font-bold">
                      →
                    </span>
                  </button>
                ) : (
                  adminItems.map(({ id, name, href }) => (
                    <Link
                      key={id}
                      href={href}
                      className="flex justify-between group text-sm"
                    >
                      {name}{" "}
                      <span className="group-hover:opacity-100 opacity-5 font-bold">
                        →
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </OutsideClick>
    )
  );
};

export default MenuItems;
