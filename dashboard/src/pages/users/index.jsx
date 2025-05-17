import React, { useEffect, useMemo, useState } from "react";
import ControlPanel from "../ControlPanel";
import Modal from "@/components/shared/modal/Modal";
import { useGetUsersQuery } from "@/services/user/userApi";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Edit from "@/components/icons/Edit";
import { setUser } from "@/features/user/userSlice";
import UpdateUser from "@/components/home/UpdateUser";
import DeleteUser from "@/components/home/DeleteUser";
import { useDispatch, useSelector } from "react-redux";
import { useGetAdminsQuery } from "@/services/admin/adminApi";

function Users() {
  const [filter, setFilter] = useState("client");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: userLoading,
    data: userData,
    error: userError
  } = useGetUsersQuery();

  const {
    isLoading: adminLoading,
    data: adminData,
    error: adminError
  } = useGetAdminsQuery(undefined, {
    skip: filter === "client" || filter === "all",
  });

  const admin = useSelector((state) => state?.auth?.admin);

  const admins = useMemo(() => adminData?.data || [], [adminData]);
  const users = useMemo(() => userData?.data || [], [userData]);

  const filteredUsers = useMemo(() => {
    if (filter === "superAdmin") return admins.filter(u => u.role === "superAdmin");
    if (filter === "admin") return admins.filter(u => u.role === "admin");
    if (filter === "operator") return admins.filter(u => u.role === "operator");
    return users;
  }, [filter, users, admins]);

  useEffect(() => {
    if (userLoading || (filter !== "client" && adminLoading)) {
      toast.loading("در حال دریافت کاربران...", { id: "users" });
    }
    if (userData && (filter === "client")) {
      toast.success("اطلاعات کاربران دریافت شد", { id: "users" });
    }
    if (adminData && filter !== "client") {
      toast.success("اطلاعات مدیران دریافت شد", { id: "users" });
    }
    if (userError?.data || adminError?.data) {
      toast.error("خطا در دریافت اطلاعات", { id: "users" });
    }
  }, [userLoading, adminLoading, userData, adminData, userError, adminError, filter]);

  return (
    <ControlPanel>
      <section className="flex flex-col gap-y-1">
        <ul className="grid grid-cols-5 gap-1 text-center text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          <li>
            <a
              href="#client"
              className={`flex justify-center text-sm py-2 ${filter === "client" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("client")}
            >
              کاربران
            </a>
          </li>
          <li>
            <a
              href="#superAdmin"
              className={`flex justify-center text-sm py-2 ${filter === "superAdmin" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("superAdmin")}
            >
              مدیر کل
            </a>
          </li>
          <li>
            <a
              href="#admin"
              className={`flex justify-center text-sm py-2 ${filter === "admin" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("admin")}
            >
              مدیر
            </a>
          </li>
          <li>
            <a
              href="#operator"
              className={`flex justify-center text-sm py-2 ${filter === "operator" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("operator")}
            >
              اپراتور
            </a>
          </li>
        </ul>

        {filteredUsers?.map((user) => (
          <div
            key={user?._id}
            className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-slate-100"
          >
            <div className="col-span-7 lg:col-span-4 text-center flex items-center">
              <StatusIndicator isActive={user.status === "active"} />
              <div className="py-2 flex justify-center items-center flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer">
                <div className="user-container rounded-full flex justify-center">
                  <img
                    src={user?.avatar?.url}
                    alt={user?.avatar?.public_id}
                    height={600}
                    width={600}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                </div>
                <article className="flex-col flex gap-y-2">
                  <span className="line-clamp-1 text-sm lg:text-base dark:text-blue-400 flex-row flex">
                    <span className="flex">{user?.name}</span>
                  </span>
                </article>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-4 text-left flex items-start flex-col justify-center">
              <span className="text-md">{user?.email}</span>
              <span className="text-md">{user?.phone}</span>
            </div>

            <div className="col-span-2 lg:col-span-1 text-left flex items-start justify-center flex-col">
              {user?.userLevel === "basic" && <p> عادی</p>}
              {user?.userLevel === "verified" && <p> تاییدشده</p>}
              {user?.userLevel === "completed" && <p> تکمیل‌شده</p>}
            </div>

            <div className="col-span-2 lg:col-span-2 text-left flex items-end justify-center flex-col">
              <span className="text-md">
                {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </span>
            </div>

            {admin?.role === "superAdmin" && (
              <div className="lg:col-span-1 ml-3 lg:flex col-span-1 text-gray-500 text-right justify-right flex-row-reverse items-center">
                <article className="flex-col flex gap-y-1 items-center justify-center">
                  <span
                    className="edit-button w-10 h-10"
                    onClick={() => {
                      setIsOpen(true);
                      dispatch(setUser(user));
                    }}
                  >
                    <Edit className="w-5 h-5" />
                  </span>
                  <span className="flex">
                    <DeleteUser id={user?._id}  />
                  </span>
                </article>
              </div>
            )}
          </div>
        ))}

        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
              dispatch(setUser({}));
            }}
            className="lg:w-3/12 md:w-1/2 w-full z-50 p-4 !rounded-lg"
          >
            <UpdateUser setIsOpen={setIsOpen} />
          </Modal>
        )}
      </section>
    </ControlPanel>
  );
}

export default Users;
