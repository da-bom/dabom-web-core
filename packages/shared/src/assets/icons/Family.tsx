import * as React from "react";
import type { SVGProps } from "react";

const SvgFamily = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={23}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeWidth={2.25}
      d="M8.625 13.5c1.11 0 2.844.288 4.27.86.713.285 1.278.613 1.647.954.361.333.458.6.458.811v1.688H2.25v-1.688c0-.21.096-.478.458-.812.369-.34.934-.668 1.646-.954 1.427-.571 3.16-.859 4.27-.859Zm10.42.995c1.092.569 1.392 1.097 1.392 1.443v1.687h-1.5v-1.687c0-.59-.1-1.13-.273-1.628q.198.09.382.185ZM8.438 4.875a2.625 2.625 0 1 1 0 5.25 2.625 2.625 0 0 1 0-5.25Zm6.25.077a2.622 2.622 0 0 1 0 5.095 6.7 6.7 0 0 0 .5-2.547c0-.9-.178-1.761-.5-2.548Z"
    />
  </svg>
);
export default SvgFamily;
