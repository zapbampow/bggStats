import React from "react";
type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};
export default function QuestionCircle({
  width = 24,
  className,
  strokeWidth = 2,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-question-circle ${className}`}
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
      <path d="M12 16v.01m0 -3.01a2 2 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483m1.5 2.299m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
    </svg>
  );
}
