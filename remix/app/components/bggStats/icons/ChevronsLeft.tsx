type Props = {
  width?: number;
  className?: string;
};

export default function ChevronsLeft({ className, width = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-chevrons-left`}
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
      <polyline points="11 7 6 12 11 17"></polyline>
      <polyline points="17 7 12 12 17 17"></polyline>
    </svg>
  );
}
