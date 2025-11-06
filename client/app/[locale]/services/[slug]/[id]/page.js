import ServiceContent from "@/components/shared/content/service/ServiceContent";


const ServicePost = async ({ params }) => {
  const { id, locale } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/service/get-serviceById/${id}`, {
    cache: "no-store",
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const service = res.data;
console.log(service)
  return (

    <ServiceContent service={service} />

  );
};

export default ServicePost;