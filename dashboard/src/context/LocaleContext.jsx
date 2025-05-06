import React, { createContext, useState, useEffect } from "react";

const LocaleContext = createContext();

export const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState("fa"); // مقدار پیش‌فرض fa

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") || "fa"; // اگر کوکی یا لوکال استوریج بود
    setLocale(savedLocale);
  }, []);

  const changeLocale = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale); // ذخیره کردن زبان انتخاب‌شده در لوکال استوریج
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => React.useContext(LocaleContext);
