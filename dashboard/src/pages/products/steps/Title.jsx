import React ,{useEffect ,useMemo} from "react";
import NavigationButton from "@/components/shared/button/NavigationButton";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { toast } from "react-hot-toast";

const TitleStep = ({ register, errors, prevStep, nextStep }) => {
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError,
  } = useGetCategoriesQuery();

  const categories = useMemo(
    () => fetchCategoriesData?.data || [],
    [fetchCategoriesData]
  );
  useEffect(() => {
  
    if (fetchingCategories) {
      toast.loading("در حال دریافت دسته بندی ...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.description, {
        id: "fetchCategories",
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.description, {
        id: "fetchCategories",
      });
    }
  }, [

    fetchingCategories,
    fetchCategoriesData,
    fetchCategoriesError,
  ]);
  return (
    <>
    <div className="flex flex-col border rounded p-4">

      <label htmlFor="title" className="flex flex-col gap-y-1">
        <span className="text-sm"> عنوان *</span>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", {
            required: "وارد کردن عنوان الزامی است",
            minLength: {
              value: 3,
              message: "عنوان باید حداقل ۳ حرف داشته باشد",
            },
            maxLength: {
              value: 30,
              message: "عنوان نباید بیشتر از ۳۰ حرف باشد",
            },
          })}
          placeholder="عنوان"
          maxLength="30"
          className="p-2 rounded border "
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </label>
      <label htmlFor="summary" className="flex flex-col gap-y-1">
        <span className="text-sm"> خلاصه *</span>
        <input
          type="text"
          name="summary"
          id="summary"
          {...register("summary", {
            required: "وارد کردن خلاصه الزامی است",
            minLength: {
              value: 15,
              message: "خلاصه باید حداقل ۱۵ کاراکتر داشته باشد",
            },
            maxLength: {
              value: 50,
              message: "خلاصه نباید بیشتر از 50 کاراکتر باشد",
            },
        })}
          placeholder="خلاصه"
          maxLength="50"
          className="p-2 rounded border "
        />
        {errors.summary && (
          <span className="text-red-500 text-sm">{errors.summary.message}</span>
        )}
      </label>
      <label htmlFor="description" className="w-full flex flex-col gap-y-1">
        <span className="text-sm"> توضیحات *</span>
        <textarea
          name="description"
          id="description"
          rows="4"
          maxLength="500"
          {...register("description", {
            required: "وارد کردن خلاصه الزامی است",
            minLength: {
              value: 50,
              message: "توضیحات باید حداقل ۵۰ کاراکتر باشد",
            },
            maxLength: {
              value: 500,
              message: "توضیحات نباید بیشتر از ۵۰۰ کاراکتر باشد",
            },
          })}
          required
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </label>
      </div>

      <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {/* category */}
          <label htmlFor="category" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">دسته بندی*</span>
            {fetchingCategories ? (
              <p className="text-sm">در حال دریافت ...</p>
            ) : (
              <select
                name="category"
                id="category"
                {...register("category", {
                  required: "وارد کردن عنوان الزامی است",
                  minLength: {
                    value: 3,
                    message: "عنوان باید حداقل ۳ حرف داشته باشد",
                  },
                  maxLength: {
                    value: 30,
                    message: "عنوان نباید بیشتر از ۳۰ حرف باشد",
                  },
                })}
                className="w-full"
                required
              >
               
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
             {errors.category && (
          <span className="text-red-500 text-sm">{errors.category.message}</span>
        )}
          </label>
         
        
        </div>
      <div className="flex justify-between mt-12">
        <NavigationButton direction="next" onClick={nextStep} />

        <NavigationButton direction="prev" onClick={prevStep} />
      </div>
    </>
  );
};

export default TitleStep;
