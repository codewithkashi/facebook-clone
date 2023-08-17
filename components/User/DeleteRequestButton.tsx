"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";
const DeleteRequestButton = ({
  userData,
  mutate,
  mutateAuth,
}: {
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  const [loading, setLoading] = useState(false);
  const deleteRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/delete-request", {
        id: userData?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
        mutateAuth();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button onClick={deleteRequest} className="blue__button" disabled={loading}>
      <CiCircleRemove />
      Delete
    </button>
  );
};

export default DeleteRequestButton;
