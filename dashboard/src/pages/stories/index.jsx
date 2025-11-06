import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useGetStoriesQuery,
  useGetStoryQuery,
  useDeleteStoryMutation,
  useUpdateStoryOrderMutation
} from "@/services/story/storyApi";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import Search from "@/components/shared/search";
import ControlPanel from "../ControlPanel";
import AddButton from "@/components/shared/button/AddButton";
import Edit from "@/components/icons/Edit";
import ChevronRight from "@/components/icons/ChevronRight";
import OutlineEye from "@/components/icons/OutlineEye";
import { Link } from "react-router-dom";

const ListStory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [draggedStory, setDraggedStory] = useState(null);

  // Fetch parent stories (without parentId)
  const { data, isLoading, error, refetch } = useGetStoriesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: searchTerm
  });

  // Fetch story details (including children) when a story is selected
  const { data: storyDetails, isLoading: isStoryLoading } = useGetStoryQuery(
    selectedStory?._id,
    {
      skip: !selectedStory
    }
  );

  // Update story order mutation
  const [updateStoryOrder, { isLoading: isUpdatingOrder }] = useUpdateStoryOrderMutation();

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;

  // Determine which stories to display
  const stories = useMemo(() => {
    if (selectedStory && storyDetails?.data?.children) {
      return storyDetails.data.children;
    }
    return data?.data || [];
  }, [data, selectedStory, storyDetails]);

  const [
    removeStory,
    { isLoading: isRemoving, data: deleteStory, error: removeError }
  ] = useDeleteStoryMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت استوری...", { id: "stories-loading" });
    }

    if (data && !isLoading) {
      toast.dismiss("stories-loading");
    }

    if (error?.data) {
      toast.error(error?.data?.message, { id: "stories-loading" });
    }

    if (isRemoving) {
      toast.loading("در حال حذف  ...", { id: "stories-remove" });
    }

    if (deleteStory && !isRemoving) {
      toast.dismiss("stories-remove");
      toast.success("استوری با موفقیت حذف شد.", { id: "stories-remove" });
      refetch();
    }

    if (removeError?.data) {
      toast.error(removeError?.data?.message, { id: "stories-remove" });
    }

    if (isUpdatingOrder) {
      toast.loading("در حال به‌روزرسانی ترتیب...", { id: "stories-order" });
    }
  }, [data, error, isLoading, isRemoving, removeError, deleteStory, refetch, isUpdatingOrder]);

  const handleStoryClick = (story) => {
    if (selectedStory?._id === story._id) {
      // If clicking the same story, go back to parent view
      setSelectedStory(null);
    } else {
      // Show children of the clicked story
      setSelectedStory(story);
      setCurrentPage(1);
    }
  };

  const handleBackToParents = () => {
    setSelectedStory(null);
    setCurrentPage(1);
  };

  // Drag and drop handlers
  const handleDragStart = (e, story) => {
    setDraggedStory(story);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e, targetStory) => {
    e.preventDefault();

    if (!draggedStory || draggedStory._id === targetStory._id) {
      return;
    }

    // Create a new array with updated order
    const updatedStories = [...stories];
    const draggedIndex = updatedStories.findIndex(s => s._id === draggedStory._id);
    const targetIndex = updatedStories.findIndex(s => s._id === targetStory._id);

    // Remove dragged story from its current position
    const [removed] = updatedStories.splice(draggedIndex, 1);

    // Insert dragged story at target position
    updatedStories.splice(targetIndex, 0, removed);

    // Update order values
    const storiesWithNewOrder = updatedStories.map((story, index) => ({
      id: story._id,
      order: index + 1
    }));

    try {
      // Update order in the backend
      await updateStoryOrder(storiesWithNewOrder).unwrap();
      toast.success("ترتیب استوری‌ها با موفقیت به‌روزرسانی شد", { id: "stories-order" });
      refetch();
    } catch (error) {
      toast.error("خطا در به‌روزرسانی ترتیب استوری‌ها", { id: "stories-order" });
    }

    setDraggedStory(null);
  };

  const handleDragEnd = () => {
    setDraggedStory(null);
  };

  // Handle click vs drag detection
  const handleMouseDown = (e, story) => {
    // Store the initial mouse position
    story.initialX = e.clientX;
    story.initialY = e.clientY;
  };

  const handleMouseUp = (e, story) => {
    // Check if this was a click (not a drag)
    const deltaX = Math.abs(e.clientX - story.initialX);
    const deltaY = Math.abs(e.clientY - story.initialY);

    // If mouse movement was minimal, treat as a click
    if (deltaX < 5 && deltaY < 5) {
      handleStoryClick(story);
    }
  };

  return (
    <>
      <ControlPanel>
        <div className="flex justify-between items-center w-full mb-4">
          {selectedStory ? (
            <button
              onClick={handleBackToParents}
              className="px-4 py-2 flex gap-x-2 items-center bg-primary text-white rounded hover:bg-blue-600 transition-colors"
            >
              بازگشت
              <ChevronRight />
            </button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}

          <div className="flex-1">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <AddButton link="./add" />
        </div>

        {selectedStory && (
          <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h3 className="text-lg font-medium">
              فرزندان: {selectedStory.title}
            </h3>
          </div>
        )}

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
            ترتیب
          </div>
          <div className="col-span-1 md:block text-sm">عملیات</div>
        </div>

        {isLoading || isStoryLoading ? (
          <SkeletonItem repeat={5} />
        ) : stories && stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story._id}
              className={`mt-4 p-1 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2 transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-gray-800 dark:text-slate-100 ${draggedStory?._id === story._id ? "opacity-50" : ""
                }`}
              draggable
              onDragStart={(e) => handleDragStart(e, story)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, story)}
              onDragEnd={handleDragEnd}
              onMouseDown={(e) => handleMouseDown(e, story)}
              onMouseUp={(e) => handleMouseUp(e, story)}
            >
              <div className="col-span-10 lg:col-span-3 text-center flex items-center">
                <StatusIndicator isActive={story.status === "active"} />
                <div className="py-2 flex justify-center items-center gap-x-2 text-right">
                  <img
                    src={story?.media?.url || "/placeholder.png"}
                    alt={``}
                    height={100}
                    width={100}
                    className="h-[60px] w-[60px] rounded-full object-cover"
                  />
                  <article className="flex-col flex gap-y-2">
                    <span className="line-clamp-1 text-base">
                      <span className="hidden lg:flex">
                        {story?.creator?.name?.fa}
                      </span>
                      <span className="lg:hidden">{story?.title}</span>
                    </span>
                    <span className="text-xs hidden lg:flex">
                      {new Date(story.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                    <span className="lg:hidden text-xs line-clamp-1">
                      {story?.caption
                        ? story?.caption
                        : new Date(story.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </article>
                </div>
              </div>
              <div className="lg:col-span-2 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis line-clamp-1">
                    <span className="flex">{story?.title}</span>
                  </span>
                </article>
              </div>

              <div className="lg:col-span-4 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]" title={story?.caption}>
                    {story?.caption}
                  </span>
                </article>
              </div>

              <div className="lg:col-span-1 hidden gap-2 lg:flex justify-left items-center text-right">
                <article className="flex-col flex gap-y-2">
                  <span className="text-sm lg:text-base overflow-hidden text-ellipsis block line-clamp-1 max-h-[1.2em]">
                    {story?.order}
                  </span>
                </article>
              </div>

              <div className="col-span-2 md:col-span-1 gap-2 text-center flex justify-center items-center">
                <article className="lg:flex-row flex flex-col justify-center gap-x-2 gap-y-2">
                  <button
                    className="view-children-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStoryClick(story);
                    }}
                  >
                    <OutlineEye className="w-5 h-5" />
                  </button>
                  <Link
                    to={`./edit/${story._id}`}
                    className="edit-button"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <DeleteModal
                    message="آیا از حذف این استوری اطمینان دارید؟"
                    isLoading={isRemoving}
                    onDelete={() => removeStory(story?._id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </article>
              </div>

            </div>
          ))
        ) : (
          <SkeletonItem repeat={5} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ControlPanel>
    </>
  );
};

export default ListStory;