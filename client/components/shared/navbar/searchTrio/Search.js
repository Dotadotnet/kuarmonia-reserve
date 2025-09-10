import { useState } from "react";
import Modal from "../../modal/Modal";
import SearchFilter from "./SearchFilter";
import Search from "@/components/icons/Search";
import { useTranslations } from "next-intl";

const MySearch = ({setSearchIsOpen}) => {

  return (
    <>
      <div
        onClick={() => {
          setSearchIsOpen(true)
        }}
        className="p-2 cursor-pointer rounded-secondary bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <Search className="w-6 h-6" />
      </div>
    </>
  );
};

export default MySearch;
