import { useForm } from "react-hook-form";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Button from "@/components/shared/button/Button";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { useAddTagMutation } from "@/services/tag/tagApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useState, useEffect } from "react";
import Robot from "@/components/icons/Robot";
import AddButton from "@/components/shared/button/AddButton";

const AddTag = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [keynotes, setKeynotes] = useState([""]);
  const [isOpen, setIsOpen] = useState(false);

  const [addTag, { isLoading: isAdding, data: addData, error: addError }] =
    useAddTagMutation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  برچسب...", { id: "addTag" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "addTag" });
      setIsOpen(false);
      resizeTo()
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "addTag" });
    }
  }, [isAdding, addData, addError]);

  function onSubmit(formData) {
    const formattedData = {
      title: formData.title,
      description: formData.description,
      keynotes: JSON.stringify(keynotes),
      robots: JSON.stringify(selectedOptions.map((option) => option.value))
    };

    addTag(formattedData);
  }

  const robotOptions = [
    {
      id: 1,
      value: "index",
      label: "Index",
      description: "اجازه می‌دهد موتورهای جستجو صفحه را ایندکس کنند"
    },
    {
      id: 2,
      value: "noindex",
      label: "Noindex",
      description: "از ایندکس کردن صفحه توسط موتورهای جستجو جلوگیری می‌کند"
    },
    {
      id: 3,
      value: "follow",
      label: "Follow",
      description:
        "اجازه می‌دهد موتورهای جستجو لینک‌های موجود در صفحه را دنبال کنند"
    },
    {
      id: 4,
      value: "nofollow",
      label: "Nofollow",
      description:
        "از دنبال کردن لینک‌های موجود در صفحه توسط موتورهای جستجو جلوگیری می‌کند"
    }
  ];

  const handleOptionsChange = (newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleAddKeynote = () => {
    setKeynotes([...keynotes, ""]);
  };

  const handleRemoveKeynote = (index) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes.splice(index, 1);
    setKeynotes(updatedKeynotes);
  };

  const handleKeynoteChange = (index, value) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes[index] = value;
    setKeynotes(updatedKeynotes);
  };

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 h-fit"
        >
          <form
            className="text-sm w-full h-full flex flex-col gap-y-4 p-4"
            onSubmit={handleSubmit(onSubmit)}
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
                    required
                    {...register("title", {
                      required: "وارد کردن عنوان الزامی است",
                      minLength: {
                        value: 3,
                        message: "عنوان باید حداقل ۳ کاراکتر باشد"
                      },
                      maxLength: {
                        value: 70,
                        message: "عنوان نمی‌تواند بیشتر از ۷۰ کاراکتر باشد"
                      }
                    })}
                  />
                  {/* نمایش خطا برای عنوان */}
                  {errors.title && (
                    <span className="text-xs text-red-500">
                      {errors.title.message}
                    </span>
                  )}
                </label>

                {/* description */}
                <label
                  htmlFor="description"
                  className="w-full flex flex-col gap-y-1"
                >
                  <span className="text-sm">توضیحات*</span>
                  <textarea
                    name="description"
                    id="description"
                    rows="4"
                    required
                    {...register("description", {
                      required: "وارد کردن توضیحات الزامی است",
                      minLength: {
                        value: 50,
                        message: "توضیحات باید حداقل ۵۰ کاراکتر باشد"
                      },
                      maxLength: {
                        value: 160,
                        message: "توضیحات نمی‌تواند بیشتر از ۱۶۰ کاراکتر باشد"
                      }
                    })}
                  />
                  {errors.description && (
                    <span className="text-xs text-red-500">
                      {errors.description.message}
                    </span>
                  )}
                </label>
              </div>
              {/* keynotes */}
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                <label
                  htmlFor="keynotes"
                  className="w-full flex flex-col gap-y-4"
                >
                  <p className="text-sm flex flex-row justify-between items-center">
                    کلمات کلیدی*
                    <button
                      type="button"
                      className="p-0.5 border rounded-secondary bg-green-500 text-white"
                      onClick={handleAddKeynote}
                    >
                      <Plus />
                    </button>
                  </p>

                  {keynotes.map((keynote, index) => (
                    <p
                      key={index}
                      className="flex flex-row gap-x-2 items-center"
                    >
                      <input
                        type="text"
                        name="کلمات کلیدی"
                        placeholder="کلمه کلیدی را یادداشت کنید"
                        className="flex-1"
                        value={keynote}
                        onChange={(event) =>
                          handleKeynoteChange(index, event.target.value)
                        }
                        required
                      />
                      {index !== 0 && (
                        <button
                          type="button"
                          className="p-0.5 border rounded-secondary bg-red-500 text-white"
                          onClick={() => handleRemoveKeynote(index)}
                        >
                          <Minus />
                        </button>
                      )}
                    </p>
                  ))}
                </label>
              </div>
              {/* انتخاب ربات‌ها */}
              ربات‌ها*
              <MultiSelect
                items={robotOptions}
                selectedItems={selectedOptions}
                handleSelect={handleOptionsChange}
                className="w-full"
                name="robots"
                icon={<Robot size={24} />}
              />
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

export default AddTag;
