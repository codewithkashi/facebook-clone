import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const DeleteRequestButton = ({
  userData,
  mutate,
  mutateAuth,
}: {
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  const deleteRequest = async () => {
    try {
      const response = await axios.post("/api/delete-request", {
        id: userData?._id,
      });
      if (response.status == 200) {
        toast.success(response.data);
        mutate();
        mutateAuth();
      }
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };
  return (
    <button onClick={deleteRequest} className="blue__button">
      Delete
    </button>
  );
};

export default DeleteRequestButton;
