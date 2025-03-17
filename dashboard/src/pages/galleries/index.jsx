import ControlPanel from "../ControlPanel";
import React, { useState, useEffect } from "react";
import { useGetGalleriesQuery } from "@/services/gallery/galleryApi";
import AddGallery from "./add";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Pagination from "@/components/shared/pagination/Pagination";
import AddButton from "@/components/shared/button/AddButton";
import DeleteGallery from "./DeleteGallery";
import UpdateGallery from "./UpdateGallery";

const Galleries = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { data, isLoading, error, refetch } = useGetGalleriesQuery({
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
      toast.loading("در حال دریافت تگ‌ها...", { id: "gallery-loading" });
    }
    if (data && !isLoading) {
      toast.dismiss("gallery-loading");
    }
    if (data) {
      toast.success(data?.description, { id: "gallery-loading" });
    }
    if (error?.data) {
      toast.error(error?.data?.message, { id: "gallery-loading" });
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
            <span className="hidden lg:flex">عنوان</span>
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
          data.data.map((gallery) => (
            <div
              key={gallery._id}
              className="mt-4 p-2 grid grid-cols-12 rounded-xl min-h-25 border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-50/50 dark:hover:bg-gray-900 dark:text-slate-100 "
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={gallery.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <img
                    src={gallery?.thumbnail.url || "/placeholder.png"}
                    alt="Description of the image"
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2  ">
                    <span className="line-clamp-1 text-base ">
                      <span className="hidden lg:flex ">
                        {gallery?.title}
                      </span>
                      <span className=" lg:hidden ">
                        {gallery?.creator?.name}
                        </span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(gallery.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className=" lg:hidden text-xs line-clamp-1 ">
                      {gallery?.description
                        ? gallery?.description
                        : new Date(gallery.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-3 lg:flex  hidden  text-center  items-center">
                <span className="break-words text-sm lg:text-sm text-right">
                  {gallery.title}
                </span>
              </div>
              <div className="lg:col-span-5 lg:flex hidden col-span-5 text-right  items-center">
                <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                  {gallery.description ? gallery.description : "ندارد"}
                </span>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2  text-center flex justify-center md:items-center items-left">
                <article className="lg:flex-row flex flex-col gap-x-2 justify-left gap-y-2">
                  <span
                  
                  >
                    <UpdateGallery id={gallery?._id} />

                  </span>
                  <span>
                    <DeleteGallery id={gallery?._id} />
                  </span>
                </article>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}

      

        {/* مودال افزودن/ویرایش */}
        {isAddModalOpen && (
          <AddGallery
            isOpen={isAddModalOpen}
            onClose={closeAddModal}
            onSuccess={refetch}
          />
        )}
      </ControlPanel>
    </>
  );
};

export default Galleries;
