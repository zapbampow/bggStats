type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function SignRight({
  width = 24,
  strokeWidth = 2,
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-sign-right ${className}`}
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
      <path d="M8 21h4"></path>
      <path d="M10 21v-10"></path>
      <path d="M10 6v-3"></path>
      <path d="M6 6h10l2 2.5l-2 2.5h-10z"></path>
    </svg>
  );
}
