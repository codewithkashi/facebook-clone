"use client";
import React from "react";

const EditButton = ({ setEdit }: { setEdit: any }) => {
  return (
    <button onClick={() => setEdit(true)} className="blue__button">
      Edit
    </button>
  );
};

export default EditButton;
