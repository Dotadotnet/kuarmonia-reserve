
const KeyServiceCard = ({ service }) => {
  return (
      <div
        id={service?.id}
        className="relative flex mt-4 flex-col border hover:border-primary transition-color ease-linear delay-100 cursor-pointer dark:bg-gray-800/70 dark:border-gray-900 dark:text-gray-100 shadow-lg bg-white/80 border-gray-200 !h-[150px] lg:!h-[170px] w-[150px] lg:w-[170px] p-4 rounded-primary dark:hover:border-blue-500 z-50 items-center max-w-xs mx-auto"
      >
        <div className="max-w-[100px] mx-auto">
        <div dangerouslySetInnerHTML={{ __html: service?.icon }} />
        </div>
        <div className="flex flex-col gap-y-8 items-center justify-center">
          <h2 className="text-sm lg:text-base mt-4">{service?.title}</h2>
        </div>
      </div>
  );
};

export default KeyServiceCard;
