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

async function translateHTMLContent(html, lang) {
  const $ = cheerio.load(html, { decodeEntities: false });

  async function translateNode(node) {
    if (node.type === "text") {
      const original = node.data.trim();
      if (original) {
        try {
          const chunks = splitText(original);
          const translatedChunks = await Promise.all(
            chunks.map(async (chunk) => {
              const result = await translate(chunk, { to: lang });
              return result.text;
            })
          );
          node.data = translatedChunks.join(" "); // بازگشت به متن ترجمه‌شده
        } catch (err) {
          console.error("خطا در ترجمه:", err.message);
        }
      }
    } else if (node.type === "tag") {
      for (const child of node.children || []) {
        await translateNode(child); // ادامه پردازش فرزندان
      }
    }
  }

  const body = $("body").length ? $("body")[0] : $.root()[0];
  for (const node of body.children) {
    await translateNode(node); // ترجمه هر گره
  }

  return $.html(); // HTML ترجمه‌شده
}

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
  translations["fa"] = { fields: {} };

  // پردازش فیلدهای مختلف
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

    // ترجمه رشته‌های ساده
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

    // ترجمه آرایه‌های رشته‌ای
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

    // ترجمه آرایه‌های شیء
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

    for (const field of longTextFields) {
      const value = data[field];
      if (typeof value === "string") {
        try {
          const translatedHTML = await translateHTMLContent(value, lang); // 👉 فقط یک بار صدا زده می‌شه
          translations[lang].fields[field] = translatedHTML;
        } catch (err) {
          throw new Error(`خطا در ترجمه متن بلند "${field}" به ${lang}: ${err.message}`);
        }
      }
    }
    }

  return translations;
};

module.exports = translateFields;
