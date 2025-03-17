import React, { useState, useEffect, useMemo } from "react";
import Panel from "@/layouts/Panel";
import {
  useGetTradeTypesQuery,
  useRemoveTradeTypeMutation
} from "@/services/tradeType/tradeTypeApi";
import Add from "./add";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import { FiEdit3, FiTrash } from "react-icons/fi";
import Pagination from "@/components/shared/pagination/Pagination";
import Image from "next/image";
import Search from "@/components/shared/search";
import DeleteModal from "@/components/shared/modal/DeleteModal";

const ListTradeType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetTradeTypesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const tradeTypes = useMemo(() => data?.data || [], [data]);
  const [
    removeTradeType,
    { isLoading: isRemoving, data: removeData, error: removeError }
  ] = useRemoveTradeTypeMutation();
  useEffect(() => {
    if (isLoading ) {
      toast.loading("در حال دریافت ...", { id: "type-loading" });
    }

    if (data && data?.success) {
      toast.success(data?.message, "type-loading");
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "type-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال دریافت دسته بندی...", { id: "type-removing" });
    }

    if (removeData && removeData?.success) {
      toast.success(removeData?.message, "type-removing");
    }

    if (removeData && !removeData?.success && !isRemoving) {
      toast.error(removeData?.message, { id: "type-removing" });
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "type-removing" });
    }
  }, [data, error, isLoading, removeData, removeError, isRemoving]);

  return (
    <>
      <Panel>
        <Search searchTerm={searchTerm} />
        <Add />
        {/* نمایش داده‌های تگ‌ها */}
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-3  text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-2 hidden lg:flex  text-sm">
            عنوان
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="lg:col-span-2 lg:flex hidden text-sm md:block">
            اسلاگ
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های دسته‌بندی‌ها */}
        {isLoading || (tradeTypes && tradeTypes.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          tradeTypes.map((tradeType) => (
            <div
              key={tradeType._id}
              className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={tradeType.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <Image
                    src={tradeType?.creator?.avatar.url}
                    alt={``}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex ">
                        {tradeType?.creator?.name}
                      </span>
                      <span className=" lg:hidden ">{tradeType?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(tradeType.createdAt).toLocaleDateString(
                        "fa-IR"
                      )}
                    </span>
                    <span className=" lg:hidden text-xs  line-clamp-1">
                      {tradeType?.description
                        ? tradeType?.description
                        : new Date(tradeType.createdAt).toLocaleDateString(
                            "fa-IR"
                          )}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{tradeType.title}</span>
                  </span>
                </article>
              </div>

              <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {tradeType.description}
                  </span>
                </article>
              </div>

              <div className="hidden lg:col-span-2 col-span-5 gap-2 text-right lg:flex justify-left items-center">
                <article className="flex-col flex gap-y-2">
                  <span className="flex text-right">{tradeType.slug}</span>
                </article>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                  <span
                    className="edit-button "
                    onClick={() => openEditModal(tradeType)}
                  >
                    <FiEdit3 className="w-5 h-5" />
                  </span>
                  <DeleteModal
                    message="آیا از حذف نوع معامله اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeTradeType(tradeType?._id)}
                  />
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
      </Panel>
    </>
  );
};

export default ListTradeType;
