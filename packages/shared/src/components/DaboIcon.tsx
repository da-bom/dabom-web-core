'use client';

import React, { useEffect, useState } from 'react';

import DaboBlockedIcon from '../assets/icons/DaboBlockedIcon.svg';
import DaboBombIcon from '../assets/icons/DaboBombIcon.svg';
import DaboDefaultIcon from '../assets/icons/DaboDefaultIcon.svg';
import DaboHurtIcon from '../assets/icons/DaboHurtIcon.svg';
import DaboLovedIcon from '../assets/icons/DaboLovedIcon.svg';
import DaboSadIcon from '../assets/icons/DaboSadIcon.svg';

interface DaboIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  usage?: number;
  isBlocked?: boolean;
}

const DaboIcon = ({ usage = 0, isBlocked, ...props }: DaboIconProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const SelectedComponent = (() => {
    if (isBlocked) return DaboBlockedIcon;
    if (usage >= 81) return DaboLovedIcon;
    if (usage >= 51) return DaboDefaultIcon;
    if (usage >= 31) return DaboSadIcon;
    if (usage >= 1) return DaboHurtIcon;
    return DaboBombIcon;
  })();

  const src =
    (SelectedComponent as unknown as { src?: string })?.src ??
    (SelectedComponent as unknown as string);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="dabo-icon" {...props} />;
};

export default DaboIcon;
