
import { useLocale } from "next-intl";

export default function Option({ opportunity }) {
  const locale = useLocale();
  const skills = opportunity?.skills || [];



  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("fa-IR-u-ca-persian", {
        day: "numeric",
        month: "long",
      })
      : "N/A";

  return (
    <div className="mx-auto px-4 py-2 grid md:grid-cols-3 gap-8 relative">
      <div className="md:col-span-3 space-y-8">
        <div className="flex justify-start gap-x-1 overflow-x-auto custom-scrollbar h-10">
          {skills.map((item, index) => (
            <span
              key={index}
              className="text-white  gap-[6px] items-center flex max-h-[fit-content] p-0.5 rounded-full pl-1.5 max-w-[fit-content] bg-gray-500  text-sm justify-start text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                🔥
              </span>
              {item}
            </span>
          ))}
        </div>

        <div className="grid w-full grid-cols-12 rounded-md gap-x-2 p-4 px-1">
          <div className="gap-y-2 col-span-4 flex flex-col">
            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                💼
              </span>
              {opportunity.refId.employmentType.title}
            </span>

            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                💸
              </span>
              <span>
                {opportunity?.refId?.salary?.min || "N/A"} -{" "}
                {opportunity?.refId?.salary?.max || "N/A"}
              </span>
              <span
                className="w-5 h-5 inline-block"
                dangerouslySetInnerHTML={{
                  __html: opportunity?.refId?.currency?.symbol || "",
                }}
              />
            </span>

            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                ⏰
              </span>
              {opportunity?.refId?.jobTime.title}
            </span>

            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                ⏳
              </span>
              {opportunity?.vacancy || "نامشخص"}
            </span>
          </div>

          <div className="gap-y-2 col-span-7 flex flex-col">
            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                💻
              </span>
              {opportunity?.refId?.jobMode.title}
            </span>

            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                📅
              </span>
              <span>
                {formatDate(opportunity?.startDate)} -{" "}
                {formatDate(opportunity?.endDate)}
              </span>
            </span>

            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                📈
              </span>
              {opportunity.refId.experienceLevel.title
                ?.map((item) => item)
                .join(" - ") || "N/A"}
            </span>

            <span
              className="text-white  gap-[6px] items-center flex rounded-full p-0.5 pl-1.5 max-w-[fit-content] bg-gray-500  justify-start text-sm text-nowrap"
            >
              <span className="w-6 h-6 rounded-full overflow-hidden bg-white flex p-1 justify-center items-center">
                🌐
              </span>
              {opportunity.languages.join(" - ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}