import { getLocale } from "next-intl/server";

export default async function Api(api, lang = null) {
   let langDef = await getLocale();
   let langResult = lang ? lang : langDef ;
   const host = process.env.NEXT_PUBLIC_API;
   let uri = api.replace(host, "")   
   let res = await fetch(process.env.NEXT_PUBLIC_API + uri, {
      method: "GET",
      headers: {
         "lang": langResult
      },
   });
   let data = await res.json();
   return data.data;
}