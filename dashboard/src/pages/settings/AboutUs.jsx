export default function AboutUs() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">درباره ما</h2>
        <form>
          <div className="mb-4">
            <label className="block font-semibold mb-2">متن درباره ما</label>
            <textarea
              className="w-full border rounded p-2"
              rows="6"
              placeholder="توضیحات مربوط به بخش درباره ما را وارد کنید..."
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ذخیره
          </button>
        </form>
      </div>
    );
  }
  