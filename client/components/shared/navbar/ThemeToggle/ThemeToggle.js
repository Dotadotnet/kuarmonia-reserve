"use client";

import React, { useEffect, useState } from "react";
import { Crisp } from "crisp-sdk-web";
export default function ThemeToggle() {
  // Crisp.configure("96c59817-5fcc-48e1-a63c-6f947cf5cee9");

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  const changeCurrentTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.add('[&_*]:!transition-none');
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      Crisp.setColorTheme("green")
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      Crisp.setColorTheme("blue")
      document.documentElement.style.colorScheme = 'dark';
    }

    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none');
    }, 1);

    return () => clearTimeout(timeout);
  }, [theme]);

  return (
    <div className="flex justify-center">
      <input
        type="checkbox"
        name="light-switch"
        id="light-switch"
        className="light-switch sr-only"
        checked={theme === "light"}
        onChange={() => changeCurrentTheme(theme === "light" ? "dark" : "light")}
      />
      <label
        className="p-2 cursor-pointer rounded-secondary  dark:bg-slate-800 bg-slate-100  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        htmlFor="light-switch"
      >
        <svg
          className="dark:hidden"
          width="24px"
          height="24px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <title>sun</title>{" "}
            <g
              id="Page-1"    
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              {" "}
              <g
                id="Combined-Shape"
                fill="#000000"
                transform="translate(21.333333, 21.333333)"
              >
                {" "}
                <path d="M256,384 L256,469.333333 L213.333333,469.333333 L213.333333,384 L256,384 Z M355.346224,325.176335 L415.686003,385.516113 L385.516113,415.686003 L325.176335,355.346224 L355.346224,325.176335 Z M113.987109,325.176335 L144.156999,355.346224 L83.81722,415.686003 L53.6473307,385.516113 L113.987109,325.176335 Z M234.666667,118.01971 C299.089002,118.01971 351.313623,170.244331 351.313623,234.666667 C351.313623,299.089002 299.089002,351.314049 234.666667,351.314049 C203.711846,351.372867 174.007802,339.102338 152.119399,317.213934 C130.230995,295.325531 117.960466,265.621487 118.019285,234.666667 C118.019285,170.244331 170.244331,118.01971 234.666667,118.01971 Z M234.666667,160.686377 C193.808416,160.686377 160.685951,193.808546 160.685951,234.748031 C160.648688,254.358867 168.422443,273.1772 182.289288,287.044045 C196.156133,300.91089 214.974466,308.684645 234.666667,308.647305 C275.524788,308.647305 308.646957,275.524917 308.646957,234.666667 C308.646957,193.808481 275.524853,160.686377 234.666667,160.686377 Z M469.333333,213.333333 L469.333333,256 L384,256 L384,213.333333 L469.333333,213.333333 Z M85.3333333,213.333333 L85.3333333,256 L3.55271368e-15,256 L3.55271368e-15,213.333333 L85.3333333,213.333333 Z M83.81722,53.6473307 L144.156999,113.987109 L113.987109,144.156999 L53.6473307,83.81722 L83.81722,53.6473307 Z M385.516113,53.6473307 L415.686003,83.81722 L355.346224,144.156999 L325.176335,113.987109 L385.516113,53.6473307 Z M256,9.68506364e-12 L256,85.3333333 L213.333333,85.3333333 L213.333333,9.6772259e-12 L256,9.68506364e-12 Z">
                  {" "}
                </path>{" "}
              </g>{" "}
            </g>{" "}
          </g>
        </svg>
        <svg
          className="dark:block hidden"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 20 20"
        >
          <g fill="currentColor">
            <path
              d="M12.612 3.474a5 5 0 0 0-2.887 3.55a5.005 5.005 0 0 0 3.85 5.94A5 5 0 0 0 19 10.47c.245-.447.923-.285.939.224a8.5 8.5 0 0 1-.184 2.047c-.978 4.6-5.493 7.538-10.085 6.562S2.15 13.806 3.127 9.206c.92-4.326 4.99-7.22 9.345-6.686c.504.062.605.75.14.954"
              opacity="0.2"
            />
            <path
              fillRule="evenodd"
              d="M8.275 6.024a5 5 0 0 1 2.887-3.55c.465-.205.364-.892-.14-.954C6.667.986 2.597 3.88 1.677 8.206c-.977 4.6 1.952 9.12 6.544 10.097c4.592.976 9.107-1.962 10.085-6.562a8.6 8.6 0 0 0 .184-2.047c-.016-.509-.694-.671-.939-.224a5 5 0 0 1-5.427 2.494a5.005 5.005 0 0 1-3.849-5.94m-5.62 2.39a7.52 7.52 0 0 1 6.618-5.923c-.989.844-1.694 2-1.976 3.325a6.005 6.005 0 0 0 4.62 7.126a6 6 0 0 0 5.446-1.584l-.035.175c-.863 4.06-4.847 6.653-8.899 5.792c-4.051-.862-6.636-4.85-5.773-8.91"
              clipRule="evenodd"
            />
          </g>
        </svg>
        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
