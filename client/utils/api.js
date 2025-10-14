import { getLocale } from "next-intl/server";

export default async function Api(api, settings, langStatic) {
   let lang = await getLocale();
   if (langStatic) {
      lang = langStatic
   } else if (typeof settings == "string") {
      lang = settings
   }
   const host = process.env.NEXT_PUBLIC_API;
   let uri = api.replace(host, "")
   let options = {
      method: "GET",
      headers: {
         "lang": lang
      },
   }
   if (typeof settings == "object") {
      options = { ...options, ...settings }
   }
   let res = await fetch(process.env.NEXT_PUBLIC_API + uri, options);
   try {
      let data = await res.json();
      return data.data;
   } catch (error) {
      console.log(res);
   }
}
