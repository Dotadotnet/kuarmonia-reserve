import React, { useState, useEffect } from "react";

const ProgressBar = () => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setPercent(Math.round((winScroll / height) * 100));
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999] h-0.5 mt-0.5 bg-green-500 dark:bg-blue-500"
      style={{
        width: `${percent}%`,
        marginRight: `calc(100% - ${percent}%)` // نوار را به سمت راست فشار می‌دهد
      }}
    ></div>
  );
};

export default ProgressBar;
