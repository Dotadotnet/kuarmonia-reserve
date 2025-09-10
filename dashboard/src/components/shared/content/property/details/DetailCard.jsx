
import ChevronUp from "@/components/icons/ChevronUp";
import ChevronDown from "@/components/icons/ChevronDown";
import ChevronRight from "@/components/icons/ChevronRight";

const DetailCard = ({ title, content }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <section className="relative flex flex-col gap-y-2.5">
      <div
        className="flex flex-row justify-between items-start bg-slate-100/80 dark:bg-gray-800 hover:bg-slate-200/60 dark:hover:bg-gray-700 rounded-primary px-4 py-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className={"line-clamp-1 dark:text-gray-200" + (isOpen ? " line-clamp-none" : "")}>
          {title}
        </h2>
        {isOpen ? (
          <span className="border rounded-secondary dark:border-gray-600">
            <ChevronUp className="h-5 w-5 dark:text-gray-300" />
          </span>
        ) : (
          <span className="border rounded-secondary dark:border-gray-600">
            <ChevronDown className="h-5 w-5 dark:text-gray-300" />
          </span>
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-y-2">
          {content?.map((content, index) => (
            <p
              key={index}
              className="text-sm flex flex-row items-start gap-x-1.5 line-clamp-1 dark:text-gray-300"
            >
              <span className="dark:text-gray-400">
                <ChevronRight className="h-4 w-4" />
              </span>{" "}
              {content}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default DetailCard;
