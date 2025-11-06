import { useState, useEffect, useMemo } from "react";
import {
  useGetHeroSlidersQuery,
  useDeleteHeroSliderMutation,
  useUpdateHeroSliderIdsMutation
} from "@/services/heroSlider/heroSliderApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import ControlPanel from "../ControlPanel";
import AddButton from "@/components/shared/button/AddButton";
import Edit from "@/components/icons/Edit";
import { Link } from "react-router-dom";

const ListHeroSlider = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);

  // Fetch hero sliders
  const { data, isLoading, error, refetch } = useGetHeroSlidersQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  // Determine which hero sliders to display
  const heroSliders = useMemo(() => {
    return data?.data || [];
  }, [data]);

  const [
    removeHeroSlider,
    { isLoading: isRemoving, data: deleteHeroSlider, error: removeError }
  ] = useDeleteHeroSliderMutation();

  const [
    updateHeroSliderIds,
    { isLoading: isUpdatingIds, data: updateIdsData, error: updateIdsError }
  ] = useUpdateHeroSliderIdsMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت اسلایدر...", { id: "heroSliders-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("heroSliders-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "heroSliders-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف  ...", { id: "heroSliders-remove" });
    }

    if (deleteHeroSlider && !isRemoving) {
      toast.dismiss("heroSliders-remove");
      toast.success("اسلایدر با موفقیت حذف شد.", { id: "heroSliders-remove" });
      refetch();
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "heroSliders-remove" });
    }

    if (isUpdatingIds) {
      toast.loading("در حال به‌روزرسانی ترتیب...", { id: "heroSliders-order" });
    }

    if (updateIdsData && !isUpdatingIds) {
      toast.dismiss("heroSliders-order");
      toast.success("ترتیب اسلایدرها با موفقیت به‌روزرسانی شد.", { id: "heroSliders-order" });
      refetch();
    }

    if (updateIdsError?.data) {
      toast.dismiss("heroSliders-order");
      toast.error(updateIdsError?.data?.message, { id: "heroSliders-order" });
    }
  }, [data, error, isLoading, isRemoving, removeError, deleteHeroSlider, isUpdatingIds, updateIdsData, updateIdsError, refetch]);

  // Drag and drop handlers
  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetItem) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem._id === targetItem._id) {
      return;
    }
    
    // Create a new array with updated order based on heroSliderId
    const updatedItems = [...heroSliders];
    const draggedIndex = updatedItems.findIndex(s => s._id === draggedItem._id);
    const targetIndex = updatedItems.findIndex(s => s._id === targetItem._id);
    
    // Remove dragged item from its current position
    const [removed] = updatedItems.splice(draggedIndex, 1);
    
    // Insert dragged item at target position
    updatedItems.splice(targetIndex, 0, removed);
    
    // Update heroSliderId values to reflect new order (1, 2, 3, ...)
    const itemsWithNewIds = updatedItems.map((item, index) => ({
      id: item._id,
      heroSliderId: index + 1
    }));
    
    // Update heroSlider IDs in the backend
    await updateHeroSliderIds(itemsWithNewIds);
    
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  return (
    <>
      <ControlPanel>
        <div className="flex justify-between items-center w-full mb-4">
          <div></div> {/* Empty div to maintain layout */}
          
          <div className="flex-1">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <AddButton link="./add" />
        </div>

        <div className="mt-8 w-full grid grid-cols-12 text-slate-400 px-4">
          <div className="col-span-11 lg:col-span-3 text-sm">
            <span className="hidden lg:flex">نویسنده</span>
            <span className="flex lg:hidden">نویسنده و عنوان</span>
          </div>
          <div className="col-span-8 lg:col-span-2 hidden lg:flex text-sm">
            عنوان
          </div>
          <div className="lg:col-span-4 lg:flex hidden text-sm md:block">
            توضیحات
          </div>
          <div className="lg:col-span-2 hidden lg:flex text-sm md:block">
            شناسه
          </div>
          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {isLoading || isUpdatingIds ? (
          <SkeletonItem repeat={5} />
        ) : heroSliders && heroSliders.length > 0 ? (
          heroSliders.map((heroSlider) => (
            <div
              key={heroSlider._id}
              className={`mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100 ${draggedItem?._id === heroSlider._id ? "opacity-50" : ""}`}
              draggable
              onDragStart={(e) => handleDragStart(e, heroSlider)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, heroSlider)}
              onDragEnd={handleDragEnd}
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={heroSlider.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <img
                    src={heroSlider?.media?.url || "/placeholder.png"}
                    alt={``}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2">
                    <span className="line-clamp-1 text-base">
                      <span className="hidden lg:flex">
                        {heroSlider?.creator?.name?.fa}
                      </span>
                      <span className="lg:hidden">{heroSlider?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(heroSlider.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="lg:hidden text-xs line-clamp-1">
                      {heroSlider?.caption
                        ? heroSlider?.caption
                        : new Date(heroSlider.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{heroSlider?.title}</span>
                  </span>
                </article>
              </div>

              <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]" title={heroSlider?.caption}>
                    {heroSlider?.caption}
                  </span>
                </article>
              </div>

              <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {heroSlider?.heroSliderId}
                  </span>
                </article>
              </div>

              <div className="col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                  <Link
                    to={`./edit/${heroSlider._id}`}
                    className="edit-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <DeleteModal
                    message="آیا از حذف این اسلایدر اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeHeroSlider(heroSlider?._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </article>
              </div>
            </div>
          ))
        ) : (
          // Show skeleton loading instead of "not found" message
          <SkeletonItem repeat={5} />
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

export default ListHeroSlider;