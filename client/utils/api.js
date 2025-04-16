
export default async function Api(api){
   let res = await fetch(process.env.API + api);
   let data = await res.json();
   
   return data.data;
}