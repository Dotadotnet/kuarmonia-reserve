// translationUtils.js
const { translate } = require("google-translate-api-x");

const BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

async function generateSlug(title = "") {
  try {
    const res = await translate(title, { to: "en", client: "gtx" });
    const translatedTitle = res.text;
    return translatedTitle
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[\u200B-\u200D\uFEFF]/g, "")
      .replace(/[\s\ـ]+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9\-]/g, "")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  } catch (error) {
    console.error("Error in translation:", error);
    return ""; 
  }
}

function generateSeoFields({ title, summary = "", categoryTitle = "عمومی" }) {
  let metaTitle = `${title} | ${categoryTitle}`;
  if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 57) + "...";

  let metaDescription = `${summary} | ${categoryTitle}`;
  if (metaDescription.length > 160) metaDescription = metaDescription.substring(0, 157) + "...";

  return { metaTitle, metaDescription };
}

function encodeBase62(num) {
  if (num === 0) return BASE62_ALPHABET[0];

  let encoded = "";
  while (num > 0) {
    encoded = BASE62_ALPHABET[num % 62] + encoded;
    num = Math.floor(num / 62);
  }
  return encoded;
}

module.exports = {
  generateSlug,
  generateSeoFields,
  encodeBase62,
};
