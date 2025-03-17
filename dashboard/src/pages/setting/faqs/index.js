import React, { useState, useEffect, useMemo } from "react";
import Panel from "@/layouts/Panel";
import { useGetFaqsQuery, useRemoveFaqMutation } from "@/services/faq/faqApi";
import AddFaq from "./add";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import { FiEdit3 } from "react-icons/fi";
import Pagination from "@/components/shared/pagination/Pagination";
import Image from "next/image";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import Search from "@/components/shared/search";

const ListFaq = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetFaqsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const [removeFaq, { isLoading: isRemoving, error: removeError }] =
    useRemoveFaqMutation();
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const faqs = useMemo(() => data?.data || [], [data]);

  useEffect(() => {
    // مدیریت بارگذاری سوالات
    if (isLoading) {
      toast.loading("در حال دریافت سوالات متداول...", { id: "faq-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("faq-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "faq-loading" });
    }

    // مدیریت بارگذاری هنگام حذف
    if (isRemoving) {
      toast.loading("در حال حذف سوال...", { id: "remove-faq" });
    }

    if (!isRemoving && removeError) {
      toast.error(removeError?.data?.message || "خطا در حذف سوال", {
        id: "remove-faq"
      });
    }

    if (!isRemoving && !removeError) {
      toast.dismiss("remove-faq");
    }
  }, [data, error, isLoading, isRemoving, removeError]);

  return (
    <>
      <Panel>
        <AddFaq />
        <Search searchTerm={searchTerm} />
        {/* نمایش داده‌های تگ‌ها */}
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-3  text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-8 hidden lg:flex  text-sm">
            سوال و جواب
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (faqs && faqs.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          faqs.map((faq) => (
            <div
              key={faq._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={faq.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <Image
                    src={faq?.creator?.avatar.url}
                    alt={``}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex ">
                        {faq?.creator?.name}
                      </span>
                      <span className=" lg:hidden ">{faq?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(faq.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className=" lg:hidden text-xs  line-clamp-1">
                      {faq?.description
                        ? faq?.description
                        : new Date(faq.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-8 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{faq.question}</span>
                  </span>
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{faq.answer}</span>
                  </span>
                </article>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                  <span
                    className="edit-button "
                    onClick={() => openEditModal(faq)}
                  >
                    <FiEdit3 className="w-5 h-5" />
                  </span>
                  <DeleteModal
                    message="آیا از حذف این سوال اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeFaq(faq?._id)}
                  />
                </article>
              </div>
            </div>
          ))
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Panel>
    </>
  );
};

export default ListFaq;
