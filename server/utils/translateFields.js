const { translate } = require("google-translate-api-x");

const translateFields = async (
  data,
  { stringFields = [], arrayStringFields = [], arrayObjectFields = [] },
  languages = ["en", "tr", "ar"]
) => {
  const translations = {};

  for (const lang of languages) {
    translations[lang] = { fields: {} };

    // ترجمه فیلدهای متنی ساده
    for (const field of stringFields) {
      const value = data[field];
      if (typeof value === "string") {
        try {
          const result = await translate(value, { to: lang });
          console.log(`✅ ترجمه فیلد "${field}" به زبان ${lang}:`, result.text);
          translations[lang].fields[field] = result.text;
        } catch (err) {
          console.error(`❌ خطا در ترجمه فیلد "${field}" به زبان ${lang}: ${err.message}`);
          throw new Error(`خطا در ترجمه فیلد "${field}" به زبان ${lang}: ${err.message}`);
        }
      }
    }

    // ترجمه فیلدهای آرایه‌ای از رشته‌ها
    for (const field of arrayStringFields) {
      const value = data[field];
      if (Array.isArray(value)) {
        try {
          translations[lang].fields[field] = await Promise.all(
            value.map(async (item) => {
              if (typeof item === "string") {
                const result = await translate(item, { to: lang });
                console.log(`✅ ترجمه آیتم آرایه "${field}" به زبان ${lang}:`, result.text);
                return result.text;
              }
              return item; // اگر چیزی غیر از رشته بود، تغییر نکنه
            })
          );
        } catch (err) {
          console.error(`❌ خطا در ترجمه آرایه "${field}" به زبان ${lang}: ${err.message}`);
          throw new Error(`خطا در ترجمه آرایه "${field}" به زبان ${lang}: ${err.message}`);
        }
      }
    }

    // ترجمه فیلدهای آرایه‌ای از آبجکت‌ها
    for (const field of arrayObjectFields) {
      const value = data[field];
      if (Array.isArray(value)) {
        try {
          translations[lang].fields[field] = await Promise.all(
            value.map(async (item) => {
              if (item && typeof item === "object") {
                const translatedItem = {};
                for (const [key, val] of Object.entries(item)) {
                  if (typeof val === "string") {
                    try {
                      const result = await translate(val, { to: lang });
                      translatedItem[key] = result.text;
                    } catch (err) {
                      console.error(`❌ خطا در ترجمه فیلد "${key}" از آیتم آرایه "${field}" به زبان ${lang}: ${err.message}`);
                      throw err;
                    }
                  } else if (Array.isArray(val)) {
                    // اگر فیلدی خودش آرایه‌ای از رشته بود
                    translatedItem[key] = await Promise.all(
                      val.map(async (subItem) => {
                        if (typeof subItem === "string") {
                          const result = await translate(subItem, { to: lang });
                          return result.text;
                        }
                        return subItem;
                      })
                    );
                  } else {
                    translatedItem[key] = val; // بدون تغییر
                  }
                }
                return translatedItem;
              }
              return item;
            })
          );
        } catch (err) {
          console.error(`❌ خطا در ترجمه آرایه‌ی آبجکت "${field}" به زبان ${lang}: ${err.message}`);
          throw new Error(`خطا در ترجمه آرایه‌ی آبجکت "${field}" به زبان ${lang}: ${err.message}`);
        }
      }
    }
  }

  return translations;
};

module.exports = translateFields;
