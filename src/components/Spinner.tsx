import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function Spinner({
  /* Standard settings */
  size = "md",
  className = "",
  text,
}: {
  /* Options */
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}) {
  /* Declare sizes */
  const sizeMap: Record<string, number> = { sm: 16, md: 24, lg: 40 };
  const loaderSize = sizeMap[size] ?? sizeMap.md;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <PacmanLoader color="#111827" size={loaderSize} loading={true} />
      {text && <span className="text-gray-500 text-sm">{text}</span>}
    </div>
  );
}
