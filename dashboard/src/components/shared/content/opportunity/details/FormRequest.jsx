import React from "react";

export default function FormRequest() {
  return (
    <section className="flex flex-col p-4">
      <h4 className="text-xl  mb-4">درخواست پذیرش</h4>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto">
        {/* نام و ایمیل */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullname"
            className="text-sm font-medium text-gray-700"
          >
            نام و نام خانوادگی
          </label>
          <input
            id="fullname"
            type="text"
            placeholder="نام و نام خانوادگی"
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            ایمیل
          </label>
          <input
            id="email"
            type="email"
            placeholder="ایمیل"
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* وبسایت */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="website"
            className="text-sm font-medium text-gray-700"
          >
            وبسایت شما
          </label>
          <input
            id="website"
            type="text"
            placeholder="www.example.com"
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* مدارک */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="documents"
            className="text-sm font-medium text-gray-700"
          >
            مدارک
          </label>
          <input
            id="documents"
            title="مدارک"
            type="file"
            className="border border-gray-300 p-2 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            multiple
          />
        </div>

        {/* Coverletter */}
        <div className="md:col-span-2 flex flex-col gap-2">
          <label
            htmlFor="coverletter"
            className="text-sm font-medium text-gray-700"
          >
            توضیحات اضافه
          </label>
          <textarea
            id="coverletter"
            placeholder="متن توضیحی..."
            className="border border-gray-300 p-2 rounded h-28 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* دکمه تایید */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            پذیرش
          </button>
        </div>
      </form>
    </section>
  );
}
