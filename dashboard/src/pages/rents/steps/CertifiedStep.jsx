import { FiPlus } from "react-icons/fi";
import SocialLinksInput from "@/components/shared/input/SocialLinksInput";
import ArrayInput from "@/components/shared/tools/ArrayInput";
import MultiSelect from "@/components/shared/dropDown/MultiSelect";
import { useMemo } from "react";
import { useGetTagsQuery } from "@/services/tag/tagApi";
import { Controller } from "react-hook-form";
import Tag from "@/components/icons/Tag";

const CertifiedStep = ({
  control,
  register,
  socialLinksData,
  setSocialLinksData,
  information,
  setInformation,
  errors
}) => {
  const {
    isLoading: fetchingTags,
    data: fetchTagsData,
    error: fetchTagsError
  } = useGetTagsQuery({
    page: 1,
    limit: Infinity,
    status: "all",
    search: ""
  });
  const tags = useMemo(
    () =>
      fetchTagsData?.data?.map((tag) => ({
        id: tag._id,
        value: tag.translations[0].translation?.fields.title,
        label: tag.title,
        about: tag.about
      })),
    [fetchTagsData]
  );

  return (
    <>
      <div className="flex flex-col gap-y-4 max-h-96 overflow-y-auto p-2">
        <div className="flex flex-col gap-y-2 w-full  ">
          <div className="flex-1 flex items-center justify-between gap-2 gap-y-2 w-full">
            <div className="flex flex-col flex-1">
              <label htmlFor="tags" className="flex flex-col gap-y-2 ">
                تگ‌ها
                <Controller
                  control={control}
                  name="tags"
                  rules={{ required: "انتخاب تگ الزامی است" }}
                  render={({ field: { onChange, value } }) => (
                    <MultiSelect
                      items={tags}
                      selectedItems={value || []}
                      handleSelect={onChange}
                      icon={<Tag />}
                      placeholder="چند مورد انتخاب کنید"
                      className={"w-full h-12"}
                      returnType="id"
                    />
                  )}
                />
              </label>
            </div>
            <div className="mt-7 flex justify-start">
              <button
                type="button"
                className="p-2 bg-green-400 dark:bg-blue-600 text-white rounded hover:bg-green-600 dark:hover:bg-blue-400 transition-colors"
                aria-label="افزودن تگ جدید"
              >
                <FiPlus className="w-8 h-8" />
              </button>
            </div>
          </div>
          {errors.tags && (
            <span className="text-red-500 text-sm">{errors.tags.message}</span>
          )}
        </div>
        <ArrayInput
          title="اطلاعات اضافی* "
          values={information}
          setValues={setInformation}
          namePrefix="information"
          register={register}
          errors={errors}
        />
        <SocialLinksInput
          socialLinksData={socialLinksData}
          setSocialLinksData={setSocialLinksData}
        />
      </div>
    </>
  );
};

export default CertifiedStep;
