import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Button from "@/components/shared/button/Button";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { useGetTagQuery, useUpdateTagMutation } from "@/services/tag/tagApi";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import { useState, useEffect } from "react";
import Robot from "@/components/icons/Robot";
import Edit from "@/components/icons/Edit";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import StatusSwitch from "@/components/shared/button/StatusSwitch";

const UpdateTag = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetTagQuery(id, { skip: !isOpen });
  const [keynotes, setKeynotes] = useState(fetchData?.data?.keynotes ||[""]);
  
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  
  
  const [
    updateTag,
    { isLoading: isUpdateing, data: updateData, error: updateError }
  ] = useUpdateTagMutation();
  
  useEffect(() => {
    if (fetchData?.data?.keynotes) {
      setKeynotes(fetchData.data.keynotes);
    }
    if (isUpdateing) {
      toast.loading("در حال به‌روزرسانی ...", {
        id: "fetchTag"
      });
    }
    console.log(fetchData);
    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchTag" });
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchTag" });
    }

    if (updateData) {
      toast.success(updateData?.message, { id: "updateTag" });
      setIsOpen(false);
    }

    if (updateError?.data) {
      toast.error(updateError?.data?.message, { id: "updateTag" });
    }
  }, [fetching, fetchData, fetchError, isUpdateing, updateData, updateError]);

  const handleUpdateUser = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("keynotes", JSON.stringify(keynotes));
    formData.append(
      "robots",
      JSON.stringify(selectedOptions.map((option) => option.value))
    );
    const status = data.status ? "active" : "inactive";
    formData.append("status", status);

    updateTag({ id: id, body: formData });
  };

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
      <span
        type="button"
        disabled={fetching ? true : undefined}
        className="edit-button"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Edit className="w-5 h-5" />
      </span>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          action=""
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full z-50 p-4 rounded-md overflow-y-hidden text-right "
        >
          <form
            action=""
            className="text-sm w-full h-full flex flex-col gap-y-4 mb-3 p-4 overflow-y-auto"
            onSubmit={handleSubmit(handleUpdateUser)}
          >
            <div className="flex gap-4 flex-col">
              <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
                {/* title */}
                <label htmlFor="title" className="w-full flex flex-col gap-y-1">
                  <span className="text-sm">عنوان*</span>
                  <input
                    type="text"
                    id="title"
                    maxLength="100"
                    defaultValue={fetchData?.data?.title}
                    {...register("title", {
                      required: "عنوان الزامی است!",
                      minLength: {
                        value: 3,
                        message: "عنوان باید حداقل ۳ کاراکتر باشد!"
                      },
                      maxLength: {
                        value: 100,
                        message: "عنوان نمی‌تواند بیش از ۱۰۰ کاراکتر باشد!"
                      },
                      pattern: {
                        value: /^[آ-یA-Za-z0-9\s]+$/,
                        message:
                          "عنوان فقط باید شامل حروف فارسی، انگلیسی و عدد باشد!"
                      }
                    })}
                  />
                  {errors.title && (
                    <span className="text-red-500 text-xs">
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
                    id="description"
                    rows="4"
                    maxLength="500"
                    defaultValue={fetchData?.data?.description}
                    {...register("description", {
                      required: "توضیحات الزامی است!",
                      minLength: {
                        value: 10,
                        message: "توضیحات باید حداقل ۱۰ کاراکتر باشد!"
                      },
                      maxLength: {
                        value: 500,
                        message: "توضیحات نمی‌تواند بیش از ۵۰۰ کاراکتر باشد!"
                      }
                    })}
                  />
                  {errors.description && (
                    <span className="text-red-500 text-xs">
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

                  { keynotes.map((keynote, index) => (
                    <p
                      key={index}
                      className="flex flex-row gap-x-2 items-center"
                    >
                      <input
                        type="text"
                        name="keynote"
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
                selectedItems={fetchData?.data?.robots|| selectedOptions}
                handleSelect={handleOptionsChange}
                className="w-full"
                name="robots"
                icon={<Robot size={24} />}
              />{" "}
              *
              <div className="flex flex-col gap-y-2 w-full ">
                <StatusSwitch
                  label="وضعیت"
                  id="status"
                  register={register}
                  defaultChecked={
                    fetchData?.data?.status === "active" ? true : false
                  }
                />
              </div>
              <Button type="submit" className="py-2 mt-4 mb-4 bg-black">
                ویرایش کردن
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default UpdateTag;
