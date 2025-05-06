module.exports = (req, res, next) => {
  let locale =
    req.headers["x-lang"] ||
    (req.headers["accept-language"]
      ? req.headers["accept-language"].split(",")[0].split("-")[0]
      : "fa");

  console.log("req.headers[x-lang]:", req.headers["x-lang"]);
  console.log("locale:", locale);

  req.locale = locale;
  next();
};
