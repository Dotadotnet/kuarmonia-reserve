// AddInstitutionType.jsx
import { useForm } from "react-hook-form";
import Button from "@/components/shared/button/Button";
import { useAddInstitutionTypeMutation } from "@/services/institutionType/institutionTypeApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "@/components/shared/modal/Modal";
import AddButton from "@/components/shared/button/AddButton";

const AddInstitutionType = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { register, handleSubmit, reset, watch } = useForm();
  const [addInstitutionType, { isLoading: isAdding, data: addData, error: addError }] =
    useAddInstitutionTypeMutation();

  useEffect(() => {
    if (isAdding) {
      toast.loading("در حال افزودن  نوع مرکز علمی...", { id: "add-InstitutionType" });
    }

    if (addData) {
      toast.success(addData?.description, { id: "add-InstitutionType" });
      setIsOpen(false);
      reset();
    }

    if (addError?.data) {
      toast.error(addError?.data?.description, { id: "add-InstitutionType" });
    }
  }, [isAdding, addData, addError]);

  const handleAddInstitutionType = (data) => {
    const requestData = {
      title: data.title,
      description: data.description,
    };
    addInstitutionType(requestData);
  };

  return (
    <>
      <AddButton onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="lg:w-1/3 md:w-1/2 w-full  z-50 h-fit"
        >
          <form
            className="text-sm w-full h-full  flex flex-col items-center gap-y-4 "
            onSubmit={handleSubmit(handleAddInstitutionType)}
          >
          
            <div className="flex gap-4 flex-col w-full">
        
              <label htmlFor="title" className="flex flex-col gap-y-2">
                عنوان
                <input
                  type="text"
                  name="title"
                  id="title"
                  maxLength={50}
                  placeholder="عنوان نوع مرکز علمی را تایپ کنید..."
                  className="rounded"
                  autoFocus
                  {...register("title", { required: true })}
                />
              </label>
              <label htmlFor="description" className="flex flex-col gap-y-2">
                توضیحات
                <textarea
                  name="description"
                  id="description"
                  maxLength={500}
                  placeholder="توضیحات نوع مرکز علمی را تایپ کنید..."
                  className="rounded h-32"
                  {...register("description")}
                />
              </label>
      
         
              <Button type="submit" className="py-2 mt-4">
                ایجاد کردن{" "}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddInstitutionType;
