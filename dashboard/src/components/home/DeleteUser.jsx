import React, { useEffect, useMemo, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUserQuery
} from "@/services/user/userApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { setUser } from "@/features/user/userSlice";
import { useDispatch } from "react-redux";
import  Trash  from '@/components/icons/Trash';
import Warning from "@/components/icons/Warning";
import Cart from "@/components/icons/Cart";
import Favorite from '@/components/icons/Favorite';
import Review from "@/components/icons/Review";

const DeleteUser = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetUserQuery(id);
  const user = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteUser,
    { isLoading: deleting, data: deleteData, error: deleteError }
  ] = useDeleteUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات کاربر...", {
        id: "fetchUser"
      });
    }

    if (fetchData) {
      toast.success(fetchData?.description, { id: "fetchUser" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.description, { id: "fetchUser" });
    }

    if (deleting) {
      toast.loading("در حال حذف کاربر...", { id: "deleteUser" });
    }

    if (deleteData) {
      toast.success(deleteData?.description, { id: "deleteUser" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.description, { id: "deleteUser" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <span
        type="button"
        disabled={deleting ? true : undefined} // اصلاح شده
        className="delete-button"
        onClick={() => {
          dispatch(setUser(user));
          setIsOpen(true);
        }}
      >
        <Trash className="w-5 h-5" />
      </span>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => {
            dispatch(setUser({}));
            setIsOpen(false);
          }}
          className="lg:w-3/12 md:w-1/2 w-full z-50"
        >
          <section className="h-full w-full p-4   flex flex-col gap-y-4">
            <article className="flex flex-col items-center gap-y-8 h-full overflow-y-auto">
              <div className="flex flex-col items-center gap-y-1">
                <div className="flex flex-col gap-y-4">
                  <img
                    src={user?.avatar?.url}
                    alt={user?.avatar?.public_id}
                    height={100}
                    width={100}
                    className="h-[100px] w-[100px] rounded object-cover"
                  />
                  <h1 className="text-2xl">{user.name}</h1>
                </div>
                <div className="flex flex-col gap-y-1">
                  <p className="text-xs">{user.email}</p>
                  <p className="text-xs">{user.phone}</p>
                  <p className="flex flex-row gap-x-1">
                    <span className="bg-purple-100/50 text-purple-900 border border-purple-900 px-1.5 !text-xs rounded-primary uppercase">
                    {user?.role === "superAdmin"
                    ? "مدیر کل"
                    : user?.role === "admin"
                    ? "مدیر"
                    : "کاربر"}
                    </span>
                    <span className="bg-indigo-100/50 text-indigo-900 border border-indigo-900 px-1.5 !text-xs rounded-primary uppercase">
                      {user.status ==="active"? "فعال" :"غیر فعال"}
                    </span>
                    
                  </p>
                </div>
              </div>
              <div className="text-sm flex flex-col gap-y-2.5">
                <p className="flex flex-row gap-x-1 items-center">
                  <Warning className="w-5 h-5" /> این عملیات غیر قابل
                  بازگشت است!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <Cart className="h-5 w-5" /> آیتم‌های سبد خرید کاربر
                  حذف خواهند شد!
                </p>
                <p className="flex flex-row gap-x-1 items-center">
                  <Favorite className="h-5 w-5" /> آیتم‌های مورد علاقه
                  کاربر حذف خواهند شد!
                </p>
                {/* <p className="flex flex-row gap-x-1 items-center">
                  <BiSolidPurchaseTag className="h-5 w-5" />{" "}
                  {user?.purchases?.length} خرید شما حذف خواهند شد!
                </p> */}
               
                <p className="flex flex-row gap-x-1 items-center">
                  <Review className="h-5 w-5" />{" "}
                  {user?.reviews?.length} نظرات کاربر حذف خواهند شد!
                </p>
              </div>
            </article>
            <div className="flex flex-row gap-x-2 justify-around text-sm">
              <button
                type="button"
                className=" flex flex-row items-center gap-x-0.5 bg-green-100/50 border border-green-900 text-green-900 px-2 py-1 rounded"
                onClick={() => {
                  dispatch(setUser({}));
                  setIsOpen(false);
                }}
              >
                لغو
              </button>
              <button
                type="button"
                className=" flex flex-row items-center gap-x-0.5 bg-red-100/50 border border-red-900 text-red-900 px-2 py-1 rounded"
                onClick={() => deleteUser(id)}
              >
                <Trash className="h-4 w-4" />
                حذف
              </button>
            </div>
          </section>
        </Modal>
      )}
    </>
  );
};

export default DeleteUser;
