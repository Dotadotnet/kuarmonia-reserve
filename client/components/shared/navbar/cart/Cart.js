import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../modal/Modal";
import HighlightText from "../../highlightText/HighlightText";
import Image from "next/image";
import {
  useGetCartQuery,
  useRemoveFromCartMutation
} from "@/services/cart/cartApi";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import Cart from "@/components/icons/Cart";

const MyCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const admin = useSelector((state) => state?.auth);

  const [
    removeFromCart,
    {
      isLoading: removeFromCartLoading,
      data: removeFromCartData,
      error: removeFromCartError
    }
  ] = useRemoveFromCartMutation();

  useEffect(() => {
    if (removeFromCartLoading) {
      toast.loading("Removing from cart...", { id: "remove-from-cart" });
    }

    if (removeFromCartData) {
      toast.success(removeFromCartData?.message, {
        id: "remove-from-cart"
      });
    }

    if (removeFromCartError?.data) {
      toast.error(removeFromCartError?.data?.message, {
        id: "remove-from-cart"
      });
    }
  }, [removeFromCartLoading, removeFromCartData, removeFromCartError]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        onClick={openModal}
      >
        <Cart className="h-6 w-6" />

        <span
          className={`h-2 w-2 rounded-secondary absolute -top-1 -right-1 ${
            admin?.cart?.rents?.length > 0 && "bg-green-500"
          }`}
        ></span>
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="lg:w-1/3 md:w-1/2 w-full z-50"
      >
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl drop-shadow">
            بررسی <HighlightText>سبد خرید</HighlightText>
          </h1>
          <section className="h-full w-full">
            {admin?.cart?.rents?.length === 0 ? (
              <p className="text-sm text-red-500">No rents found!</p>
            ) : (
              <section className="grid grid-cols-2 gap-4">
                {admin?.cart?.rents?.map((rent) => (
                  <div
                    key={rent?._id}
                    className="flex flex-col gap-y-2.5 border p-4 rounded relative"
                  >
                    <Image
                      src={rent?.gallery[0].url}
                      alt={rent?.gallery[0]?.public_id}
                      width={100}
                      height={50}
                      className="object-cover rounded"
                    />

                    <article className="flex flex-col gap-y-2">
                      <div className="">
                        <h2 className="line-clamp-1">{rent?.title}</h2>
                        <p className="line-clamp-2 text-xs">
                          {rent?.description}
                        </p>
                      </div>
                      <div className="flex flex-row gap-x-2 items-start">
                        <Image
                          src={admin?.avatar?.url}
                          alt={admin?.avatar?.public_id}
                          height={25}
                          width={25}
                          className="h-[25px] w-[25px] rounded-secondary object-cover"
                        />
                        <div className="flex flex-col gap-y-0.5 flex-1 w-full">
                          <h2 className="text-sm">{admin?.name}</h2>
                          <p className="text-xs !line-clamp-1">{admin?.email}</p>
                        </div>
                      </div>
                    </article>

                    <button
                      type="button"
                      className="absolute top-2 right-2 p-1 rounded-secondary bg-red-500 !text-white"
                      onClick={() => removeFromCart(rent?._id)}
                    >
                      {removeFromCartLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                      ) : (
                        <FiTrash className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                ))}
              </section>
            )}
          </section>
        </div>
      </Modal>
    </>
  );
};

export default MyCart;
