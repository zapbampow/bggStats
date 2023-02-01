import React from "react";

type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Info({
  width = 24,
  strokeWidth = 2,
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-info-circle ${className}`}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M12 8l.01 0"></path>
      <path d="M11 12l1 0l0 4l1 0"></path>
    </svg>
  );
}
