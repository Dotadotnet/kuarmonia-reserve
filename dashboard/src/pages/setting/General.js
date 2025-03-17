export default function General() {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">تنظیمات عمومی</h1>
        <form>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">عنوان سایت</label>
            <input
              type="text"
              name="siteTitle"
              className="w-full border p-2 rounded"
            />
          </div>
  
          <div className="mb-4">
            <label className="block mb-2 font-semibold">توضیحات سایت</label>
            <textarea
              name="siteDescription"
              className="w-full border p-2 rounded"
            />
          </div>
  
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            ذخیره تنظیمات
          </button>
        </form>
      </div>
    );
  }
  