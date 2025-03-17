export default function SocialMedia() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">شبکه‌های اجتماعی</h2>
        <form>
          <div className="mb-4">
            <label className="block font-semibold mb-2">لینک اینستاگرام</label>
            <input
              type="url"
              className="w-full border rounded p-2"
              placeholder="https://instagram.com/yourprofile"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">لینک توییتر</label>
            <input
              type="url"
              className="w-full border rounded p-2"
              placeholder="https://twitter.com/yourprofile"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">لینک تلگرام</label>
            <input
              type="url"
              className="w-full border rounded p-2"
              placeholder="https://t.me/yourprofile"
            />
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ذخیره
          </button>
        </form>
      </div>
    );
  }
  