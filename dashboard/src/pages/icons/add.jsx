import { useEffect, useState } from "react";
import Button from "@/components/shared/button/Button";
import { useAddIconMutation } from "@/services/icon/iconApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useForm } from "react-hook-form";
import AddButton from "../../components/shared/button/AddButton";

const AddIcon = () => {
    const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
        watch,

    formState: { errors }
  } = useForm();

  const [addIcon, { isLoading: isAdding, data: addData, error: addError }] =
    useAddIconMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  برچسب...", { id: "addIcon" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "addIcon" });
      setIsOpen(false)
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "addIcon" });
    }
  }, [isAdding, addData, addError]);

  function handleAddIcon(data) {
    const formData = {
      title: data.title,
      symbol: data.symbol
    };

    addIcon(formData);
  }
  
  const title = watch("title");
  const symbol = watch("symbol");

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
            isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto"
            onSubmit={handleSubmit(handleAddIcon)}
          >
            <div className="flex gap-4 flex-col">
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                {/* title */}
                <label htmlFor="title" className="w-full flex flex-col gap-y-1">
                  <span className="text-sm">عنوان*</span>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    maxLength="100"
                    required
                    {...register("title", {
                      required: "عنوان الزامی است",
                      minLength: {
                        value: 3,
                        message: "عنوان باید حداقل ۳ کاراکتر باشد"
                      }
                    })}
                  />
                </label>
                {/* value */}
                     <label htmlFor="symbol" className="flex flex-col gap-y-2">
        کد SVG آیکون
        <textarea
          id="symbol"
          placeholder="<svg>...</svg>"
          className="rounded h-32 font-mono text-xs"
          {...register("symbol")}
        />
      </label>

      
      <div className="w-full flex justify-center">
        {symbol && (
          <div className="border rounded p-4 mt-2 flex justify-center items-center w-32 h-32">
            <div 
              dangerouslySetInnerHTML={{ __html: symbol }} 
              className="w-16 h-16 flex items-center justify-center"
            />
          </div>
        )}
      </div>
              </div>
              <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
                ایجاد کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddIcon;