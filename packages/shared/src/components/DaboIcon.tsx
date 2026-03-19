'use client';

import React, { useEffect, useState } from 'react';

import DaboBlockedIcon from '../assets/icons/DaboBlockedIcon.svg';
import DaboBombIcon from '../assets/icons/DaboBombIcon.svg';
import DaboDefaultIcon from '../assets/icons/DaboDefaultIcon.svg';
import DaboGoodIcon from '../assets/icons/DaboGood.svg';
import DaboHurtIcon from '../assets/icons/DaboHurtIcon.svg';
import DaboSadIcon from '../assets/icons/DaboSadIcon.svg';
import DaboSmileIcon from '../assets/icons/DaboSmileIcon.svg';

interface DaboIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  usage?: number;
  isBlocked?: boolean;
  type?: 'blocked' | 'bomb' | 'default' | 'hurt' | 'smile' | 'sad' | 'good';
  sx?: React.CSSProperties;
}

const DaboIcon = ({ usage = 0, isBlocked, type, sx, style, ...props }: DaboIconProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SelectedComponent = (() => {
    if (isBlocked || type === 'blocked') return DaboBlockedIcon;
    if (type === 'bomb') return DaboBombIcon;
    if (type === 'hurt') return DaboHurtIcon;
    if (type === 'sad') return DaboSadIcon;
    if (type === 'default') return DaboDefaultIcon;
    if (type === 'smile') return DaboSmileIcon;
    if (type === 'good') return DaboGoodIcon;

    if (usage >= 81) return DaboSmileIcon;
    if (usage >= 51) return DaboDefaultIcon;
    if (usage >= 31) return DaboSadIcon;
    if (usage >= 1) return DaboHurtIcon;
    return DaboBombIcon;
  })();

  const src =
    (SelectedComponent as unknown as { src?: string })?.src ??
    (SelectedComponent as unknown as string);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="dabo-icon" style={{ ...style, ...sx }} {...props} />;
};

export default DaboIcon;
