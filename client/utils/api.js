import { getLocale } from "next-intl/server";

export default async function Api(api, settings) {
   let lang = await getLocale();
   const host = process.env.NEXT_PUBLIC_API;
   let uri = api.replace(host, "")
   let options = {
      method: "GET",
      headers: {
         "lang": lang
      },
   }
   if (settings) {
      options = { ...options, ...settings }
   }
   let res = await fetch(process.env.NEXT_PUBLIC_API + uri, options);
   let data = await res.json();
   return data.data;
}
