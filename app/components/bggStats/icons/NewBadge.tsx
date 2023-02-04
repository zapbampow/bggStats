export default function NewBadge({
  width,
  strokeWidth = 2,
  className,
}: {
  width?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={width}
      height={width}
      version="1.1"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="matrix(1.1322 0 0 1.1322 .36641 -.034692)">
        <g
          transform="matrix(.40967 -.23962 .23962 .40967 6.0992 6.4797)"
          style={{
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: strokeWidth,
            stroke: "currentColor",
          }}
        >
          <path d="m9 8 1 8 2-5 2 5 1-8" />
        </g>
        <g
          transform="matrix(.40967 -.23962 .23962 .40967 2.6399 8.7343)"
          style={{
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: strokeWidth,
            stroke: "currentColor",
          }}
        >
          <path d="m14 8h-4v8h4" />
          <path d="m10 12h2.5" />
        </g>
        <g
          transform="matrix(.40967 -.23962 .23962 .40967 -1.1393 10.945)"
          style={{
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: strokeWidth,
            stroke: "currentColor",
          }}
        >
          <path d="m10 16v-8l4 8v-8" />
        </g>
      </g>
      <g
        transform="matrix(1.0428 0 0 1.0428 -2.0377 -1.881)"
        style={{
          fill: "none",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: strokeWidth,
          stroke: "currentColor",
        }}
      >
        <path
          d="m5.3985 7.7851a2.529 2.529 0 0 1 2.529-2.529h1.1495a2.529 2.529 0 0 0 1.7818-0.73571l0.80468-0.80468a2.529 2.529 0 0 1 3.5866 0l0.80468 0.80468c0.47361 0.47131 1.1151 0.73571 1.7818 0.73571h1.1495a2.529 2.529 0 0 1 2.529 2.529v1.1495c0 0.66674 0.2644 1.3082 0.73571 1.7818l0.80468 0.80468a2.529 2.529 0 0 1 0 3.5866l-0.80468 0.80468a2.529 2.529 0 0 0-0.73571 1.7818v1.1495a2.529 2.529 0 0 1-2.529 2.529h-1.1495a2.529 2.529 0 0 0-1.7818 0.73571l-0.80468 0.80468a2.529 2.529 0 0 1-3.5866 0l-0.80468-0.80468a2.529 2.529 0 0 0-1.7818-0.73571h-1.1495a2.529 2.529 0 0 1-2.529-2.529v-1.1495a2.529 2.529 0 0 0-0.73571-1.7818l-0.80468-0.80468a2.529 2.529 0 0 1 0-3.5866l0.80468-0.80468a2.529 2.529 0 0 0 0.73571-1.7818v-1.1495"
          style={{ strokeWidth: 2.2991 }}
        />
      </g>
    </svg>
  );
}
