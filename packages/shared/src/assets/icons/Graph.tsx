import * as React from "react";
import type { SVGProps } from "react";
const SvgGraph = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="none" {...props}><path fill="currentColor" d="M0 10V3.125h2.5V10zm3.75 0V0h2.5v10zm3.75 0V5.625H10V10z" /></svg>;
export default SvgGraph;