
import Square from "@/components/icons/Square";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { FaBed, FaRegCalendarAlt, FaBath } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const locale = useLocale();
  const t = useTranslations("Property");
  let updatedFinalPrice = property.finalPrice;
  let updatedFinalPriceLabel = property.finalPriceLabel;
  if (property.tradeType && property.variants) {
    const deposit = property?.variants?.find(
      (variant) => variant?.type === "deposit"
    )?.value;
    const monthlyRent = property?.variants?.find(
      (variant) => variant?.type === "monthlyRent"
    )?.value;
    const totalPrice = property?.variants?.find(
      (variant) => variant?.type === "totalPrice"
    )?.value;
    const installmentAmount = property?.variants.find(
      (variant) => variant?.type === "installmentAmount"
    )?.value;

    if (deposit) {
      updatedFinalPriceLabel = " ودیعه";
      updatedFinalPrice = deposit;
    } else if (monthlyRent) {
      updatedFinalPriceLabel = "ماهانه";
      updatedFinalPrice = monthlyRent;
    } else if (totalPrice) {
      updatedFinalPriceLabel = "ارزش کل";
      updatedFinalPrice = totalPrice;
    } else if (installmentAmount) {
      updatedFinalPriceLabel = "";
      updatedFinalPrice = installmentAmount;
    }
  }
  const { title, summary, slug } = property ;
  const typeTitle = property.type.title;

  const saleTypeTitle = property.saleType.title;

  const tradeTypeTitle = property.tradeType.title;

  
  return (
    <Link
      key={property?._id}
      href={`/property/${property?.propertyId}/${encodeURIComponent(property.slug.trim())}`}
      className="max-w-sm w-full  z-49 "
    >
      <div className="relative overflow-hidden transition-all duration-150 ease-out bg-white border border-gray-100 dark:border-gray-700 rounded-lg hover:shadow-xl hover:shadow-gray-200 dark:hover:shadow-gray-950 dark:bg-gray-800 ">
        <span
          className={`absolute top-2 left-0 w-32 -translate-x-8 translate-y-4 -rotate-45 bg-green-500 text-white text-center text-sm z-50      ${
            property?.citizenshipStatus === "citizenship"
              ? "bg-green-500 text-white"
              : property?.citizenshipStatus === "residency"
              ? "bg-blue-500 text-white"
              : property?.citizenshipStatus === "goldenVisa"
              ? "bg-yellow-500 text-white"
              : "bg-transparent text-transparent"
          }`}
        >
          {property?.citizenshipStatus === "citizenship" && t("citizenship")}
          {property?.citizenshipStatus === "residency" && t("residency")}
          {property?.citizenshipStatus === "goldenVisa" && t("goldenVisa")}
        </span>

        <button className="absolute top-3 right-3 z-40 flex items-center justify-center w-10 h-10 bg-white border border-gray-100 rounded-full shadow focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21C-8 10 6-2 12 5.7 18-2 32 10 12 21z" />
          </svg>
          <span className="sr-only">Mark as favorite</span>
        </button>

        <div className="relative cursor-zoom-in aspect-[3/2]">
          <Image
            src={property?.thumbnail?.url || "/placeholder.png"}
            height={600}
            quality={2}
            priority={false}
            width={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-2 space-y-2 relative">
          <div className="flex justify-between items-center mb-2">
            {typeTitle && (
              <Badge className="text-green-500 dark:text-green-100 bg-green-100 dark:bg-green-600 flex flex-row items-center gap-x-1">
                {typeTitle}
              </Badge>
            )}
            <div className="flex gap-2">
              {saleTypeTitle && (
                <Badge className="text-rose-500 dark:text-rose-100 bg-rose-100 dark:bg-rose-600 line-clamp-1 flex flex-row items-center gap-x-1">
                  {saleTypeTitle}
                </Badge>
              )}

              {tradeTypeTitle && (
                <Badge className="!text-cyan-500 dark:text-cyan-100 bg-cyan-100 dark:bg-cyan-600 line-clamp-1 flex flex-row items-center gap-x-1">
                  {tradeTypeTitle}
                </Badge>
              )}
            </div>
          </div>

          <h3 className="text-lg ltr:font-semibold line-clamp-1"> {title}</h3>
          <div></div>
          <div className="flex justify-between items-center">
            {updatedFinalPrice && property?.currency && (
              <div className="flex items-center justify-start">
                <span className="text-3xl font-extrabold  text-blue-800 dark:text-blue-300">
                  {" "}
                  {updatedFinalPrice}
                </span>
                <div className="flex items-center font-bold gap-x-1 w-6 h-6">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: property?.currency.symbol
                    }}
                    className="text-gray-500 dark:text-gray-300"
                  ></span>
                </div>
              </div>
            )}
            <div className="flex items-end text-gray-500">
              <p className="text-sm  ">{Array.isArray(property.address) ? property.address[0].city : property.address.city }</p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M256 48c-79.5 0-144 61.39-144 137c0 87 96 224.87 131.25 272.49a15.77 15.77 0 0 0 25.5 0C304 409.89 400 272.07 400 185c0-75.61-64.5-137-144-137"
                  ></path>
                  <circle
                    cx={256}
                    cy={192}
                    r={48}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                  ></circle>
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <div className="relative">
            {/* scrollbar container */}
            <div
              className="absolute top-0 left-0 right-0 overflow-x-auto custom-scrollbar"
              style={{ height: "5px" }}
            >
              <div style={{ width: "1000px" }} />
            </div>
            <div className="w-full ">
              <div className="flex w-max gap-x-2 px-2 py-2 text-gray-600">
                {property?.building?.bedrooms?.map((bedroom, index) => (
                  <span
                    key={`bedroom-${index}`}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M3 17.5V13q0-.444.256-.946T4 11.3V9q0-.846.577-1.423T6 7h4.5q.517 0 .883.213q.365.212.617.587q.252-.375.617-.587Q12.983 7 13.5 7H18q.846 0 1.423.577T20 9v2.3q.489.252.744.754q.256.502.256.946v4.5q0 .213-.144.356t-.357.144t-.356-.144T20 17.5V16H4v1.5q0 .213-.144.356T3.499 18t-.356-.144T3 17.5m9.5-6.5H19V9q0-.425-.288-.712T18 8h-4.5q-.425 0-.712.288T12.5 9zM5 11h6.5V9q0-.425-.288-.712T10.5 8H6q-.425 0-.712.288T5 9zm-1 4h16v-2q0-.425-.288-.712T19 12H5q-.425 0-.712.288T4 13zm16 0H4z"
                      />
                    </svg>
                    {bedroom} {t("bedroom")}
                  </span>
                ))}

                {property?.building?.square?.map((square, index) => (
                  <span
                    key={`square-${index}`}
                    className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M27 22.142V9.858A3.992 3.992 0 1 0 22.142 5H9.858A3.992 3.992 0 1 0 5 9.858v12.284A3.992 3.992 0 1 0 9.858 27h12.284A3.992 3.992 0 1 0 27 22.142M26 4a2 2 0 1 1-2 2a2 2 0 0 1 2-2M4 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m16.142-3H9.858A4 4 0 0 0 7 22.142V9.858A4 4 0 0 0 9.858 7h12.284A4 4 0 0 0 25 9.858v12.284A3.99 3.99 0 0 0 22.142 25M26 28a2 2 0 1 1 2-2a2.003 2.003 0 0 1-2 2"
                      />
                    </svg>
                    {square} {t("metr")}
                  </span>
                ))}

                {property?.createDate && (
                  <span className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium bg-cyan-100 text-cyan-500 rounded-sm whitespace-nowrap">
                    📅 {property.createDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>


      </div>

    </Link>
  );
};

function Badge({ className, children, props }) {
  return (
    <span
      className={
        "text-[10px] text-gray-500 dark:text-gray-300 py-1 px-3 rounded-full " +
        className
      }
      {...props}
    >
      {children}
    </span>
  );
}

export default PropertyCard;
