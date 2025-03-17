import ControlPanel from "../ControlPanel";
import React, { useState, useEffect } from "react";
import { useGetUnitsQuery } from "@/services/unit/unitApi";
import AddUnit from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import AddButton from "@/components/shared/button/AddButton";
import DeleteUnit from "./DeleteUnit";
import UpdateUnit from "./UpdateUnit";

const Units = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading, error, refetch } = useGetUnitsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm,
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت تگ‌ها...", { id: "unit-loading" });
    }
    if (data && !isLoading) {
      toast.dismiss("unit-loading");
    }
    if (data) {
      toast.success(data?.description, { id: "unit-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "unit-loading" });
    }
  }, [data, error, isLoading]);

  return (
    <>
      <ControlPanel>
        <div className="md:flex md:flex-row md:items-center md:justify-between ">
          <AddButton onClick={openAddModal} />
        </div>

        {/* نمایش داده‌های تگ‌ها */}
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4 ">
          <div className="col-span-11 lg:col-span-3  text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-3 hidden lg:flex  text-sm">
            عنوان
          </div>
          <div className="lg:col-span-5 lg:flex hidden text-sm md:block">
            توضیحات
          </div>

          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>
        {isLoading || data?.data?.length == 0 ? (
          <SkeletonItem repeat={5} />
        ) : (
          data.data.map((unit) => (
            <div
              key={unit._id}
              className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50/50 dark:hover:bg-gray-900 dark:text-slate-100 "
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={unit.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <img
                    src={unit?.creator?.avatar?.url || "/placeholder.png"}
                    alt="Description of the image"
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex ">
                        {unit?.creator?.name}
                      </span>
                      <span className=" lg:hidden ">{unit?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(unit.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className=" lg:hidden text-xs line-clamp-1 ">
                      {unit?.description
                        ? unit?.description
                        : new Date(unit.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-3 lg:flex  hidden  text-center  items-center">
                <span className="break-words text-sm lg:text-sm text-right">
                  {unit.title}
                </span>
              </div>
              <div className="lg:col-span-5 lg:flex hidden col-span-5 text-right  items-center">
                <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                  {unit.description ? unit.description : "ندارد"}
                </span>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2  text-center flex justify-center md:items-center items-left">
                <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                  <span
                  
                  >
                    <UpdateUnit id={unit?._id} />

                  </span>
                  <span>
                    <DeleteUnit id={unit?._id} />
                  </span>
                </article>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}

      

        {/* مودال افزودن/ویرایش */}
        {isAddModalOpen && (
          <AddUnit
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSuccess={refetch}
          />
        )}
      </ControlPanel>
    </>
  );
};

export default Units;
