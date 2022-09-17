import type { ReactElement } from "react";

type Props = {
  width?: number;
  className?: string;
};

export default function Backspace({
  width,
  className,
}: Props): ReactElement<any, any> {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-backspace`}
      width={width}
      height={width}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M20 6a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-11l-5 -5a1.5 1.5 0 0 1 0 -2l5 -5z"></path>
      <path d="M12 10l4 4m0 -4l-4 4"></path>
    </svg>
  );
}
