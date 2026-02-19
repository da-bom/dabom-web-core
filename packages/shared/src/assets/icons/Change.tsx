import * as React from "react";
import type { SVGProps } from "react";

const SvgChange = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 11 11"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M5.5 11a5.3 5.3 0 0 1-2.575-.637A5.6 5.6 0 0 1 1 8.663V10H0V7h3v1H1.763q.6.9 1.58 1.45.982.55 2.157.55.937 0 1.756-.356a4.6 4.6 0 0 0 1.425-.963q.606-.606.963-1.425A4.4 4.4 0 0 0 10 5.5h1a5.3 5.3 0 0 1-.431 2.138 5.6 5.6 0 0 1-1.182 1.75q-.75.75-1.75 1.18A5.3 5.3 0 0 1 5.5 11M0 5.5q0-1.137.431-2.137a5.6 5.6 0 0 1 1.182-1.75q.75-.75 1.75-1.182A5.3 5.3 0 0 1 5.5 0q1.4 0 2.575.638A5.6 5.6 0 0 1 10 2.338V1h1v3H8V3h1.238q-.6-.9-1.582-1.45A4.34 4.34 0 0 0 5.5 1q-.937 0-1.756.356a4.6 4.6 0 0 0-1.425.963q-.606.606-.963 1.425A4.4 4.4 0 0 0 1 5.5z"
    />
  </svg>
);
export default SvgChange;
