import React, { useEffect, useMemo, useState } from "react";
import { useDeleteUnitMutation, useGetUnitQuery } from "@/services/unit/unitApi";
import { toast } from "react-hot-toast";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { setUnit } from "@/features/unit/unitSlice";
import { useDispatch } from "react-redux";
import Trash from "@/components/icons/Trash";

const DeleteUnit = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetUnitQuery(id, { skip: !isOpen });
  const unit = useMemo(() => fetchData?.data || {}, [fetchData]);
  const [
    deleteUnit,
    { isLoading: deleting, data: deleteData, error: deleteError },
  ] = useDeleteUnitMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات واحد اندازه گیری...", {
        id: "fetchUnit",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchUnit" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchUnit" });
    }

    if (deleting) {
      toast.loading("در حال حذف برچسب...", { id: "deleteUnit" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteUnit" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUnit" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <span
        type="button"
        disabled={deleting ? true : undefined}
        className="delete-button"
        onClick={() => {
          dispatch(setUnit(unit));
          setIsOpen(true);
        }}
      >
        <Trash className="w-5 h-5" />
      </span>

      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          onDelete={() => deleteUnit(id)}
          onClose={() => {
            dispatch(setUnit({}));
            setIsOpen(false);
          }}
          message={`آیا مطمئن هستید که می‌خواهید برچسب "${unit?.title}" را حذف کنید؟`}
        />
      )}
    </>
  );
};

export default DeleteUnit;
