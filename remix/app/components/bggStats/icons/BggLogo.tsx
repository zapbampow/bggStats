import React from "react";

type Props = {
  width?: number;
  height?: number;
};
export default function BggLogo({ width, height }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 26 38`}
    >
      <g fill="none" fill-rule="evenodd">
        <polygon
          // fill="#FF5100"
          // stroke="#ff5100"
          stroke="	#334155"
          strokeWidth={3}
          points="24.87 7.01 21.107 8.035 24.792 0 .9 8.794 2.206 19.327 0 21.454 6.577 37.93 20.558 32.779 25.418 21.37 23.331 19.358"
        />
      </g>
    </svg>
  );
}
