import React from "react";

const Sidebar = () => {
  return (
    <aside className="space-y-6 mt-16">
      {/* آخرین اخبار */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold text-lg mb-2">آخرین اخبار</h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
          <li><a href="#" className="hover:text-blue-500">خبر ۱</a></li>
          <li><a href="#" className="hover:text-blue-500">خبر ۲</a></li>
          <li><a href="#" className="hover:text-blue-500">خبر ۳</a></li>
        </ul>
      </section>

      {/* تبلیغات */}
      <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
        <h3 className="font-semibold text-lg mb-2">تبلیغات</h3>
        <div className="space-y-3">
          <img src="/ads/ad1.jpg" alt="ad1" className="w-full rounded" />
          <img src="/ads/ad2.jpg" alt="ad2" className="w-full rounded" />
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
