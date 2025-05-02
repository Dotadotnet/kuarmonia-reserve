const { translate } = require("google-translate-api-x");
const cheerio = require("cheerio");

const MAX_CHUNK_SIZE = 4500;

const splitText = (text, max = MAX_CHUNK_SIZE) => {
  const parts = [];
  for (let i = 0; i < text.length; i += max) {
    parts.push(text.slice(i, i + max));
  }
  return parts;
};

const translateHTMLContent = async (html, lang) => {
  const $ = cheerio.load(html);

  // ذخیره figure‌ها و جایگزینی آن‌ها با placeholder
  const figures = [];
  $('figure.image').each((i, el) => {
    const placeholder = `[[FIGURE_IMAGE_${i}]]`;
    figures.push($(el).toString());
    $(el).replaceWith(placeholder);
  });

  // ترجمه‌ی نودهای متنی
  const translateTextNodes = async (node) => {
    for (let child of node.contents()) {
      if (child.type === 'text' && child.data.trim()) {
        try {
          const translated = await translate(child.data, { to: lang });
          child.data = translated.text;
        } catch (err) {
          console.error(`خطا در ترجمه متن: ${child.data}`, err.message);
        }
      } else if (child.type === 'tag') {
        await translateTextNodes($(child));
      }
    }
  };

  await translateTextNodes($.root());

  // برگرداندن تگ‌های figure به جای placeholderها
  let finalHTML = $.html();
  figures.forEach((fig, i) => {
    finalHTML = finalHTML.replace(`[[FIGURE_IMAGE_${i}]]`, fig);
  });

  return finalHTML;
};
const translateFields = async (
  data,
  {
    stringFields = [],
    arrayStringFields = [],
    arrayObjectFields = [],
    longTextFields = [],
  },
  languages = ["en", "tr"]
) => {
  const translations = {};

  // زبان فارسی به عنوان منبع
  translations["fa"] = { fields: {} };

  for (const field of stringFields) {
    if (typeof data[field] === "string") {
      translations["fa"].fields[field] = data[field];
    }
  }

  for (const field of arrayStringFields) {
    if (Array.isArray(data[field])) {
      translations["fa"].fields[field] = [...data[field]];
    }
  }

  for (const field of arrayObjectFields) {
    if (Array.isArray(data[field])) {
      translations["fa"].fields[field] = data[field].map((item) =>
        item && typeof item === "object" ? { ...item } : item
      );
    }
  }

  for (const field of longTextFields) {
    if (typeof data[field] === "string") {
      translations["fa"].fields[field] = data[field];
    }
  }

  // ترجمه به سایر زبان‌ها
  for (const lang of languages) {
    translations[lang] = { fields: {} };

    // Simple strings
    for (const field of stringFields) {
      const value = data[field];
      if (typeof value === "string") {
        try {
          const result = await translate(value, { to: lang });
          translations[lang].fields[field] = result.text;
        } catch (err) {
          throw new Error(`خطا در ترجمه فیلد "${field}" به ${lang}: ${err.message}`);
        }
      }
    }

    // Array of strings
    for (const field of arrayStringFields) {
      const value = data[field];
      if (Array.isArray(value)) {
        translations[lang].fields[field] = await Promise.all(
          value.map(async (item) =>
            typeof item === "string"
              ? (await translate(item, { to: lang })).text
              : item
          )
        );
      }
    }

    // Array of objects
    for (const field of arrayObjectFields) {
      const value = data[field];
      if (Array.isArray(value)) {
        translations[lang].fields[field] = await Promise.all(
          value.map(async (item) => {
            if (item && typeof item === "object") {
              const translatedItem = {};
              for (const [key, val] of Object.entries(item)) {
                if (typeof val === "string") {
                  translatedItem[key] = (await translate(val, { to: lang })).text;
                } else if (Array.isArray(val)) {
                  translatedItem[key] = await Promise.all(
                    val.map(async (subItem) =>
                      typeof subItem === "string"
                        ? (await translate(subItem, { to: lang })).text
                        : subItem
                    )
                  );
                } else {
                  translatedItem[key] = val;
                }
              }
              return translatedItem;
            }
            return item;
          })
        );
      }
    }

    // Long text fields with chunking and HTML translation
    for (const field of longTextFields) {
      const value = data[field];
      if (typeof value === "string") {
        try {
          const chunks = splitText(value);
          const translatedChunks = await Promise.all(
            chunks.map(async (chunk) => {
              const translatedChunk = await translateHTMLContent(chunk, lang); // استفاده از تابع ترجمه HTML
              return translatedChunk;
            })
          );
          translations[lang].fields[field] = translatedChunks.join(" ");
        } catch (err) {
          throw new Error(`خطا در ترجمه متن بلند "${field}" به ${lang}: ${err.message}`);
        }
      }
    }
  }

  return translations;
};

module.exports = translateFields;
