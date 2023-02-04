type Props = {
  width?: number;
  strokeWidth?: number;
  className?: string;
};
export default function Trophy({
  width = 24,
  strokeWidth = 2,
  className = "",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon icon-tabler icon-tabler-trophy ${className}`}
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
      <path d="M8 21l8 0"></path>
      <path d="M12 17l0 4"></path>
      <path d="M7 4l10 0"></path>
      <path d="M17 4v8a5 5 0 0 1 -10 0v-8"></path>
      <path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
      <path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
    </svg>
  );
}
