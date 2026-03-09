declare module '*.svg' {
  import React from 'react';

  interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
  }

  const content: React.FC<React.SVGProps<SVGSVGElement>> & StaticImageData;
  export default content;
}

declare module '*.svg?react' {
  import React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}
