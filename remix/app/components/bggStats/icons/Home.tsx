import React from "react";

type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Home({
  width = 24,
  strokeWidth = 2,
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-home ${className}`}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      stroke-width={strokeWidth}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <polyline points="5 12 3 12 12 3 21 12 19 12"></polyline>
      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
    </svg>
  );
}
