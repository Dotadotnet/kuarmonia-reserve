import React, { useState, useEffect, useMemo } from "react";
import {
  useGetJobTypesQuery,
  useDeleteJobTypeMutation
} from "@/services/jobType/jobTypeApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import Add from "./add";
import Edit from "./edit";
import ControlPanel from "../ControlPanel";
const ListJobType = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useGetJobTypesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  const jobTypes = useMemo(() => data?.data || [], [data]);
  const [
    removeJobType,
    { isLoading: isRemoving, data: deleteJobType, error: removeError }
  ] = useDeleteJobTypeMutation();
  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت دسته بندی شغل ها ...", {
        id: "jobType-loading"
      });
    }

    if (data && !isLoading) {
      toast.success(data?.description, { id: "jobType-loading" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "jobType-loading" });

      if (isRemoving) {
        toast.loading("در حال حذف  ...", { id: "jobType-remove" });
      }

      if (removeError?.data) {
        toast.error(removeError?.data?.description, { id: "jobType-remove" });
      }
    }

    if (deleteJobType && !isRemoving) {
      toast.success("دسته بندی با موفقیت حذف شد.", { id: "jobType-remove" });
    }
  }, [data, error, isLoading, isRemoving, removeError, deleteJobType]);

  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Add />
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
        {isLoading || (jobTypes && jobTypes.length == 0) ? (
          <SkeletonItem repeat={5} />
        ) : (
          jobTypes.map((jobType) => {
            const { title, description } =
              jobType?.translations[0].translation?.fields || {};
            return (
              <div
                key={jobType._id}
                className="mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100"
              >
                <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={jobType.status === "active"} />
                  <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                    {jobType?.thumbnail.url ? (
                      <>
                        {" "}
                        <img
                          src={jobType?.thumbnail.url}
                          alt={``}
                          height={100}
                          width={100}
                          className="h-[60px] w-[60px] rounded-full object-cover"
                        />
                      </>
                    ) : (
                      <>
                        {" "}
                        <img
                          src={jobType?.creator?.avatar.url}
                          alt={``}
                          height={100}
                          width={100}
                          className="h-[60px] w-[60px] rounded-full object-cover"
                        />
                      </>
                    )}

                    <article className="flex-col flex gap-y-2  ">
                      <span className="line-clamp-1 text-base ">
                        <span className="hidden lg:flex ">
                          {jobType?.creator?.name}
                        </span>
                        <span className=" lg:hidden ">{title}</span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(jobType.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className=" lg:hidden text-xs  line-clamp-1">
                        {description
                          ? description
                          : new Date(jobType.createdAt).toLocaleDateString(
                              "fa-IR"
                            )}
                      </span>
                    </article>
                  </div>
                </div>
                <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                      <span className="flex">{title}</span>
                    </span>
                  </article>
                </div>

                <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                  <article className="flex-col flex gap-y-2">
                    <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                      {description}
                    </span>
                  </article>
                </div>

                <div className="hidden lg:col-span-2 col-span-5 gap-2 text-right lg:flex justify-left items-center">
                  <article className="flex-col flex gap-y-2">
                    <span className="flex text-right">{jobType.slug}</span>
                  </article>
                </div>

                <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                  <article className="lg:flex-row flex flex-col justify-center gap-x-2  gap-y-2">
                    <Edit id={jobType?._id} />
                    <DeleteModal
                      description="آیا از حذف این دسته بندی اطمینان دارید؟"
                      isLoading={isRemoving}
                      onDelete={() => removeJobType(jobType?._id)}
                    />
                  </article>
                </div>
              </div>
            );
          })
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

export default ListJobType;
