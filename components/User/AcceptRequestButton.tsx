"use client";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const AcceptRequestButton = ({
  userData,
  mutate,
  mutateAuth,
}: {
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  const acceptRequest = async () => {
    try {
      const response = await axios.post("/api/accept-request", {
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
    <button onClick={acceptRequest} className="blue__button">
      Confirm
    </button>
  );
};

export default AcceptRequestButton;
