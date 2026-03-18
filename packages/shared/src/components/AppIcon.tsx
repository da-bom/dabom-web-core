'use client';

import React, { useEffect, useState } from 'react';

import ChromeIcon from '../assets/icons/Chrome.svg';
import InstagramIcon from '../assets/icons/Instargram.svg';
import InternetIcon from '../assets/icons/Internet.svg';
import KakaoIcon from '../assets/icons/Kakao.svg';
import LineIcon from '../assets/icons/Line.svg';
import NaverIcon from '../assets/icons/Naver.svg';
import NetflixIcon from '../assets/icons/Netflex.svg';
import NetmarbleIcon from '../assets/icons/Netmarble.svg';
import NexonIcon from '../assets/icons/Nexon.svg';
import TiktokIcon from '../assets/icons/Tiktok.svg';
import WeatherIcon from '../assets/icons/Weather.svg';
import YoutubeIcon from '../assets/icons/Youtube.svg';

type AppIconType =
  | 'youtube'
  | 'kakao'
  | 'netflix'
  | 'naver'
  | 'chrome'
  | 'tiktok'
  | 'line'
  | 'instagram'
  | 'nexon'
  | 'netmarble'
  | 'weather'
  | 'internet';

interface AppIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  type: AppIconType;
  sx?: React.CSSProperties;
}

const AppIcon = ({ type, sx, style, ...props }: AppIconProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SelectedComponent = (() => {
    switch (type) {
      case 'youtube':
        return YoutubeIcon;
      case 'kakao':
        return KakaoIcon;
      case 'netflix':
        return NetflixIcon;
      case 'naver':
        return NaverIcon;
      case 'chrome':
        return ChromeIcon;
      case 'tiktok':
        return TiktokIcon;
      case 'line':
        return LineIcon;
      case 'instagram':
        return InstagramIcon;
      case 'nexon':
        return NexonIcon;
      case 'netmarble':
        return NetmarbleIcon;
      case 'weather':
        return WeatherIcon;
      case 'internet':
        return InternetIcon;
      default:
        return null;
    }
  })();

  if (!SelectedComponent) return null;

  const src =
    (SelectedComponent as unknown as { src?: string })?.src ??
    (SelectedComponent as unknown as string);

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={`${type}-icon`} style={{ ...style, ...sx }} {...props} />;
};

export default AppIcon;
