import * as React from "react";
import type { SVGProps } from "react";

const SvgHome = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M7.027.778a.14.14 0 0 1 .167 0l6.223 4.667a.14.14 0 0 1 .056.11v9.334a.14.14 0 0 1-.14.139H9.777a.14.14 0 0 1-.138-.139v-4.444A1.64 1.64 0 0 0 8 8.805H6.223a1.64 1.64 0 0 0-1.64 1.64v4.444a.14.14 0 0 1-.139.139H.89a.14.14 0 0 1-.139-.139V5.555c0-.043.02-.084.056-.11z"
    />
  </svg>
);
export default SvgHome;
