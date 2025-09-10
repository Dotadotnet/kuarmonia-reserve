import { useState, useMemo } from "react";
import { useGetOpportunitiesQuery } from "@/services/opportunity/opportunityApi";
import { toast } from "react-hot-toast";
import Metrics from "@/components/shared/tools/Metrics";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import SkeletonItem from "@/components/shared/skeleton/SkeletonItem";
import Pagination from "@/components/shared/pagination/Pagination";
import { useSelector } from "react-redux";
import ControlPanel from "../ControlPanel";
import AddButton from "@/components/shared/button/AddButton";
import Search from "@/components/shared/search";
const Listopportunity = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;
  const [statusFilter, setStatusFilter] = useState("all");
  const admin = useSelector((state) => state?.auth?.admin);
  const { data, isLoading, error } = useGetOpportunitiesQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter === "all" ? undefined : statusFilter,
    adminId: admin?._id
  });
  const opportunities = useMemo(() => data?.data || [], [data]);

  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 1;
  return (
    <>
      <ControlPanel>
        <Search searchTerm={searchTerm} />
        <AddButton link={"./add"} />

        {!opportunities || opportunities.length === 0 || isLoading ? (
          <>
            {[1].map((i) => (
              <SkeletonItem key={i} repeat={5} />
            ))}
          </>
        ) : (
          opportunities?.length > 0 &&
          opportunities?.map((opportunity) => {
            const { title, summary } =
              opportunity?.translations?.[0]?.translation?.fields || {};
            return (
              <div
                key={opportunity._id}
                className="mt-4 grid grid-cols-12 rounded-xl cursor-pointer border border-gray-200 gap-2 dark:border-white/10 dark:bg-slate-800 bg-white px-2  transition-all dark:hover:border-slate-700 hover:border-slate-100 hover:bg-green-100 dark:hover:bg-slate-700 dark:text-white"
                onClick={() =>
                  router.push(`/dashboard/opportunities/info/${opportunity.id}`)
                }
              >
                <div className=" col-span-11 lg:col-span-3 text-center flex items-center">
                  <StatusIndicator isActive={opportunity.status === "active"} />
                  <div className=" py-2 flex flex-row gap-x-2 hover:text-white transition-colors rounded-full cursor-pointer  items-center">
                    {opportunity?.thumbnail ? (
                      <img
                        src={opportunity?.thumbnail?.url || "/placeholder.png"}
                        height={100}
                        width={100}
                        className="h-[60px] w-[60px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-[60px] w-[60px] rounded-full bg-gray-300 animate-pulse"></div> // Skeleton Loader
                    )}

                    <article className="flex-col flex gap-y-2  ">
                      <span className="line-clamp-1 text-base ">
                        <span className="hidden lg:flex">{title}</span>
                        <span className="flex lg:hidden text-right text-sm">
                          {title}
                        </span>
                      </span>
                      <span className="text-xs hidden lg:flex">
                        {new Date(opportunity.createdAt).toLocaleDateString(
                          "fa-IR"
                        )}
                      </span>
                      <span className="text-xs flex lg:hidden">
                        <Metrics
                          gap={3}
                          likeCount={30}
                          dislikeCount={20}
                          views={50}
                          rating={4.5}
                          iconSize={15}
                        />{" "}
                      </span>
                    </article>
                  </div>
                </div>

                <div className=" hidden lg:col-span-7 lg:flex text-center lg:first-letter:flex items-center">
                  <p className="text-gray-500 dark:text-gray-300">{summary}</p>
                </div>
                
                <div className="hidden lg:col-span-2 gap-2 text-center lg:flex justify-center  items-center ">
                  <Metrics
                    likeCount={opportunity.likeCount}
                    dislikeCount={opportunity.dislikeCount}
                    views={opportunity.views}
                    rating={opportunity.rating}
                    iconSize={18}
                  />
                </div>
              </div>
            );
          })
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </ControlPanel>
    </>
  );
};

export default Listopportunity;
