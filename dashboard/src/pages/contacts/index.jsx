import { useEffect, useMemo, useState } from "react";
import ControlPanel from "../ControlPanel";
import Modal from "@/components/shared/modal/Modal";
import { useGetContactsQuery, useUpdateContactMutation } from "@/services/contact/contactApi";
import { toast } from "react-hot-toast";
import StatusIndicator from "@/components/shared/tools/StatusIndicator";
import Edit from "@/components/icons/Edit";
import { useDispatch } from "react-redux";

function Contacts() {
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [status, setStatus] = useState("");

  const {
    isLoading,
    data: contactData,
    error,
    refetch
  } = useGetContactsQuery();

  const [updateContact, { isLoading: isUpdating }] = useUpdateContactMutation();

  const contacts = useMemo(() => contactData?.data || [], [contactData]);

  const filteredContacts = useMemo(() => {
    if (filter === "pending") return contacts.filter(r => r.status === "pending");
    if (filter === "reviewed") return contacts.filter(r => r.status === "reviewed");
    if (filter === "completed") return contacts.filter(r => r.status === "completed");
    return contacts;
  }, [filter, contacts]);

  useEffect(() => {
    if (isLoading) {
      toast.loading("در حال دریافت پیام‌ها...", { id: "contacts" });
    }
    if (contactData) {
      toast.success("اطلاعات پیام‌ها دریافت شد", { id: "contacts" });
    }
    if (error?.data) {
      toast.error("خطا در دریافت اطلاعات", { id: "contacts" });
    }
  }, [isLoading, contactData, error]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateContact({ id, body: { status: newStatus } }).unwrap();
      toast.success("وضعیت پیام به‌روزرسانی شد");
      refetch();
    } catch (err) {
      toast.error("خطا در به‌روزرسانی وضعیت");
    }
  };

  const openContactDetails = (contact) => {
    setSelectedContact(contact);
    setIsOpen(true);
  };

  const closeContactDetails = () => {
    setIsOpen(false);
    setSelectedContact(null);
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
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">ارسال کننده</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">موضوع</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">تاریخ</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">وضعیت</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContacts?.map((contact) => (
                <tr 
                  key={contact?._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => openContactDetails(contact)}
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <StatusIndicator isActive={contact.status === "completed"} />
                      <div className="mr-3">
                        <div className="font-medium">{contact?.name}</div>
                        <div className="text-gray-500 text-xs">{contact?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {contact?.subject}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(contact.createdAt).toLocaleDateString("fa-IR")}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contact.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      contact.status === "reviewed" ? "bg-blue-100 text-blue-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {contact.status === "pending" ? "در انتظار" : 
                       contact.status === "reviewed" ? "بررسی شده" : "تکمیل شده"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openContactDetails(contact);
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
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">ارسال کننده</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">موضوع</th>
                <th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 dark:text-gray-300">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredContacts?.map((contact) => (
                <tr 
                  key={contact?._id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => openContactDetails(contact)}
                >
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    <div className="flex items-center">
                      <StatusIndicator isActive={contact.status === "completed"} />
                      <div className="mr-3">
                        <div className="font-medium">{contact?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-100">
                    {contact?.subject}
                  </td>
                  <td className="py-3 px-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          openContactDetails(contact);
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

        {/* Modal for contact details */}
        {isOpen && selectedContact && (
          <Modal isOpen={isOpen} onClose={closeContactDetails} title="جزئیات پیام">
            <div className="flex flex-col h-full">
              <div className="text-right space-y-6 flex-grow overflow-y-auto pr-2">
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-300">
                  جزئیات پیام
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-200 px-3 py-1 rounded-lg text-sm">
                      نام: {selectedContact.name}
                    </span>
                    <span className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-lg text-sm">
                      تاریخ: {new Date(selectedContact.createdAt).toLocaleDateString("fa-IR")}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                      اطلاعات تماس
                    </h3>
                    <div className="flex flex-col gap-1">
                      <span className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 px-3 py-1 rounded-lg text-sm">
                        ایمیل: {selectedContact.email}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                      موضوع
                    </h3>
                    <span className="bg-purple-50 text-purple-700 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-lg text-sm">
                      {selectedContact.subject}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                      پیام
                    </h3>
                    <p className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg text-sm whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>

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
                          checked={selectedContact.status === "pending"}
                          onChange={(e) => handleStatusUpdate(selectedContact._id, e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">در انتظار</span>
                      </label>
                      <label className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                        <input
                          type="radio"
                          name="status"
                          value="reviewed"
                          checked={selectedContact.status === "reviewed"}
                          onChange={(e) => handleStatusUpdate(selectedContact._id, e.target.value)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">بررسی شده</span>
                      </label>
                      <label className="flex items-center bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg">
                        <input
                          type="radio"
                          name="status"
                          value="completed"
                          checked={selectedContact.status === "completed"}
                          onChange={(e) => handleStatusUpdate(selectedContact._id, e.target.value)}
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
                  onClick={closeContactDetails}
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

export default Contacts;