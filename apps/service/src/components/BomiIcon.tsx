import React from "react";

import { Icon } from "@shared";

interface BomiIconProps {
  icon: number;
}

export const BomiIcon = ({ icon }: BomiIconProps) => {
  const iconName = (() => {
    switch (true) {
      case icon >= 81:
        return "four";
      case icon >= 51:
        return "three";
      case icon >= 31:
        return "two";
      case icon >= 1:
        return "one";
      default:
        return "zero";
    }
  })();

  return <Icon name={iconName} />;
};
