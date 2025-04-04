import { useState, useEffect } from 'react';

const ToggleThemeButton = () => {
  // حالت اولیه را بر اساس localStorage تنظیم کنید
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('isDark');
    return savedTheme !== null ? savedTheme === 'true' : false; 
  });

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      localStorage.setItem('isDark', newTheme); 
      document.body.classList.toggle('dark', newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <label className="relative justify-end lg:col-span-1 inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isDark}
        onChange={toggleTheme}
        className="peer sr-only "
      />
      <div className={`flex h-7 w-14 mx-2 items-center rounded-full bg-blue-100 px-1 transition-colors ${isDark ? 'bg-gray-700' : 'bg-blue-100'} relative`}>
        <div
          className={`absolute top-0 left-0 inline-flex items-center justify-center w-7 h-7 transition-all duration-150 transform scale-110 rounded-full text-gray-500 dark:text-gray-400 bg-white focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 ${isDark ? 'bg-gray-900 translate-x-7' : 'translate-x-0'}`}
        >
          <div className="flex relative items-center justify-center">
            <div className={`absolute transition-opacity z-50 duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12M11 1h2v3h-2zm0 19h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636L5.636 7.05zM16.95 18.364l1.414-1.414l2.121 2.121l-1.414 1.414zm2.121-14.85l1.414 1.415l-2.121 2.121l-1.414-1.414zM5.636 16.95l1.414 1.414l-2.121 2.121l-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z" />
              </svg>
            </div>

            <div className={`absolute transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 20 20">
                <g fill="currentColor">
                  <path d="M12.612 3.474a5 5 0 0 0-2.887 3.55a5.005 5.005 0 0 0 3.85 5.94A5 5 0 0 0 19 10.47c.245-.447.923-.285.939.224a8.5 8.5 0 0 1-.184 2.047c-.978 4.6-5.493 7.538-10.085 6.562S2.15 13.806 3.127 9.206c.92-4.326 4.99-7.22 9.345-6.686c.504.062.605.75.14.954" opacity="0.2" />
                  <path fillRule="evenodd" d="M8.275 6.024a5 5 0 0 1 2.887-3.55c.465-.205.364-.892-.14-.954C6.667.986 2.597 3.88 1.677 8.206c-.977 4.6 1.952 9.12 6.544 10.097c4.592.976 9.107-1.962 10.085-6.562a8.6 8.6 0 0 0 .184-2.047c-.016-.509-.694-.671-.939-.224a5 5 0 0 1-5.427 2.494a5.005 5.005 0 0 1-3.849-5.94m-5.62 2.39a7.52 7.52 0 0 1 6.618-5.923c-.989.844-1.694 2-1.976 3.325a6.005 6.005 0 0 0 4.62 7.126a6 6 0 0 0 5.446-1.584l-.035.175c-.863 4.06-4.847 6.653-8.899 5.792c-4.051-.862-6.636-4.85-5.773-8.91" clipRule="evenodd" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </label>
  );
};

export default ToggleThemeButton;
