"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonAdd } from "react-icons/bs";

const AcceptRequestButton = ({
  userData,
  mutate,
  mutateAuth,
}: {
  userData: Record<string, any>;
  mutate: any;
  mutateAuth: any;
}) => {
  const [loading, setLoading] = useState(false);
  const acceptRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/accept-request", {
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
    <button onClick={acceptRequest} className="blue__button" disabled={loading}>
      <BsPersonAdd />
      Confirm
    </button>
  );
};

export default AcceptRequestButton;
