import React, { useEffect, useMemo, useState } from "react";
import { useDeleteTagMutation, useGetTagQuery } from "@/services/tag/tagApi";
import { toast } from "react-hot-toast";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { setTag } from "@/features/tag/tagSlice";
import { useDispatch } from "react-redux";
import Trash from "@/components/icons/Trash";

const DeleteTag = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetTagQuery(id);
  const tag = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteTag,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteTagMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات برچسب...", {
        id: "fetchTag",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchTag" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchTag" });
    }

    if (deleting) {
      toast.loading("در حال حذف برچسب...", { id: "deleteTag" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteTag" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteTag" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <span
        type="button"
        disabled={deleting ? true : undefined}
        className="delete-button"
        onClick={() => {
          dispatch(setTag(tag));
          setIsOpen(true);
        }}
      >
        <Trash className="w-5 h-5" />
      </span>

      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          onDelete={() => deleteTag(id)}
          onClose={() => {
            dispatch(setTag({}));
            setIsOpen(false);
          }}
          message={`آیا مطمئن هستید که می‌خواهید برچسب "${tag?.title}" را حذف کنید؟`}
        />
      )}
    </>
  );
};

export default DeleteTag;
