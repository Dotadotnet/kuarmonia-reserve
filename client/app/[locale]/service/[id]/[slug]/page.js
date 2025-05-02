import ServiceContent from "@/components/shared/content/service/ServiceContent";
import Main from "@/layouts/Main";
import "./Style.css";
const ServicePost = async ({ params }) => {
  const { id, locale } = params;
  const api = `${process.env.NEXT_PUBLIC_API}/service/get-service/${id}`;
  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["service", `service/${id}`] },
    headers: {
      "Accept-Language": locale
    }
  });
  const res = await response.json();
  const service = res.data;
  console.log(service);
  return (
    <Main>
      <div className="   px-4 py-12">
        <ServiceContent service={service} />
      </div>
    </Main>
  );
};

export default ServicePost;
