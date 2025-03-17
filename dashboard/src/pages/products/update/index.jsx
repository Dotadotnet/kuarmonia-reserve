import Left from "@/components/details/Left";
import Right from "@/components/details/Right";
import {
  useGetProductQuery,
  useUpdateProductApproveMutation,
  useUpdateProductRejectMutation,
  useUpdateProductReviewMutation,
  useUpdateProductStatusMutation
} from "@/services/product/productApi";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import ControlPanel from "../../ControlPanel";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Apply from "@/components/icons/Apply";
import Reject from "@/components/icons/Reject";
import Review from "@/components/icons/Review";
import ChevronRight from "@/components/icons/ChevronRight";
import StatusSwitch from "@/components/shared/button/StatusSwitch";
import { QRCodeCanvas } from "qrcode.react";
import Qrc from "@/components/icons/Qrc";
import Modal from "@/components/shared/modal/Modal";
const Update = () => {
  const { product_id } = useParams();
  const user = useSelector((state) => state?.auth?.user);
  const [showQRCode, setShowQRCode] = useState(false);

  const id = product_id;
  const {
    data: productData,
    error: productError,
    isLoading: productLoading
  } = useGetProductQuery(id);
  const product = useMemo(() => productData?.data || {}, [productData]);
  const [
    updateProductApprove,
    { isLoading: approveLoading, data: approveData, error: approveError }
  ] = useUpdateProductApproveMutation();
  const [
    updateProductReject,
    { isLoading: rejectLoading, data: rejectData, error: rejectError }
  ] = useUpdateProductRejectMutation();
  const [
    updateProductReview,
    { isLoading: reviewLoading, data: reviewData, error: reviewError }
  ] = useUpdateProductReviewMutation();
  const [
    updateProductStatus,
    { isLoading: statusLoading, data: statusData, error: statusError }
  ] = useUpdateProductStatusMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectMessage, setRejectMessage] = useState("");
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  useEffect(() => {
    if (productLoading) {
      toast.loading("در حال دریافت محصول...", { id: "productData" });
    }

    if (productData) {
      toast.success(productData?.description, { id: "productData" });

      if (
        (user?.role === "superAdmin" && product?.publishStatus === "pending") ||
        (user?.role === "admin" && product?.publishStatus === "rejected")
      ) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 1000);
      }
    }

    if (productError) {
      toast.error(productError?.description, { id: "productData" });
    }

    if (approveLoading) {
      toast.loading(approveLoading?.description, { id: "approveData" });
    }

    if (approveData) {
      toast.success(approveData?.description, { id: "approveData" });
      setIsModalOpen(false);
    }

    if (approveError) {
      toast.error(approveError?.description, {
        id: "approveData"
      });
    }

    if (rejectLoading) {
      toast.loading(rejectLoading?.description, { id: "rejectData" });
    }

    if (rejectData) {
      toast.success(rejectData?.description, { id: "rejectData" });
    }

    if (rejectError) {
      toast.error(rejectError?.description, {
        id: "rejectData"
      });
    }

    if (reviewLoading) {
      toast.loading(reviewLoading?.description, { id: "reviewLoading" });
    }

    if (reviewData) {
      toast.success(reviewData?.description, { id: "reviewData" });
    }

    if (reviewError) {
      toast.error(reviewError?.description, {
        id: "reviewError"
      });
    }
    if (statusLoading) {
      toast.loading(statusLoading?.description, { id: "statusData" });
    }

    if (statusData) {
      toast.success(statusData?.description, { id: "statusData" });
    }

    if (statusError) {
      toast.error(statusError?.description, {
        id: "statusData"
      });
    }
  }, [
    productData,
    productError,
    user,
    productLoading,
    approveLoading,
    approveData,
    approveError,
    rejectLoading,
    rejectData,
    rejectError,
    reviewLoading,
    reviewData,
    reviewError,
    statusLoading,
    statusData,
    statusError
  ]);

  return (
    <>
      <ControlPanel>
        <div className="flex justify-between items-center border-b-2 border-dashed ">
          <NavLink
            to={"/products"}
            className={
              "  group items-center reject-button rounded-full  !bg-red-800/20 shadow-lg !p-4 text-slate-300 transition-all hover:text-slate-100 z-50 mb-2"
            }
          >
            <ChevronRight />
          </NavLink>
          <div className="flex items-center justify-center">
            <StatusSwitch
              label="وضعیت"
              id="status"
              defaultChecked={product?.status === "active" ? true : false}
              onChange={() => {
                updateProductStatus({ id: product_id });
              }}
            />
            <div>
              <button
                onClick={() => setShowQRCode(true)}
                className=" text-white px-4 py-2 rounded-md"
              >
                <Qrc />
              </button>
            </div>

            <Modal
              isOpen={showQRCode}
              onClose={() => setShowQRCode(false)}
              className="p-4 lg:w-1/4"
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center items-center"
                onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن مدال هنگام کلیک داخل آن
              >
                <QRCodeCanvas value={product.qrCode} size={256} />
                <p className="mt-4 text-lg font-bold">QR کد محصول</p>
              </div>
            </Modal>
          </div>
        </div>
        <div className="h-full w-full flex flex-col gap-y-20 ">
          <div className="grid grid-cols-12 gap-8">
            {productLoading || !product ? (
              <>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <div className="h-[200px] w-full rounded bg-gray-200 animate-pulse" />
                </div>
                <div className="lg:col-span-6 md:col-span-6 col-span-12">
                  <div className="w-full flex flex-col gap-y-4">
                    <div className="h-[200px] w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-[100px] w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-[50px] w-full rounded bg-gray-200 animate-pulse" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <Left product={product} />
                <Right product={product} />
              </>
            )}
          </div>
        </div>

        {isModalOpen && (
          <div
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-opacity-70 transition-all ease-in-out duration-500"
            style={{
              transform: "translateY(0)",
              opacity: 1
            }}
          >
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1)]">
              <div className="flex justify-around items-center">
                {user?.role === "superAdmin" ? (
                  <>
                    <div>
                      <button
                        className="group w-[150px] py-2 rounded-md apply-button"
                        onClick={() => {
                          updateProductApprove({ id: product._id });
                        }}
                      >
                        <Apply />
                        <span className="mr-2">تایید</span>
                      </button>
                    </div>
                    <div>
                      {product?.creator?.role === "superAdmin" ? (
                        <button
                          className="group border reject-button w-[150px]"
                          onClick={() => setIsModalOpen(false)}
                        >
                          <Reject />
                          <span className="mr-2">انصراف</span>
                        </button>
                      ) : (
                        <button
                          className="group border reject-button w-[150px]"
                          onClick={() => setIsRejectModalOpen(true)}
                        >
                          <Reject />
                          <span className="mr-2">رد</span>
                        </button>
                      )}
                    </div>
                  </>
                ) : user?.role === "admin" ? (
                  <>
                    <div>
                      <button
                        className="group w-[150px] py-2 rounded-md review-button"
                        onClick={() => {
                          updateProductReview({ id: product._id });
                        }}
                      >
                        <Review />
                        <span className="mr-2">بازبینی</span>
                      </button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
        {isRejectModalOpen && (
          <div
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-opacity-70 transition-all ease-in-out duration-500"
            style={{
              transform: "translateY(0)",
              opacity: 1
            }}
          >
            <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1)]">
              <div className="flex justify-center items-center flex-col gap-y-4">
                <textarea
                  value={rejectMessage}
                  onChange={(e) => setRejectMessage(e.target.value)}
                  placeholder="لطفاً دلیل رد را وارد کنید"
                  className="border p-2 rounded-md w-full mb-4 h-32"
                />
                <button
                  className="group w-[150px] py-2 rounded-md reject-button"
                  onClick={() => {
                    updateProductReject({ id: product._id, rejectMessage });
                  }}
                >
                  <Reject />
                  <span className="mr-2">ارسال دلیل رد</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </ControlPanel>
    </>
  );
};

export default Update;
