import React, { useEffect, useMemo, useState } from "react";
import ControlPanel from "../ControlPanel";
import AddButton from "@/components/shared/button/AddButton";
import { setProducts } from "@/features/product/productSlice";
import {
  useDeleteProductMutation,
  useGetProductsQuery
} from "@/services/product/productApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Trash from "@/components/icons/Trash";
import Edit from "@/components/icons/Edit";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Products() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت به صفحه

  useEffect(() => {
    if (productsLoading) {
      toast.loading("در حال دریاقت محصولات...", { id: "productsData" });
    }

    if (productsData) {
      toast.success(productsData?.description, { id: "productsData" });
    }

    if (productsError) {
      toast.error(productsError?.data?.description, { id: "productsData" });
    }

    dispatch(setProducts(products));
  }, [productsError, productsData, productsLoading, dispatch, products]);

  const [deleteProduct, { isLoading, data, error }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting Product...", { id: "deleteProduct" });
    }

    if (data) {
      toast.success(data?.description, { id: "deleteProduct" });
      setIsDeleteModalOpen(false);
    }

    if (error) {
      toast.error(error?.data?.description, { id: "deleteProduct" });
    }
  }, [isLoading, data, error]);

  const openDeleteModal = (Product) => {
    setSelectedProduct(Product);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };
  const openEditModal = (Product) => {
    setSelectedProduct(Product);
    setIsEditModalOpen(true);
  };

  return (
    <ControlPanel>
      <AddButton link="./add" />
      {productsLoading || products?.length === 0 ? (
        <SkeletonItem repeat={5} />
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
              <div className="col-span-11 lg:col-span-3  text-sm">
                <span className="hidden lg:flex">عنوان</span>
                <span className="flex lg:hidden"> عنوان و توضیحات</span>
              </div>

              <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
                خلاصه
              </div>

              <div className="lg:col-span-3  justify-center lg:flex hidden text-sm md:block">
                موجودی
              </div>
              <div className="lg:col-span-1 lg:flex hidden text-sm md:block">
                سفارشات
              </div>

              <div className="col-span-1 md:block text-sm">عملیات</div>
            </div>

            {products.map((product) => (
              <div
                key={product?._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={product.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={product?.thumbnail?.url}
                      alt={``}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2  ">
                      <span className="line-clamp-1 text-base ">
                        <span className="flex ">{product?.title}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(product.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className=" lg:hidden text-xs  line-clamp-1">
                        {product?.description
                          ? product?.description
                          : new Date(product.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                      </span>
                    </article>
                  </div>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right overflow-hidden">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {product.summary}
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-3 hidden gap-2 lg:flex justify-left items-center text-right">
                  <span className="w-full  h-full overflow-x-auto scrollbar-hide text-sm flex flex-row items-center justify-center gap-x-2">
                    {[...(product?.variations || [])]
                      .sort(
                        (a, b) => Number(a.unit.value) - Number(b.unit.value)
                      )
                      .map((variation) => (
                        <div key={variation?._id} className="relative">
                          <button
                            className={`relative rounded-full flex items-center justify-center text-xl   ${
                              variation.stock > variation.lowStockThreshold
                                ? "bg-teal-400" 
                                : variation.stock === 0
                                ? "bg-red-400"
                                : "bg-yellow-400"
                            }`}
                            style={{
                              width: `${25 + variation.unit.value * 10}px`,
                              height: `${25 + variation.unit.value * 10}px`
                            }}
                          >
                            <span className="text-xs text-white">
                              {variation?.stock} {/* نمایش تعداد موجودی */}
                            </span>
                            <span
                              className={`absolute h-2/3 w-2/3 rounded-full transition-all duration-300 ease-in-out animate-ping ${
                                variation.stock > variation.lowStockThreshold
                                ? "bg-teal-400" 
                                : variation.stock === 0
                                ? "bg-red-400"
                                : "bg-yellow-400"
                            }`}
                            ></span>
                          </button>
                        </div>
                      ))}
                  </span>
                </div>

                <div className="lg:col-span-1 hidden gap-2 lg:flex justify-left items-center text-right">
                  <span className="w-52 overflow-x-auto scrollbar-hide text-sm flex flex-row gap-x-2"></span>
                </div>
                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                    <span
                      className="edit-button "
                      onClick={(e) => {
                        if (isDeleteModalOpen) {
                          e.preventDefault();
                        } else {
                          navigate(`/products/update/${product?._id}`);
                        }
                      }}
                    >
                      <Edit className="w-5 h-5" />
                    </span>
                    <span
                      className="delete-button"
                      onClick={(e) => {
                        openDeleteModal(product);
                      }}
                    >
                      <Trash className="w-5 h-5" />
                    </span>
                  </article>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onDelete={() => deleteProduct(selectedProduct?._id)}
          onClose={closeDeleteModal}
          message={`آیا مطمئن هستید که می‌خواهید دسته‌بندی "${selectedProduct?.title}" را حذف کنید؟`}
        />
      )}
    </ControlPanel>
  );
}

export default Products;
