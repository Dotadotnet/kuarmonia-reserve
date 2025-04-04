import React from "react";
import { NavLink } from "react-router-dom";
import Edit from "@/components/icons/Edit";

const AddButton = ({ link, onClick }) => {
  const ButtonComponent = link ? NavLink : "a";

  return (
    <ButtonComponent
      to={link}
      onClick={!link ? onClick : undefined}
      className="edit-button"
    >
      <Edit className="w-5 h-5" />
    </ButtonComponent>
  );
};

export default AddButton;
