import { useEffect, useMemo, useState } from "react";
import ControlPanel from "../ControlPanel";
import Modal from "@/components/shared/modal/Modal";
import { useGetRequestsQuery, useUpdateRequestMutation } from "@/services/request/requestApi";
import { useGetVisaQuery } from "@/services/visa/visaApi";
import { useGetServiceQuery } from "@/services/service/serviceApi";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Edit from "@/components/icons/Edit";
import { useDispatch } from "react-redux";

function Requests() {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [status, setStatus] = useState("");

  const {
    isLoading,
    data: requestData,
    error,
    refetch
  } = useGetRequestsQuery();

  const [updateRequest, { isLoading: isUpdating }] = useUpdateRequestMutation();

  // Fetch visa details if needed
  const { data: visaData, isLoading: isVisaLoading } = useGetVisaQuery(
    selectedRequest?.serviceType === "visa" && selectedRequest?.specificTypeId 
      ? selectedRequest.specificTypeId 
      : null,
    { skip: !(selectedRequest?.serviceType === "visa" && selectedRequest?.specificTypeId) }
  );

  // Fetch service details if needed
  const { data: serviceData, isLoading: isServiceLoading } = useGetServiceQuery(
    selectedRequest?.serviceType === "service" && selectedRequest?.specificTypeId 
      ? selectedRequest.specificTypeId 
      : null,
    { skip: !(selectedRequest?.serviceType === "service" && selectedRequest?.specificTypeId) }
  );

  const requests = useMemo(() => requestData?.data || [], [requestData]);

  const filteredRequests = useMemo(() => {
    if (filter === "pending") return requests.filter(r => r.status === "pending");
    if (filter === "reviewed") return requests.filter(r => r.status === "reviewed");
    if (filter === "completed") return requests.filter(r => r.status === "completed");
    return requests;
  }, [filter, requests]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت درخواست‌ها...", { id: "requests" });
    }
    if (requestData) {
      toast.success("اطلاعات درخواست‌ها دریافت شد", { id: "requests" });
    }
    if (error?.data) {
      toast.error("خطا در دریافت اطلاعات", { id: "requests" });
    }
  }, [isLoading, requestData, error]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateRequest({ id, body: { status: newStatus } }).unwrap();
      toast.success("وضعیت درخواست به‌روزرسانی شد");
      refetch();
    } catch (err) {
      toast.error("خطا در به‌روزرسانی وضعیت");
    }
  };

  const openRequestDetails = (request) => {
    setSelectedRequest(request);
    setIsOpen(true);
  };

  const closeRequestDetails = () => {
    setIsOpen(false);
    setSelectedRequest(null);
  };

  return (
    <ControlPanel>
      <section className="flex flex-col gap-y-1">
        <ul className="grid grid-cols-4 gap-1 text-center text-gray-500 bg-gray-200 dark:bg-gray-700 rounded-lg p-1">
          <li>
            <a
              href="#all"
              className={`flex justify-center text-sm py-2 ${filter === "all" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("all")}
            >
              همه
            </a>
          </li>
          <li>
            <a
              href="#pending"
              className={`flex justify-center text-sm py-2 ${filter === "pending" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("pending")}
            >
              در انتظار
            </a>
          </li>
          <li>
            <a
              href="#reviewed"
              className={`flex justify-center text-sm py-2 ${filter === "reviewed" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("reviewed")}
            >
              بررسی شده
            </a>
          </li>
          <li>
            <a
              href="#completed"
              className={`flex justify-center text-sm py-2 ${filter === "completed" ? "bg-white dark:bg-gray-900 rounded-lg shadow text-indigo-900 dark:text-gray-100" : ""}`}
              onClick={() => setFilter("completed")}
            >
              تکمیل شده
            </a>
          </li>
        </ul>

        <div className="mt-4 overflow-x-auto">
          {/* Desktop table - full version */}
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden hidden md:table">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">درخواست کننده</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">نوع</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">جزئیات</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">تاریخ</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">وضعیت</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests?.map((request) => (
                <tr 
                  key={request?._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => openRequestDetails(request)}
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <StatusIndicator isActive={request.status === "completed"} />
                      <div className="mr-3">
                        <div className="font-medium">{request?.firstName} {request?.lastName}</div>
                        <div className="text-gray-500 text-xs">{request?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {request?.serviceType === "visa" ? "ویزا" : request?.serviceType === "service" ? "خدمات" : "سایر"}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {request?.specificTypeId ? (
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs">
                        {request.serviceType === "visa" ? "ویزای مشخص" : 
                         request.serviceType === "service" ? "خدمت مشخص" : "مورد خاص"}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-xs">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(request.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      request.status === "reviewed" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {request.status === "pending" ? "در انتظار" : 
                       request.status === "reviewed" ? "بررسی شده" : "تکمیل شده"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openRequestDetails(request);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Mobile table - simplified version */}
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden md:hidden table">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">درخواست کننده</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">نوع</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRequests?.map((request) => (
                <tr 
                  key={request?._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => openRequestDetails(request)}
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <StatusIndicator isActive={request.status === "completed"} />
                      <div className="mr-3">
                        <div className="font-medium">{request?.firstName} {request?.lastName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {request?.serviceType === "visa" ? "ویزا" : request?.serviceType === "service" ? "خدمات" : "سایر"}
                    {request?.specificTypeId && (
                      <div className="mt-1">
                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-xs">
                          {request.serviceType === "visa" ? "ویزای مشخص" : "خدمت مشخص"}
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openRequestDetails(request);
                        }}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for request details */}
        {isOpen && selectedRequest && (
          <Modal isOpen={isOpen} onClose={closeRequestDetails} title="جزئیات درخواست">
            <div className="flex flex-col h-full">
              <div className="text-right space-y-6 flex-grow overflow-y-auto pr-2">
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-300">
                  جزئیات درخواست
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-200 px-3 py-1 rounded-lg text-sm">
                      نام: {selectedRequest.firstName} {selectedRequest.lastName}
                    </span>
                    <span className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-lg text-sm">
                      تاریخ: {new Date(selectedRequest.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                      اطلاعات تماس
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-lg text-sm">
                        ایمیل: {selectedRequest.email}
                      </span>
                      <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-lg text-sm">
                        تلفن: {selectedRequest.phone}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                      نوع سرویس
                    </h3>
                    <span className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-lg text-sm">
                      {selectedRequest.serviceType === "visa" ? "ویزا" : 
                       selectedRequest.serviceType === "service" ? "خدمات" : "سایر"}
                    </span>
                  </div>

                  {/* Specific Visa or Service Information */}
                  {selectedRequest.specificTypeId && (
                    <div>
                      <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                        {selectedRequest.serviceType === "visa" ? "ویزای انتخابی" : "خدمت انتخابی"}
                      </h3>
                      {selectedRequest.serviceType === "visa" ? (
                        isVisaLoading ? (
                          <span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg text-sm">
                            در حال بارگذاری...
                          </span>
                        ) : visaData?.data ? (
                          <span className="bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-200 px-3 py-1 rounded-lg text-sm">
                            {visaData.data.title?.fa || "ویزای نامشخص"}
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-lg text-sm">
                            خطا در بارگذاری اطلاعات ویزا
                          </span>
                        )
                      ) : selectedRequest.serviceType === "service" ? (
                        isServiceLoading ? (
                          <span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg text-sm">
                            در حال بارگذاری...
                          </span>
                        ) : serviceData?.data ? (
                          <span className="bg-orange-50 text-orange-700 dark:bg-orange-900 dark:text-orange-200 px-3 py-1 rounded-lg text-sm">
                            {serviceData.data.title?.fa || "خدمت نامشخص"}
                          </span>
                        ) : (
                          <span className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 px-3 py-1 rounded-lg text-sm">
                            خطا در بارگذاری اطلاعات خدمت
                          </span>
                        )
                      ) : (
                        <span className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 px-3 py-1 rounded-lg text-sm">
                          نوع سرویس نامشخص
                        </span>
                      )}
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                      توضیحات
                    </h3>
                    <p className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg text-sm whitespace-pre-wrap">
                      {selectedRequest.description}
                    </p>
                  </div>

                  {selectedRequest.file && (
                    <div>
                      <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                        فایل پیوست
                      </h3>
                      <a 
                        href={selectedRequest.file.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-gray-50 text-blue-700 dark:bg-gray-800 dark:text-blue-200 px-3 py-1 rounded-lg text-sm inline-block hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        دانلود فایل
                      </a>
                    </div>
                  )}

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100 mb-2">
                      وضعیت
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                        <input
                          type="radio"
                          name="status"
                          value="pending"
                          checked={selectedRequest.status === "pending"}
                          onChange={(e) => handleStatusUpdate(selectedRequest._id, e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">در انتظار</span>
                      </label>
                      <label className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                        <input
                          type="radio"
                          name="status"
                          value="reviewed"
                          checked={selectedRequest.status === "reviewed"}
                          onChange={(e) => handleStatusUpdate(selectedRequest._id, e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">بررسی شده</span>
                      </label>
                      <label className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                        <input
                          type="radio"
                          name="status"
                          value="completed"
                          checked={selectedRequest.status === "completed"}
                          onChange={(e) => handleStatusUpdate(selectedRequest._id, e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">تکمیل شده</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Fixed footer */}
              <div className="flex justify-end mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={closeRequestDetails}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
                >
                  بستن
                </button>
              </div>
            </div>
          </Modal>
        )}
      </section>
    </ControlPanel>
  );
}

export default Requests;