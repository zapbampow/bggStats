import type { ReactElement } from "react";

type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Send({
  width = 24,
  className,
  strokeWidth = 2,
}: Props): ReactElement<any, any> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-send ${className}`}
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
      <line x1={10} y1={14} x2={21} y2={3}></line>
      <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5"></path>
    </svg>
  );
}
