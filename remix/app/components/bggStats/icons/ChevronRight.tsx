import React from "react";
type Props = {
  width?: number;
  className?: string;
};
export default function ChevronRight({ width, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-chevron-right`}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <polyline points="9 6 15 12 9 18"></polyline>
    </svg>
  );
}
