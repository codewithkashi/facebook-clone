"use client";
import { SavedCard } from "@components";
import useSaved from "@hooks/useSaved";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import React, { useMemo } from "react";

const Saved = () => {
  const { data: saved, mutate, isLoading } = useSaved();
  return (
    <div className="flex flex-col w-full lg:w-[50%] py-4 px-4 lg:px-16">
      {saved &&
        saved.map((e: Record<string, any>) => (
          <SavedCard data={e} mutate={mutate} key={e._id} />
        ))}
    </div>
  );
};

export default Saved;
