type Props = {
  width?: number;
  className?: string;
};

export default function HomeMeeple({ width, className }: Props) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 6.35 6.35"
      className={`${className}`}
    >
      <g
        transform="translate(-93.728 -136.52)"
        style={{
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 0.61736,
          stroke: "currentColor",
          fill: "none",
        }}
      >
        <path d="m93.198 135.99h7.4083v7.4083h-7.4083z" />
        <polyline
          transform="matrix(.30868 0 0 .30868 93.198 135.99)"
          points="5 12 3 12 12 3 21 12 19 12"
          strokeWidth={1.75}
        />
        <path d="m94.742 139.69v2.1608a0.61736 0.61736 0 0 0 0.61736 0.61736h3.0868a0.61736 0.61736 0 0 0 0.61736-0.61736v-2.1608" />
        <g
          transform="matrix(.18649 0 0 .18649 94.665 138.54)"
          style={{ fill: "currentColor", strokeWidth: 0 }}
        >
          <path d="m9 20h-5a1 1 0 0 1-1-1c0-2 3.378-4.907 4-6-1 0-4-0.5-4-2 0-2 4-3.5 6-4 0-1.5 0.5-4 3-4s3 2.5 3 4c2 0.5 6 2 6 4 0 1.5-3 2-4 2 0.622 1.093 4 4 4 6a1 1 0 0 1-1 1h-5c-1 0-2-4-3-4s-2 4-3 4z" />
        </g>
      </g>
    </svg>
  );
}

export function HomeMeeple2({ width, className }: Props) {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 6.35 6.35"
      className={`${className}`}
    >
      <g
        transform="translate(-94.986 -126.45)"
        style={{
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 0.55856,
          stroke: "currentColor",
          fill: "none",
        }}
      >
        <path d="m99.896 129.53h0.55856l-2.5135-2.5135-2.5135 2.5135h0.55857v1.955a0.55856 0.55856 0 0 0 0.55856 0.55857h1.3964" />
        <path d="m97.103 132.05v-1.6757a0.55856 0.55856 0 0 1 0.55856-0.55857h0.55856c0.17902 0 0.33849 0.0843 0.44071 0.21533" />
        <g transform="matrix(.12289 0 0 .12289 98.458 129.88)">
          <path
            d="m9 20h-5a1 1 0 0 1-1-1c0-2 3.378-4.907 4-6-1 0-4-0.5-4-2 0-2 4-3.5 6-4 0-1.5 0.5-4 3-4s3 2.5 3 4c2 0.5 6 2 6 4 0 1.5-3 2-4 2 0.622 1.093 4 4 4 6a1 1 0 0 1-1 1h-5c-1 0-2-4-3-4s-2 4-3 4z"
            style={{ strokeWidth: 3.4359 }}
          />
        </g>
      </g>
    </svg>
  );
}
