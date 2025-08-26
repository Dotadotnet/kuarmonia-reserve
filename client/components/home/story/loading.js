import React from "react";

function loading() {
  return (
    <div>
      {" "}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col overflow-x-auto scrollbar-hide items-center ">
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
          <div className="w-16 h-4 bg-gray-300 mt-2 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

export default loading;
