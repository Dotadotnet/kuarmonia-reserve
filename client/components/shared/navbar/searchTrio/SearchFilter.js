import React, { useEffect, useMemo, useState } from "react";
import { useGetRentsQuery } from "@/services/rent/rentApi";
import { toast } from "react-hot-toast";
import { useTranslations } from 'next-intl';
import Link from "next/link";

const SearchFilter = ({ setIsModalOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error } = useGetRentsQuery();
  const tours = useMemo(() => data?.data || [], [data]);
  const t = useTranslations('HomePage');

  useEffect(() => {
    if (isLoading) {
      toast.loading(t("search.loading"), { id: "search" });
    }

    if (data) {
      toast.success(data?.message || t("search.success"), { id: "search" });
    }

    if (error?.data) {
      toast.error(error?.data?.message || t("search.error"), { id: "search" });
    }
  }, [data, error, isLoading, t]);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value?.toLowerCase());
  };

  const filteredTravels =
    searchTerm?.length > 0
      ? tours.filter(({ title, summary, location }) => {
          const lowerTitle = title?.toLowerCase();
          const lowerDescription = summary?.toLowerCase();
          const lowerCountry = location?.toLowerCase();

          return (
            lowerTitle?.includes(searchTerm) ||
            lowerDescription?.includes(searchTerm) ||
            lowerCountry?.includes(searchTerm)
          );
        })
      : tours;

  const highlightMatch = (text, keyword) => {
    if (!keyword) return text;

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
    const regex = new RegExp(escapedKeyword, "gi");

    return text.replace(regex, (match) => `<mark>${match}</mark>`);
  };

  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        className="w-full rounded border-1 border-primary text-sm"
        placeholder={t("search.placeholder")}
        onChange={handleSearch}
        autoComplete="off"
      />
      <div className="flex flex-col gap-y-2.5 h-full overflow-y-auto">
        {filteredTravels.length === 0 ? (
          <p className="text-sm text-red-500">{t("search.noResults")}</p>
        ) : (
          filteredTravels.map(({ _id, title, summary, location, price }) => {
            const highlightedTitle = highlightMatch(title, searchTerm);
            const highlightedDescription = highlightMatch(summary, searchTerm);
            const highlightedCountry = highlightMatch(location, searchTerm);

            const slug = title
              .replace(/[^\w\s]|[\s]+/g, "-")
              .replace(/-+/g, "-")
              .toLowerCase();

            return (
              <Link
                href={`/tours/${_id}?tour_title=${slug}`}
                key={_id}
                onClick={() => setIsModalOpen(false)}
              >
                <article className="flex flex-col gap-y-0.5 cursor-pointer bg-slate-50 p-2.5 rounded hover:bg-slate-100 transition">
                  <h2
                    className="!font-normal text-base line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: highlightedTitle }}
                  />
                  <p
                    className="line-clamp-2 text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightedDescription }}
                  />
                  <p className="flex flex-row gap-x-2 mt-1">
                    <span className="text-xs border border-cyan-900 px-2 rounded">
                      ${price} {t("search.perNight")}
                    </span>
                    <span
                      className="text-end text-xs text-gray-500 line-clamp-1 border border-teal-900 px-2 rounded"
                      dangerouslySetInnerHTML={{ __html: highlightedCountry }}
                    />
                  </p>
                </article>
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default SearchFilter;
