import React, { useState } from "react";
import Modal from "../../modal/Modal";
import SearchFilter from "./SearchFilter";
import Search from "@/components/icons/Search";
import { useTranslations } from "next-intl";

const MySearch = ({ forToolbar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations("HomePage");

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="p-2 rounded-secondary bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <Search className="w-6 h-6" />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="z-50"
      >
        <div className="flex flex-col gap-y-4 h-full">
          <p className="text-2xl drop-shadow">{t("search.title")}</p>
          <SearchFilter setIsModalOpen={setIsModalOpen} />
        </div>
      </Modal>
    </>
  );
};

export default MySearch;
