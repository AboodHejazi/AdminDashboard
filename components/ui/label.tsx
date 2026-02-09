"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      className={cn(
        "text-sm font-medium text-gray-700 dark:text-gray-200",
        className
      )}
      {...props}
    />
  );
};
