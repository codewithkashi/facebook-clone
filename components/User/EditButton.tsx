"use client";
import React from "react";
import { BiEdit } from "react-icons/bi";

const EditButton = ({ setEdit }: { setEdit: any }) => {
  return (
    <button onClick={() => setEdit(true)} className="blue__button">
      <BiEdit />
      Edit
    </button>
  );
};

export default EditButton;
