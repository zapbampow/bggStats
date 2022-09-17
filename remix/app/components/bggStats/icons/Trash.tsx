import type { ReactElement } from "react";

type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Trash({
  width = 24,
  className,
  strokeWidth = 2,
}: Props): ReactElement<any, any> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-trash`}
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
      <line x1={4} y1={7} x2={20} y2={7}></line>
      <line x1={10} y1={11} x2={10} y2={17}></line>
      <line x1={14} y1={11} x2={14} y2={17}></line>
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
    </svg>
  );
}
