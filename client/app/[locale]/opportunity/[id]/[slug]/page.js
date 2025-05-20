import OpportunityContent from "@/components/shared/content/opportunity/OpportunityContent";
import Main from "@/layouts/Main";
import Sidebar from "./Sidebar";
import "./Style.css";

const OpportunityPost = async ({ params }) => {
  // Ensure params is awaited
  const { id, locale } = await params; // Await the params

  const api = `${process.env.NEXT_PUBLIC_API}/opportunity/get-opportunity/${id}`;

  const response = await fetch(api, {
    cache: "no-store",
    next: { tags: ["opportunity", `opportunity/${id}`] },
    headers: {
      "Accept-Language": locale
    }
  });

  const res = await response.json();
  const opportunity = res.data;

  const directionClass = locale === "fa" ? "rtl" : "ltr";

  return (
    <Main>
      <div
        className={`grid grid-cols-1  h-full md:pt-20 lg:grid-cols-3 gap-6 ${directionClass} md:px-4 pt-20`}
      >
        <div className="lg:col-span-3">
          <OpportunityContent opportunity={opportunity} />
        </div>
        
      </div>
    </Main>
  );
};

export default OpportunityPost;
