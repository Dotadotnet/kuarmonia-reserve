



const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <section className="fixed top-0 right-0 inset-0 z-[9999999999999999999999999999999999] flex items-center justify-center dark:text-slate-100">
      <div
        className="fixed top-0 right-0 inset-0 bg-secondary/10 backdrop-blur-sm backdrop-filter bg-opacity-100"
        onClick={onClose}
      ></div>
      <div
        className={
          "z-10 bg-white dark:bg-slate-800 rounded p-6 shadow-lg border border-primary dark:border-blue-600 mx-4 h-96 overflow-y-auto scrollbar-hide lg:w-1/2 md:w-3/5 w-full" +
          ` ${className}`
        }
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
