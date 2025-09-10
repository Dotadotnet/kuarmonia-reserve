import { useEffect, useMemo, useState } from "react";
import { useDeleteCurrencyMutation, useGetCurrencyQuery } from "@/services/currency/currencyApi";
import { toast } from "react-hot-toast";
import DeleteModal from "@/components/shared/modal/DeleteModal";
import { setCurrency } from "@/features/currency/currencySlice";
import { useDispatch } from "react-redux";
import Trash from "@/components/icons/Trash";

const DeleteCurrency = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError,
  } = useGetCurrencyQuery(id, { skip: !isOpen });
  const currency = useMemo(() => fetchData?.data || {}, [fetchData]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال به‌روزرسانی اطلاعات واحد اندازه گیری...", {
        id: "fetchCurrency",
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchCurrency" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchCurrency" });
    }

    if (deleting) {
      toast.loading("در حال حذف برچسب...", { id: "deleteCurrency" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deleteCurrency" });
      setIsOpen(false);
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteCurrency" });
    }
  }, [fetching, fetchData, fetchError, deleting, deleteData, deleteError]);

  return (
    <>
      <span
        type="button"
        disabled={deleting ? true : undefined}
        className="delete-button"
        onClick={() => {
          dispatch(setCurrency(currency));
          setIsOpen(true);
        }}
      >
        <Trash className="w-5 h-5" />
      </span>

      {isOpen && (
        <DeleteModal
          isOpen={isOpen}
          onDelete={() => deleteCurrency(id)}
          onClose={() => {
            dispatch(setCurrency({}));
            setIsOpen(false);
          }}
          message={`آیا مطمئن هستید که می‌خواهید برچسب "${currency?.title}" را حذف کنید؟`}
        />
      )}
    </>
  );
};

export default DeleteCurrency;
