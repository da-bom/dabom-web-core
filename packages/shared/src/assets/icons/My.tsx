import * as React from "react";
import type { SVGProps } from "react";

const SvgMy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={1.333}
      d="M8 10.667c1.252 0 3.167.319 4.753.954.792.317 1.46.698 1.92 1.122.455.42.66.837.66 1.257v1.333H.667V14c0-.42.205-.837.66-1.257.46-.424 1.128-.805 1.92-1.122 1.586-.635 3.501-.954 4.753-.954Zm0-10A3.33 3.33 0 0 1 11.333 4 3.33 3.33 0 0 1 8 7.333 3.33 3.33 0 0 1 4.667 4 3.33 3.33 0 0 1 8 .667Z"
    />
  </svg>
);
export default SvgMy;
