import React, { useState, useEffect, useMemo } from "react";

import {
  useGetSlidesQuery,
  useUpdateSlideMutation,
  useDeleteSlideMutation
} from "@/services/slide/slideApi";
import AddSlide from "./add";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import AddButton from "@/components/shared/button/AddButton";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import { FiEdit3, FiTrash } from "react-icons/fi";
import Pagination from "@/components/shared/pagination/Pagination";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { TfiVideoClapper } from "react-icons/tfi";

const ListSlide = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetSlidesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const slides = useMemo(
    () => (Array.isArray(data?.data) ? data.data : []),
    [data]
  );
  const [deleteSlide, { isLoading: isUpdating }] = useDeleteSlideMutation();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (Slide) => {
    setSelectedSlide(Slide);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedSlide(null);
    setIsEditModalOpen(false);
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت دسته بندی...", { id: "slide-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("slide-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "slide-loading" });
    }
  }, [data, error, isLoading]);
  const onStatusFilterChange = (status) => {
    setStatusFilter(status);
    setCurrentPage(1); // بازنشانی صفحه به صفحه اول بعد از تغییر فیلتر
    refetch();
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const openDeleteModal = (slide) => {
    setSelectedSlide(slide); // ذخیره کردن اسلاید انتخاب شده
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedSlide(null);
    setIsDeleteModalOpen(false);
  };
  const handleDelete = async () => {
    try {
      if (selectedSlide) {
        await deleteSlide(selectedSlide._id).unwrap();
        toast.success("اسلاید با موفقیت حذف شد");
        refetch(); // به‌روزرسانی داده‌ها پس از حذف
      }
    } catch (error) {
      toast.error("خطا در حذف اسلاید");
    }
    closeDeleteModal();
  };

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت دسته بندی...", { id: "slide-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("slide-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "slide-loading" });
    }
  }, [data, error, isLoading]);
  return (
    <>
      <Panel>
        {/* دکمه افزودن دسته‌بندی */}
        <AddButton onClick={openAddModal} />
        <div className="mt-6 md:flex md:flex-row-reverse md:items-center md:justify-between ">
        <div className="inline-flex overflow-hidden bg-white border rounded-lg   dark:!bg-[#0a2d4d]    dark:border-blue-500 rtl:flex-row">
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:hover:bg-gray-700 focus:bg-gray-300 dark:focus:bg-gray-700"
              onClick={() => onStatusFilterChange("all")}
            >
              همه
            </button>
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100 border-l dark:border-blue-500 dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
              onClick={() => onStatusFilterChange("active")}
            >
              فعال
            </button>
            <button
              className="px-5 py-2 bg-gray-100 dark:bg-[#0a2d4d] text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm  dark:text-gray-300 hover:bg-gray-100  dark:focus:bg-gray-700 dark:hover:bg-gray-700 focus:bg-gray-300"
              onClick={() => onStatusFilterChange("inactive")}
            >
              غیر فعال
            </button>
          </div>

          <div className="relative flex items-center mt-4 md:mt-0">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        {/* نمایش داده‌های تگ‌ها */}
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-5  text-sm">
            <span> عنوان</span>
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="hidden lg:flex lg:col-span-1  text-sm">
            <span> تاریخ ایجاد</span>
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (slides && slides.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          slides.map((slide) => (
            <div
              key={slide._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-4 text-center flex items-center">
                <StatusIndicator isActive={slide.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  {slide?.bgImg.type === "image" ? (
                                     <Image
                                     src={slide?.bgImg?.url || "/placeholder.png"}
                                     height={100}
                                     width={100}
                                     alt={slide?.title}
                                     className="h-[60px] w-[60px] rounded-full object-cover"
                                   />
                                    ) : (
                                      
                                      <span className="text-secondary dark:text-blue-500">
                                      <TfiVideoClapper  size={54}  />
                                      </span>

                                    )}
                  
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 max-h-[1.6em] text-base ">
                      <span className="    text-sm">{slide?.title}</span>
                    </span>
                    <span className="   ">{slide?.creator?.name}</span>
                  </article>
                </div>
              </div>

              <div className="lg:col-span-6 hidden gap-2 lg:flex justify-left items-center text-right">
                <span className="text-sm mx-4  overflow-hidden text-ellipsis block line-clamp-2 max-h-[5em] ">
                  {slide.description}
                </span>
              </div>

              <div className="hidden lg:flex lg:col-span-1 items-center justify-center  text-sm">
                {new Date(slide.createdAt).toLocaleDateString("fa-IR")}
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                  <span
                    className="line-clamp-1 cursor-pointer rounded-full border border-green-500/5 bg-green-500/5 p-2 text-green-500 transition-colors hover:border-green-500/10 hover:bg-green-500/10 hover:!opacity-100 group-hover:opacity-70"
                    onClick={() => openEditModal(slide)}
                  >
                    <FiEdit3 className="w-5 h-5 rounded-full" />
                  </span>
                  <span
                    className="line-clamp-1 cursor-pointer rounded-full border border-red-500/5 bg-red-500/5 p-2 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70"
                    onClick={() => openDeleteModal(slide)}
                  >
                    <FiTrash className="w-5 h-5" />
                  </span>
                </article>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
        {isDeleteModalOpen && (
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onDelete={handleDelete}
            onClose={closeDeleteModal}
            message={`آیا مطمئن هستید که می‌خواهید اسلاید "${selectedSlide?.title}" را حذف کنید؟`} // نمایش پیام به‌روز شده
          />
        )}

        {/* مودال ویرایش */}
        {isEditModalOpen && (
          <AddSlide
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            onSuccess={refetch}
            SlideToEdit={selectedSlide}
          />
        )}

        {/* مودال افزودن */}
        {isAddModalOpen && (
          <AddSlide
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSuccess={refetch}
          />
        )}
      </Panel>
    </>
  );
};

export default ListSlide;
