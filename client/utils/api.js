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
   
   try {
      let res = await fetch(process.env.NEXT_PUBLIC_API + uri, options);
      
      // Check if the response is successful
      if (!res.ok) {
         console.error(`API request failed with status ${res.status}: ${res.statusText}`);
         console.error(`Requested URL: ${process.env.NEXT_PUBLIC_API + uri}`);
         // Return a default empty structure to prevent destructuring errors
         return {
            banner: [],
            service: [],
            rent: [],
            opportunity: [],
            news: [],
            visa: [],
            blog: [],
            property: []
         };
      }
      
      // Check content type before parsing
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
         console.error('API response is not JSON:', contentType);
         // Return a default empty structure to prevent destructuring errors
         return {
            banner: [],
            service: [],
            rent: [],
            opportunity: [],
            news: [],
            visa: [],
            blog: [],
            property: []
         };
      }
      
      let data = await res.json();
      return data.data;
   } catch (error) {
      console.error('API request failed:', error);
      // Return a default empty structure to prevent destructuring errors
      return {
         banner: [],
         service: [],
         rent: [],
         opportunity: [],
         news: [],
         visa: [],
         blog: [],
         property: []
      };
   }
}