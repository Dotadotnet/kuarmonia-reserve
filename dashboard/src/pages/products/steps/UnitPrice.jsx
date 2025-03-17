import React from "react";
import Dropdown from "@/components/shared/dropDown/Dropdown";
import { Controller } from "react-hook-form";
import Trash from "@/components/icons/Trash";
import NumberToPersianWord  from "number_to_persian_word";

const UnitPrice = ({ control, index, remove, errors, units }) => {
  return (
    <div className="flex flex-col gap-y-1 w-full border rounded p-4">
      <div className="grid items-center grid-cols-12 gap-x-2">
        {/* انتخاب واحد */}
        <div className="col-span-7">
          <span>یک واحد انتخاب کنید</span>
          <Controller
            control={control}
            name={`variations.${index}.unit`}
            defaultValue=""
            rules={{ required: "انتخاب واحد الزامی است" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                items={units.map((unit) => ({
                  id: unit._id,
                  value: unit.title,
                  description: unit.description,
                }))}
                placeholder="انتخاب واحد"
                value={value}
                onChange={onChange}
                sendId={true} // تغییر به true
                className="w-full"
                error={errors?.variations?.[index]?.unit}
              />
            )}
          />
        </div>

        {/* قیمت واحد */}
        <div className="col-span-5">
          <span>قیمت واحد انتخابی</span>
          <div className="flex flex-row">
            <Controller
              control={control}
              name={`variations.${index}.price`}
              rules={{
                required: "وارد کردن قیمت الزامی است",
                min: { value: 1, message: "قیمت باید بزرگتر از ۰ باشد" },
              }}
              render={({ field: { onChange, value } }) => (
                <input
                  type="number"
                  inputMode="numeric"
                  value={value || ""}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    if (!isNaN(rawValue) && rawValue !== "") {
                      onChange(Number(rawValue)); // مقدار را عددی ذخیره کن
                    }
                  }}
                  className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                  placeholder="قیمت را وارد کنید..."
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* قیمت به تومان (حروفی) */}
      <div className="col-span-12 mt-2">
        <div className="flex flex-row">
          <Controller
            control={control}
            name={`variations.${index}.price`}
            render={({ field: { value } }) => (
              <span className="text-green-600 text-sm">
               {"معادل : "} 
                <span className="text-red-600">
               {NumberToPersianWord.convert((value || 0) / 10)} تومان

                </span>
                {/* تبدیل قیمت به تومان و حروف فارسی */}
              </span>
            )}
          />
        </div>
      </div>

      {/* اضافه کردن فیلدهای stock و lowStockThreshold */}
      <div className="grid items-center grid-cols-12 gap-x-2 mt-4">
        {/* تعداد موجودی */}
        <div className="col-span-7">
          <span>تعداد موجودی</span>
          <Controller
            control={control}
            name={`variations.${index}.stock`}
            rules={{
              required: "تعداد موجودی الزامی است",
              min: { value: 0, message: "موجودی نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue)); // مقدار را عددی ذخیره کن
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="تعداد موجودی را وارد کنید..."
              />
            )}
          />
        </div>

        {/* حد آستانه موجودی */}
        <div className="col-span-5">
          <span>حد آستانه موجودی</span>
          <Controller
            control={control}
            name={`variations.${index}.lowStockThreshold`}
            rules={{
              required: "حد آستانه موجودی الزامی است",
              min: { value: 0, message: "حد آستانه نمی‌تواند منفی باشد" },
            }}
            render={({ field: { onChange, value } }) => (
              <input
                type="number"
                inputMode="numeric"
                value={value || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  if (!isNaN(rawValue) && rawValue !== "") {
                    onChange(Number(rawValue)); // مقدار را عددی ذخیره کن
                  }
                }}
                className="flex-1 rounded border px-2 py-1 h-10 w-full text-left"
                placeholder="حد آستانه موجودی را وارد کنید..."
              />
            )}
          />
        </div>
      </div>
      <button
        type="button"
        className="p-1 rounded"
        onClick={() => remove(index)}
      >
        <Trash className="w-6 h-6 text-gray-500 hover:text-red-500" />
      </button>

      {/* نمایش پیام خطا */}
      {errors.variations?.[index]?.unit && (
        <span className="text-red-500 text-sm">
          {errors.variations[index].unit.message}
        </span>
      )}
      {errors.variations?.[index]?.price && (
        <span className="text-red-500 text-sm">
          {errors.variations[index].price.message}
        </span>
      )}
      {errors.variations?.[index]?.stock && (
        <span className="text-red-500 text-sm">
          {errors.variations[index].stock.message}
        </span>
      )}
      {errors.variations?.[index]?.lowStockThreshold && (
        <span className="text-red-500 text-sm">
          {errors.variations[index].lowStockThreshold.message}
        </span>
      )}
    </div>
  );
};

export default UnitPrice;
