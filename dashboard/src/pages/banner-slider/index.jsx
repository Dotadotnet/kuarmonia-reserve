import { useState, useEffect, useMemo } from "react";
import {
  useGetBannersQuery,
  useDeleteBannerMutation
} from "@/services/banner/bannerApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import Add from "./add";
import Edit from "./edit";
import ControlPanel from "../ControlPanel";

const ListBannerSlider = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error, refetch } = useGetBannersQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const banners = useMemo(() => data?.data || [], [data]);

  const [
    removeBanner,
    { isLoading: isRemoving, data: deleteBanner, error: removeError }
  ] = useDeleteBannerMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت بنرها...", { id: "banner-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("banner-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "banner-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف...", { id: "banner-remove" });
    }

    // اضافه کردن بررسی برای عملیات موفق حذف
    if (deleteBanner && !isRemoving) {
      toast.success("بنر با موفقیت حذف شد.", { id: "banner-remove" });
      refetch();
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "banner-remove" });
    }
  }, [data, error, isLoading, isRemoving, removeError, deleteBanner, refetch]);

  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Add />
        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4">
          <div className="col-span-11 lg:col-span-3 text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-2 hidden lg:flex text-sm">
            لینک
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            شناسه
          </div>
          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {/* نمایش داده‌های بنرها */}
        {isLoading ? (
          <SkeletonItem repeat={5} />
        ) : banners && banners.length > 0 ? (
          banners.map((banner) => {
            return (
              <div
                key={banner._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={banner.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    <img
                      src={banner?.image?.url || "/placeholder.png"}
                      alt={banner.title || "بنر"}
                      height={100}
                      width={100}
                      className="h-[60px] w-[60px] rounded-full object-cover"
                    />
                    <article className="flex-col flex gap-y-2">
                      <span className="line-clamp-1 text-base">
                        <span className="hidden lg:flex">
                          {banner?.creator?.name?.fa || "بدون نویسنده"}
                        </span>
                        <span className="lg:hidden">
                          {banner.link || "بدون لینک"}
                        </span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(banner.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span className="lg:hidden text-xs line-clamp-1">
                        {new Date(banner.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                    </article>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                      <span className="flex">{banner.link || "بدون لینک"}</span>
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {banner?.bannerId}
                    </span>
                  </article>
                </div>

                <div className="col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                    <Edit banner={banner} />
                    <DeleteModal
                      message="آیا از حذف این بنر اطمینان دارید؟"
                      isLoading={isRemoving}
                      onDelete={() => removeBanner(banner?._id)}
                    />
                  </article>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 text-gray-500">هیچ بنری یافت نشد</div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ControlPanel>
    </>
  );
};

export default ListBannerSlider;