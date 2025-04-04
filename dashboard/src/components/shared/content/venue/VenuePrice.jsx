import SkeletonText from "@/components/shared/skeleton/SkeletonText";

const VenuePrice = ({ venue }) => {
  return (
    <div className="flex flex-wrap gap-y-2  md:gap-x-4">
      {venue?.basePrice ? (
        <div className="flex  gap-x-2 ">
          <span className=" text-green-600 dark:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <g fill="currentColor">
                <path d="M15.84 19.345h.07c1.5.04 2.7 1.26 2.7 2.76c0 1.28-.87 2.35-2.05 2.67v1.12c0 .4-.32.72-.72.72s-.72-.32-.72-.72v-1.12a2.77 2.77 0 0 1-2.05-2.67c0-.4.32-.72.72-.72s.72.32.72.72c0 .74.59 1.33 1.32 1.33s1.33-.6 1.33-1.33s-.6-1.33-1.33-1.33h-.07a2.765 2.765 0 0 1-2.69-2.76c0-1.28.87-2.35 2.05-2.67v-1.12c0-.4.32-.72.72-.72s.72.32.72.72v1.12c1.18.32 2.05 1.39 2.05 2.67c0 .4-.32.72-.72.72s-.72-.32-.72-.72c0-.73-.6-1.33-1.33-1.33s-1.33.6-1.33 1.33s.6 1.33 1.33 1.33" />
                <path d="m10.532 5.1l2.786 3.26l-.301.336C7.283 9.982 3 15.103 3 21.225c0 5.382 4.368 9.75 9.75 9.75h6.17c5.382 0 9.75-4.367 9.75-9.749c.01-6.123-4.273-11.244-10.007-12.53a1.1 1.1 0 0 0-.11-.615l2.37-2.713l.153-.236a1.956 1.956 0 0 0-2.892-2.423l-.843-1a2.02 2.02 0 0 0-3.008-.005l-.883.986a1.96 1.96 0 0 0-2.918 2.41m3.799 1.385l-1.696-1.96a1.98 1.98 0 0 0 2.365-.5l.8-1.038l.888 1.052a1.97 1.97 0 0 0 2.3.513L17.3 6.485zM5 21.225c0-5.988 4.852-10.84 10.84-10.84s10.84 4.852 10.83 10.838v.002a7.753 7.753 0 0 1-7.75 7.75h-6.17A7.753 7.753 0 0 1 5 21.225" />
              </g>
            </svg>
          </span>
          <div className="flex flex-col">
            <div className="flex gap-x-2  ">
              <span className="text-sm">شروع قیمت از</span>
              <div className="flex   flex-row-reverse">
                <span
                  dangerouslySetInnerHTML={{
                    __html: venue?.currency?.symbol
                  }}
                  className="text-primary dark:text-blue-500 ml-1 w-6 h-6 text-left text-md  font-semibold "
                />

                <span className="text-primary dark:text-blue-500  font-semibold">
                  {venue?.campaignState === "limited-offer"
                    ? venue?.basePrice -
                      (venue?.basePrice * venue?.discountAmount) / 100
                    : venue?.basePrice}
                </span>
              </div>
              {venue?.campaignState === "limited-offer" && (
                <div className="flex justify-center  ite">
                  <span className="text-gray-400 text-sm line-through">
                    {venue?.basePrice}
                  </span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: venue?.currency?.symbol
                    }}
                    className="  w-4 h-4 text-left text-md  font-semibold "
                  />
                </div>
              )}{" "}
            </div>
            <div className="text-sm cursor-pointer text-gray-600 flex ">
              <span className="text-xs underline dark:text-blue-500">
                مشاهده جزئیات
              </span>
            </div>
          </div>
        </div>
      ):(
        <SkeletonText lines={1}  />
      )}
      {(venue?.maxCapacity || venue?.minCapacity) ? (
        <div className="flex gap-x-2">
          <span className="text-green-600 dark:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M8.592 7.764a3 3 0 0 1-.155-.105a2 2 0 0 1-.233-.202l-.006-.007l-.003-.003v-.001c-.001 0-.002-.002.377-.328l-.379.326a.5.5 0 0 1-.112-.232l-.45-2.336a.78.78 0 0 1 .327-.78a.83.83 0 0 1 .805-.094c.333.146.765.261 1.205.189c.417-.07.908-.318 1.367-1.032a.797.797 0 0 1 1.33 0c.459.714.95.963 1.367 1.032c.44.072.872-.043 1.205-.189a.83.83 0 0 1 .806.093a.78.78 0 0 1 .326.781l-.45 2.336a.5.5 0 0 1-.112.232l-.378-.326l.378.326l-.001.002l-.001.001l-.003.003l-.006.007a1 1 0 0 1-.065.065a2 2 0 0 1-.168.137q-.141.107-.375.23q.027.085.052.172a2.643 2.643 0 1 1-.744 3.25a3.5 3.5 0 0 1-2.628 1.189a3.5 3.5 0 0 1-2.629-1.189a2.643 2.643 0 1 1-.744-3.25q.042-.152.097-.297m1.54-2.587a3 3 0 0 1-1.45-.136l.348 1.813c.053.038.131.09.24.146a.5.5 0 0 1 .365.159c.47.172 1.222.341 2.365.341c.899 0 1.555-.104 2.024-.233a.497.497 0 0 1 .632-.23a2 2 0 0 0 .314-.183l.349-1.813a3 3 0 0 1-1.45.136c-.656-.108-1.31-.472-1.869-1.223c-.558.751-1.213 1.115-1.869 1.223m-.624 2.995a2.5 2.5 0 0 0-.114 1.19q.057.188.088.386a2.501 2.501 0 0 0 4.773-.003q.03-.195.086-.379a2.5 2.5 0 0 0-.09-1.124c-.56.15-1.296.258-2.25.258c-1.1 0-1.909-.144-2.493-.328m5.808 1.43q-.031.18-.08.353q-.01.092-.01.188a1.643 1.643 0 1 0 .09-.54M8.5 9.96a4 4 0 0 1-.082-.36a1.644 1.644 0 1 0 .082.36m-2.78 3.523a1.07 1.07 0 0 0-.901-.186a9 9 0 0 0-.46.137l-.685.225a2.62 2.62 0 0 0-1.73 1.843l-.007.027l-.291 2.106c-.113.816.325 1.674 1.22 1.887q.371.091.884.175a.5.5 0 1 0 .16-.988a11 11 0 0 1-.813-.16c-.304-.072-.516-.374-.46-.777l.283-2.049c.141-.52.54-.94 1.066-1.114l.685-.225q.2-.065.401-.12l.007.002a.2.2 0 0 1 .054.027c.129.093.303.205.517.308a.5.5 0 0 0 .435-.9a2.4 2.4 0 0 1-.365-.218m12.428 0c.226-.164.554-.278.9-.186q.232.062.46.137l.686.225c.855.281 1.51.975 1.73 1.843l.006.027l.292 2.106c.113.816-.326 1.674-1.22 1.887q-.371.091-.885.175a.5.5 0 1 1-.159-.988q.478-.078.813-.16c.303-.072.516-.374.46-.777l-.283-2.049a1.63 1.63 0 0 0-1.066-1.114l-.686-.225a7 7 0 0 0-.4-.12l-.003.001h-.005a.2.2 0 0 0-.053.028a3.4 3.4 0 0 1-.517.308a.5.5 0 0 1-.435-.9c.151-.073.275-.153.365-.218"
              />
            </svg>
          </span>
          <div className="flex flex-col">
            <div className="flex gap-x-2">
              <span className="text-sm">
                از {venue?.minCapacity} تا {venue?.maxCapacity} نفر مهمان
              </span>
            </div>
          </div>
        </div>
      ):(
        <SkeletonText lines={1}  />
 
      )}
      {venue?.isReception === true ? (
        <div className="flex  gap-x-2 w-42 ">
          <span className="text-green-600 dark:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 19h18M12 8V5m0 3h-2a5 5 0 0 0-5 5v3h14v-3a5 5 0 0 0-5-5zm0-3h-2m2 0h2"
              />
            </svg>
          </span>
          <div className="flex flex-col">
            <div className="flex gap-x-2 ">
              <span className="text-sm">مراسم و پذیرایی را برگزار می کند</span>
            </div>
          </div>
        </div>
      ):(
        <SkeletonText lines={1}  />

      )}
    </div>
  );
};
export default VenuePrice;
