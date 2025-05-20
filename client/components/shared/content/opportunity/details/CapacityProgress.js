
const CapacityProgress = ({ opportunity }) => (
 <div className=" mx-auto p-4">
        <label className="text-gray-400">درخواست ها</label>
        <div className="relative  max-w-sm">
          <div className="flex mb-2 items-center justify-start">
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-cyan-600">
                {opportunity?.capacity}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-semibold inline-block text-cyan-600">
                {opportunity?.capacity}
              </span>
            </div>
          </div>
          <div className="flex rounded-full h-2 bg-gray-200">
            <div
              className="rounded-full bg-cyan-500"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
);

export default CapacityProgress;
