module.exports = (req, res, next) => {
  // چک کردن هدر "accept-language" و گرفتن فقط بخش زبان
  const locale = req.headers["accept-language"]
      ? req.headers["accept-language"].split(",")[0].split("-")[0] // گرفتن فقط زبان
      : req.cookies["NEXT_LOCALE"] || "fa"; // اگر هدر نبود، از کوکی یا پیش‌فرض استفاده کن
  req.locale = locale;
  next();
};
