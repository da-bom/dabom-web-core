import * as React from "react";
import type { SVGProps } from "react";

const SvgPolicy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.85 2.25C4.86517 2.25 4.05 3.06517 4.05 4.05V18.45C4.05 19.4348 4.86517 20.25 5.85 20.25H16.65C17.6348 20.25 18.45 19.4348 18.45 18.45V7.65L13.05 2.25H5.85ZM5.85 4.05H12.15V8.55H16.65V18.45H5.85V4.05ZM7.65 11.25V13.05H14.85V11.25H7.65ZM7.65 14.85V16.65H14.85V14.85H7.65Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPolicy;
