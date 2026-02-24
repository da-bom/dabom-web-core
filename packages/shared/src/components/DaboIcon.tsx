"use client";

import React, { useEffect, useState } from "react";

import DaboBlockedIcon from "../assets/svgs/DaboBlockedIcon.svg";
import DaboBombIcon from "../assets/svgs/DaboBombIcon.svg";
import DaboDefaultIcon from "../assets/svgs/DaboDefaultIcon.svg";
import DaboHurtIcon from "../assets/svgs/DaboHurtIcon.svg";
import DaboLovedIcon from "../assets/svgs/DaboLovedIcon.svg";
import DaboSadIcon from "../assets/svgs/DaboSadIcon.svg";

interface DaboIconProps extends React.SVGProps<SVGSVGElement> {
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

  const IconComponent = SelectedComponent as React.ElementType;
  return <IconComponent {...props} />;
};

export default DaboIcon;
