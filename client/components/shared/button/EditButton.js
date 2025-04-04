import { FiEdit3 } from "react-icons/fi";

const EditButton = ({ onClick }) => {
  return (
    <div
      onClick={onClick} // استفاده از onClick ارسال شده از کامپوننت والد
      className="inline-flex w-auto items-center rounded-lg bg-green-500 dark:bg-blue-500 px-5 py-2 text-white shadow-sm cursor-pointer transition-all hover:bg-green-400 dark:hover:bg-blue-400 gap-2"
    >
                         <FiEdit3dit3 className="w-5 h-5" />

      <span>افزودن آیتم جدید</span>
    </div>
  );
};


export default EditButton;
