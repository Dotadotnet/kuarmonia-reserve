const translate = async (text, { from = "fa", to = "en" } = {}) => {
  try {
    const response = await fetch("https://translate.argosopentech.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        q: text,
        source: from,
        target: to,
        format: "text"
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`ترجمه با خطا مواجه شد: ${errorData?.error || response.statusText}`);
    }

    const data = await response.json();
    return { text: data.translatedText };
  } catch (err) {
    throw new Error("Failed to fetch: " + err.message);
  }
};
export default translate;
