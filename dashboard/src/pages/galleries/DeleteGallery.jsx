import React, { useEffect, useMemo, useState } from "react";
import { useDeleteGalleryMutation, useGetGalleryQuery } from "@/services/gallery/galleryApi";
import { toast } from "react-hot-toast";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { setGallery } from "@/features/gallery/gallerySlice";
import { useDispatch } from "react-redux";
import Trash from "@/components/icons/Trash";

const DeleteGallery = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetGalleryQuery(id, { skip: !isOpen });
  const gallery = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteGallery,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteGalleryMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات واحد اندازه گیری...", {
        id: "fetchGallery",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchGallery" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchGallery" });
    }

    if (deleting) {
      toast.loading("در حال حذف برچسب...", { id: "deleteGallery" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteGallery" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteGallery" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <span
        type="button"
        disabled={deleting ? true : undefined}
        className="delete-button"
        onClick={() => {
          dispatch(setGallery(gallery));
          setIsOpen(true);
        }}
      >
        <Trash className="w-5 h-5" />
      </span>

      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          onDelete={() => deleteGallery(id)}
          onClose={() => {
            dispatch(setGallery({}));
            setIsOpen(false);
          }}
          message={`آیا مطمئن هستید که می‌خواهید برچسب "${gallery?.title}" را حذف کنید؟`}
        />
      )}
    </>
  );
};

export default DeleteGallery;
