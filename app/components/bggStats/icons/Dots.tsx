type Props = {
  width?: number;
  className?: string;
  strokeWidth?: number;
};

export default function Dots({
  width = 24,
  strokeWidth = 2,
  className,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-dots ${className}`}
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
      <circle cx={5} cy={12} r={1}></circle>
      <circle cx={12} cy={12} r={1}></circle>
      <circle cx={19} cy={12} r={1}></circle>
    </svg>
  );
}
