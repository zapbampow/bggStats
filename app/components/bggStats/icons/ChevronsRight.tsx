type Props = {
  width?: number;
  className?: string;
};

export default function ChevronsRight({ className, width = 24 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} icon icon-tabler icon-tabler-chevrons-right`}
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
      <polyline points="7 7 12 12 7 17"></polyline>
      <polyline points="13 7 18 12 13 17"></polyline>
    </svg>
  );
}
