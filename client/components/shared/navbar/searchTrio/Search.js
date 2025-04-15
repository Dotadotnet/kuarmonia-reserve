import React, { useState } from "react";
import Modal from "../../modal/Modal";
import SearchFilter from "./SearchFilter";
import HighlightText from "../../highlightText/HighlightText";
import Search from "@/components/icons/Search";

const MySearch = ({ forToolbar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        onClick={openModal}
        className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800  hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
         >
        <Search className="w-6 h-6" />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className=" z-50 "
      >
        <div className="flex flex-col gap-y-4 h-full">
          <p className="text-2xl drop-shadow">
            جستجوی <HighlightText>مطلب مورد نظر</HighlightText>
          </p>
          <SearchFilter setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </>
  );
};

export default MySearch;
