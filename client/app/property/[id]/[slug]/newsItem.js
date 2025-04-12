// components/NewsItem.js
import React from 'react';

const NewsItem = ({ image, date, title }) => {
  return (
    <div className="flex items-start mb-3 pb-3 rtl">
      <a href="#" className="inline-block">
        <div
          className="w-20 h-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      </a>
      <div className="text-sm w-2/3">
        <p className="text-gray-600 text-xs">{date}</p>
        <a href="#" className="text-gray-900 font-medium hover:text-indigo-600 leading-none">
          {title}
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
