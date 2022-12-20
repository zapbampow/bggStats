type Props = {
  width?: number;
  className?: string;
};

export default function Selector({ width = 24, className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-selector`}
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
      <polyline points="8 9 12 5 16 9"></polyline>
      <polyline points="16 15 12 19 8 15"></polyline>
    </svg>
  );
}
