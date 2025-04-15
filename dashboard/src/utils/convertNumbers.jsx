export const toPersianNumbers = (str) => {
    // تبدیل ورودی به رشته و بررسی اینکه null یا undefined نباشد
    str = String(str || "");
    
    return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  };
  