import { SvgIconProps } from "@mui/material";

import DaboBlockedIcon from "../assets/svgs/DaboBlockedIcon.svg?react";
import DaboBombIcon from "../assets/svgs/DaboBombIcon.svg?react";
import DaboSmileIcon from "../assets/svgs/DaboDefaultIcon.svg?react";
import DaboHurtIcon from "../assets/svgs/DaboHurtIcon.svg?react";
import DaboLoveIcon from "../assets/svgs/DaboLovedIcon.svg?react";
import DaboSadIcon from "../assets/svgs/DaboSadIcon.svg?react";

interface DaboIconProps extends SvgIconProps {
  usage?: number;
  isBlocked?: boolean;
}

const DaboIcon = ({ usage = 0, isBlocked, ...props }: DaboIconProps) => {
  if (isBlocked) {
    return <DaboBlockedIcon {...props} />;
  }

  const SelectedIcon = (() => {
    if (usage >= 81) return DaboLoveIcon;
    if (usage >= 51) return DaboSmileIcon;
    if (usage >= 31) return DaboSadIcon;
    if (usage >= 1) return DaboHurtIcon;
    return DaboBombIcon;
  })();

  return <SelectedIcon {...props} />;
};

export default DaboIcon;
