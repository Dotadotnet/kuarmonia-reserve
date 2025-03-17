import React, { useEffect, useState } from "react";
import ControlPanel from "../../ControlPanel";
import { useNavigate } from 'react-router-dom';
import {
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation
} from "@/services/post/postApi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import SkeletonText from "@/components/shared/skeleton/SkeletonText";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import RTEditor from "@/components/shared/editor/RTEditor";
import Modal from "@/components/shared/modal/Modal";
import DeleteModal from "@/components/shared/modal/DeleteModal";

const Info = () => {
  const router = useNavigate();
  const user = useSelector((state) => state?.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metakeywords, setMetaKeywords] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [isCategoryEditing, setIsCategoryEditing] = useState(true);
  const [isContentEditing, setIsContentEditing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [galleryPreview, setGalleryPreview] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const { id } = router.query;

  const {
    formState: { errors },
    register,
    control,
    clearErrors,
    setValue,
    getValues,
    reset,
    onSuccess
  } = useForm();
  const {
    isLoading: fetching,
    data: fetchData,
    error: fetchError
  } = useGetPostQuery(id);

  const categoryOptions = categories?.map((category) => ({
    id: category._id,
    value: category.title,
    description: category.description
  }));
  const [
    deletepost,
    { isLoading: deleting, data: deleteData, error: deleteError }
  ] = useDeletePostMutation();

  const [
    updatepost,
    { isLoading: updating, data: updateData, error: updateError }
  ] = useUpdatePostMutation();

  const dispatch = useDispatch();

  const handleTitleEditClick = () => {
    setIsTitleEditing(true);
    setIsDescriptionEditing(false);
  };
  const handleDescriptionEditClick = () => {
    setIsDescriptionEditing(true);
    setIsTitleEditing(false);
  };
  const handleCategoryEditClick = () => {
    setIsCategoryEditing(false);
    setIsDescriptionEditing(false);
    setIsTitleEditing(false);
  };
  const handleContentEditClick = () => {
    setIsEditorOpen(true);
  };
  const closeModal = () => {
    setIsEditorOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  useEffect(() => {
    if (fetchData?.data) {
      setTitle(fetchData?.data?.title);
      setDescription(fetchData?.data?.description);
      setCategory(fetchData?.data?.category);
      setContent(fetchData?.data?.content);
      setSlug(fetchData?.data?.slug);
      setMetaKeywords(fetchData?.data?.content);
      setMetaTitle(fetchData?.data?.metaTitle);
      setMetaDescription(fetchData?.data?.metaDescription);
      setCanonicalUrl(fetchData?.data?.canonicalUrl);
    }
  }, [fetchData]);

  const handleSaveContent = () => {
    handleSave();
  };

  const handleSave = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("content", content);

    if (galleryPreview) {
      formData.append("featuredImage", galleryPreview[0]);
    }
    updatepost({
      id: id,
      data: formData
    })
      .unwrap()
      .then((response) => {
        toast.success("بروزرسانی با موفقیت انجام شد");
        setTitle(title);
        setDescription(description);
        setContent(content);
        setContent(content);
        setGalleryPreview(featuredImage);
        setIsTitleEditing(false);
        setIsEditorOpen(false);
        setIsDescriptionEditing(false);
      })
      .catch((error) => {
        toast.error("خطا در به‌روزرسانی .");
      });
  };

  useEffect(() => {
    if (fetching) {
      toast.loading("در حال بروزرسانی اطلاعات...", {
        id: "fetchpost"
      });
    }

    if (fetchData) {
      toast.success(fetchData?.message, { id: "fetchpost" });
      if (
        (user?.role === "superAdmin" &&
          fetchData?.data?.publishStatus === "pending") ||
        (user?.role === "admin" &&
          fetchData?.data?.publishStatus === "rejected")
      ) {
        setTimeout(() => {
          setIsModalOpen(true);
        }, 1000);
      }
    }

    if (fetchError?.data) {
      toast.error(fetchError?.data?.message, { id: "fetchPost" });
    }

    if (deleting) {
      toast.loading("در حال حذف پست...", { id: "deletePost" });
    }

    if (deleteData) {
      toast.success(deleteData?.message, { id: "deletePost" });
      setIsModalOpen(false);
      window.open("/", "_self");
    }

    if (deleteError?.data) {
      toast.error(deleteError?.data?.message, { id: "deleteUser" });
    }
  }, [
    fetching,
    fetchData,
    fetchError,
    deleting,
    deleteData,
    deleteError,
    user?.role
  ]);

  const handleApprove = () => {
    const formData = new FormData();

    formData.append("publishStatus", "approved");
    updatepost({
      id,
      data: formData
    })
      .unwrap()
      .then((response) => {
        setIsModalOpen(false);
        toast.success("وضعیت به  تایید تغییر کرد.");
      })
      .catch((error) => {
        toast.error("خطا در به‌روزرسانی وضعیت.");
      });
  };

  const handleReject = () => {
    const formData = new FormData();

    formData.append("publishStatus", "rejected");
    updatepost({
      id,
      data: formData
    })
      .unwrap()
      .then((response) => {
        setIsModalOpen(false);
        toast.success("وضعیت به رد تغییر کرد.");
      })
      .catch((error) => {
        toast.error("خطا در به‌روزرسانی وضعیت.");
      });
  };

  const handleReview = () => {
    const formData = new FormData();

    formData.append("publishStatus", "pending");
    updatepost({
      id,
      data: formData
    })
      .unwrap()
      .then((response) => {
        setIsModalOpen(false);
        toast.success("برای بررسی دوباره به مدیر ارسال شد");
      })
      .catch((error) => {
        toast.error("خطا در به‌روزرسانی وضعیت.");
      });
  };

  const handleDelete = () => {
    deletepost(id)
      .unwrap()
      .then((response) => {
        toast.success("پست با موفقیت حذف شد");
        setIsDeleteModalOpen(false);
        window.open("/dashboard/posts", "_self"); 
      })
      .catch((error) => {
        toast.error("خطا در حذف پست.");
        setIsDeleteModalOpen(false);
      });
  };
  

  return (
    <>
      <ControlPanel>
        <div className="flex flex-col gap-y-4">
          <div>
            <div className="flex items-center justify-between ">
              <div>
                <a
                  onClick={() => router.push("/dashboard/posts")}
                  className="flex cursor-pointer items-center dark:text-slate-300 text-slate-700 transition-all hover:text-slate-700 dark:hover:text-slate-800"
                >
                  <Back />
                  <span className="mr-2">بازگشت</span>
                </a>
              </div>

              <div className=" flex items-center space-x-3 flex-row-reverse md:space-x-5">
                <div>
                  <button
                    className="bg-teal-500 relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    id="headlessui-switch-15"
                    role="switch"
                    type="button"
                    tabIndex="0"
                    aria-checked="true"
                  >
                    <span
                      aria-hidden="true"
                      className="translate-x-0 pointer-events-none inline-block  transform rounded-full h-7 w-7 bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                    ></span>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => openDeleteModal()}
                    className=" text-black dark:text-white hover:text-red-500 rounded-full p-2 shadow-md  transition duration-200"
                  >
                    <FiTrash size={36} />
                  </button>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0">
              <div className="flex max-w-full flex-wrap items-center justify-between p-5 md:p-8">
                <div className="flex flex-1 flex-col md:flex-row items-center">
                  <div className="border-b md:border-b-0 md:border-l border-slate-700 pl-4 text-3xl  dark:text-slate-300 text-slate-700">
                    <div className="flex items-center text-2xl">
                      <span className="relative ml-3 mr-0.5 flex h-3 w-3">
                        <span className="animate-ping bg-teal-400 absolute inline-flex h-full w-full rounded-full opacity-75"></span>
                        <span className="bg-teal-400 relative inline-flex h-3 w-3 rounded-full"></span>
                      </span>
                      <div className="overflow-hidden h-full text-ellipsis whitespace-nowrap mb-2  text">
                        {fetching ? (
                          <SkeletonText width="200px" height="30px" />
                        ) : (
                          <span>
                            {isTitleEditing ? (
                              <input
                                type="text"
                                name="title"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title || ""}
                                onBlur={() => setIsTitleEditing(false)}
                                className="w-[300px]"
                              />
                            ) : (
                              <p>{title}</p>
                            )}
                          </span>
                        )}
                      </div>
                      <button className="appearance-none h-12 w-12">
                        <span
                          className={`${
                            isTitleEditing
                              ? "block  cursor-pointer text-teal-500 transition-all hover:text-teal-600 h-12 w-12"
                              : "hidden"
                          }`}
                          onClick={handleSave}
                        >
                          <Accept />
                        </span>
                        <span
                          className={`${isTitleEditing ? "hidden" : "block"}`}
                          onClick={handleTitleEditClick}
                        >
                          <Edit />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className=" px-4 dark:text-slate-300 text-slate-700 mt-2 md:mt-0 w-full">
                    <div className="flex items-center text-2xl ">
                      <div className="px-4 dark:text-slate-300 text-slate-700 mt-2 md:mt-0 w-full">
                        {fetching ? (
                          <SkeletonText width="100%" height="120px" />
                        ) : (
                          <div className="flex items-center text-2xl">
                            <div className="overflow-hidden text-ellipsis text-justify whitespace-wrap text-sm text-wrap w-full">
                              {isDescriptionEditing ? (
                                <textarea
                                  name="description"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                  value={description || ""}
                                  onBlur={() => setIsDescriptionEditing(false)}
                                  className="w-full h-[120px] resize-none border text-justify rounded p-2"
                                />
                              ) : (
                                <p className="w-full">{description}</p>
                              )}
                            </div>
                            <button className="appearance-none text-green-500">
                              <span
                                className={`${
                                  isDescriptionEditing
                                    ? "block  cursor-pointer text-teal-500 transition-all hover:text-teal-600 h-12 w-12"
                                    : "hidden"
                                }`}
                                onClick={handleSave}
                              >
                                <Accept />
                              </span>
                              <span
                                className={`${
                                  isDescriptionEditing ? "hidden" : "block"
                                }`}
                                onClick={handleDescriptionEditClick}
                              >
                                <Edit />
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0 ">
            <div className="p-5 md:p-8">
              <div className="grid grid-cols-1 gap-5 items-center md:grid-cols-5 relative">
                <div className="md:col-span-2">
                  <div className="flex flex-row md:flex-col border-b col-span-2 md:border-b-0 md:border-l border-slate-700 justify-center items-center gap-2 w-full text-slate-400 ">
                    <div className="flex justify-center  items-end mb-2 text-sky-500">
                      <label
                        htmlFor="category"
                        className="flex flex-col gap-y-2 "
                      >
                        دسته‌بندی
                        {/* <Controller
                          control={control}
                          name="category"
                          rules={{ required: "انتخاب دسته‌بندی الزامی است" }}
                          render={({ field: { onChange, value } }) => (
                            <SearchableDropdown
                              items={categoryOptions}
                              handleSelect={onChange}
                              value={fetchData?.data?.category?._id}
                              sendId={true}
                              isReadOnly={isCategoryEditing}
                              errors={errors.category}
                              placeholder="یک دسته‌بندی انتخاب کنید"
                              className={"w-[300px]"}
                            />
                          )}
                        /> */}
                      </label>
                      <button
                        className="appearance-none w-9 h-9"
                        onClick={handleCategoryEditClick}
                      >
                        <Edit />
                      </button>
                    </div>
                  </div>
                </div>

                {/* تگ‌ها که 3 ستون از 5 ستون را اشغال می‌کنند */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-slate-400 md:col-span-3">
                  <div className="text-left">
                    {/* نمایش تگ‌ها */}
                    {fetchData?.data?.tags?.length > 0
                      ? fetchData.data.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="line-clamp-1 cursor-pointer rounded-lg border border-green-700/5 dark:border-blue-500/5 bg-green-800/5 dark:bg-blue-500/5 px-2 py-0 text-green-500 dark:text-blue-500 transition-colors hover:border-green-700/10 dark:hover:border-blue-500/10 hover:bg-green-700/10 dark:hover:bg-blue-500/10 flex items-center gap-x-1 hover:!opacity-100 group-hover:opacity-70 text-sm"
                          >
                            <MdOutlineTag />
                            {tag.title} {/* Access the title of the tag */}
                          </span>
                        ))
                      : "ندارد"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-slate-700 dark:bg-slate-800 bg-white shadow-sm rounded-xl md:border-x mt-4 md:mx-0">
            <div className="flex flex-col justify-center bg-white dark:text-blue-100 dark:bg-slate-800">
              <div data-theme="teal">
                <section className="font-sans text-black">
                  <div className="[ lg:flex justify-between lg:items-center ] [ fancy-corners fancy-corners--large fancy-corners--top-left fancy-corners--bottom-right ]">
                    <div className="flex-shrink-0 lg:w-1/2 self-stretch justify-between sm:flex-basis-40 md:flex-basis-50 xl:flex-basis-60">
                      <div className="h-full relative">
                        <article className="h-full">
                          <div className="h-full relative">
                            {fetchData?.data?.featuredImage ? (
                              fetchData?.data?.featuredImage.type ===
                              "image" ? (
                                <Image
                                className="h-full object-cover rounded-t-lg sm:rounded-r-lg sm:rounded-t-none sm:rounded-tr-lg"
                                src={fetchData?.data?.featuredImage?.url}
                                alt="Description of the image"
                                width={600}
                                height={400} // ارتفاع را طبق نیاز تنظیم کنید
                              />
                              ) : (
                                <div className="flex justify-start">
                                  <video
                                    src={fetchData?.data?.featuredImage.url}
                                    controls
                                    className="w-full h-full object-cover lg:rounded-lg"
                                  />
                                </div>
                              )
                            ) : (
                              <div className="h-[300px] w-full bg-gray-300 animate-pulse rounded-t-lg sm:rounded-r-lg sm:rounded-t-none sm:rounded-tr-lg" />
                            )}
                          </div>
                        </article>
                      </div>
                    </div>
                    <div
                      className="p-6 bg-grey lg:w-1/2"
                      onClick={handleContentEditClick}
                    >
                      <Edit />
                      <div className="leading-relaxed inline-flex overflow-y-auto max-h-60 overflow-hidden">
                        {content ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: content
                            }}
                          ></div>
                        ) : (
                          <SkeletonText lines={22} />
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <div className="border-y border-slate-700 bg-white dark:bg-slate-800 shadow-sm md:rounded-xl md:border-x">
            <div className="p-5 md:p-8">
              <div className="overflow-x-auto">
                <table className="min-w-full text-right text-sm  text-slate-500 dark:text-slate-400">
                  <thead className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 ">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-40 font-medium">
                        عنوان
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        مقدار
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-200 dark:border-slate-600">
                      <td className="py-3 text-sky-500">اسلاگ</td>
                      <td className="px-6 py-3 flex items-center gap-1">
                        <span>{fetchData?.data?.slug}</span>
                        <span>
                          <Edit />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-600">
                      <td className="py-3 text-sky-500">آدرس اصلی</td>
                      <td className="px-6  py-3 flex items-center gap-1 ">
                        <span dir="ltr" className="text-left">
                          {fetchData?.data?.canonicalUrl
                            ? decodeURIComponent(fetchData.data.canonicalUrl)
                            : ""}
                        </span>
                        <span>
                          <Edit />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-600">
                      <td className="py-3 text-sky-500">عنوان متا</td>
                      <td className="px-6 py-3 flex items-center gap-1">
                        <span>{fetchData?.data?.metaTitle}</span>
                        <span>
                          <Edit />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-600">
                      <td className="py-3 text-sky-500">توضیحات متا</td>
                      <td className="px-6 py-3 text-justify flex items-center gap-1">
                        <span>{fetchData?.data?.metaDescription}</span>
                        <span>
                          <Edit />
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-600">
                      <td className="py-3 text-sky-500">کلمات کلیدی متا</td>
                      <td className="px-6 py-3 flex items-center gap-1">
                        <span>{fetchData?.data?.metaKeywords}</span>
                        <span>
                          <Edit />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ControlPanel>
      {isModalOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-opacity-70 transition-all ease-in-out duration-500"
          style={{
            transform: "translateY(0)",
            opacity: 1
          }}
        >
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1),0_-4px_6px_rgba(0,0,0,0.1)]">
            <div className="flex justify-around items-center">
              {user?.role === "superAdmin" ? (
                <>
                  <div>
                    <button
                      onClick={handleApprove}
                      className="group w-[150px] py-2 rounded-md apply-button"
                    >
                      <Apply />
                      <span className="mr-2">تایید</span>
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={handleReject}
                      className="group border reject-button w-[150px]"
                    >
                      <Reject />
                      <span className="mr-2">رد</span>
                    </button>
                  </div>
                </>
              ) : user?.role === "admin" ? (
                <div>
                  <button
                    onClick={handleReview}
                    className="group w-[150px] py-2 rounded-md apply-button"
                  >
                    <Apply />
                    <span className="mr-2">تایید</span>
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onDelete={handleDelete}
          onClose={closeDeleteModal}
          message={`آیا مطمئن هستید که می‌خواهید پست "${title}" را حذف کنید؟`} 
        />
      )}

      <Modal isOpen={isEditorOpen} onClose={closeModal} className="h-[90vh]">
        <RTEditor
          value={content}
          onChange={(value) => {
            setContent(value);
          }}
        />
        <div className="text-right mt-4">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSaveContent}
          >
            ذخیره و بستن
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Info;
