'use client';

import React, { useState } from 'react';

import { DoNotIcon } from '@icons';
import { AppIcon, Divider, DropDown, MainBox } from '@shared';
import { cn } from '@shared';

import { Toggle } from 'src/components/common/Toggle';

interface BlockedApp {
  id: number;
  name: string;
  type: React.ComponentProps<typeof AppIcon>['type'];
}

export const AppBlockBox = () => {
  const [isAppBlockOn, setIsAppBlockOn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');

  const allApps: { name: string; type: React.ComponentProps<typeof AppIcon>['type'] }[] = [
    { name: 'Youtube', type: 'youtube' },
    { name: 'Instagram', type: 'instagram' },
    { name: '넥슨', type: 'nexon' },
    { name: '카카오톡', type: 'kakao' },
    { name: '넷플릭스', type: 'netflix' },
    { name: '네이버', type: 'naver' },
    { name: '크롬', type: 'chrome' },
    { name: '틱톡', type: 'tiktok' },
    { name: '라인', type: 'line' },
    { name: '넷마블', type: 'netmarble' },
    { name: '날씨', type: 'weather' },
    { name: '인터넷', type: 'internet' },
  ];

  const [blockedApps, setBlockedApps] = useState<BlockedApp[]>([
    { id: 1, name: 'Youtube', type: 'youtube' },
    { id: 2, name: 'Instagram', type: 'instagram' },
    { id: 3, name: '넥슨', type: 'nexon' },
  ]);

  const appOptions = allApps
    .filter((app) => !blockedApps.some((blocked) => blocked.name === app.name))
    .map((app) => app.name);

  const handleSelectApp = (appName: string) => {
    setSelectedApp(appName);
    const appToAdd = allApps.find((app) => app.name === appName);
    if (appToAdd && !blockedApps.find((app) => app.name === appName)) {
      setBlockedApps((prev) => [
        ...prev,
        { id: Date.now(), name: appToAdd.name, type: appToAdd.type },
      ]);
    }
  };

  const handleUnblock = (id: number) => {
    setBlockedApps((prev) => prev.filter((app) => app.id !== id));
  };

  const renderAppOption = (appName: string) => {
    const app = allApps.find((a) => a.name === appName);
    if (!app) return appName;
    return (
      <div className="flex flex-row items-center gap-3">
        <div className="bg-brand-white relative flex h-7 w-7 items-center justify-center overflow-hidden rounded">
          <AppIcon type={app.type} className="h-full w-full object-cover" />
        </div>
        <span>{app.name}</span>
      </div>
    );
  };

  return (
    <MainBox
      className={cn(
        'box-border flex w-[350px] flex-col items-start gap-5 rounded-2xl border border-gray-200 p-4 transition-all duration-200',
        isAppBlockOn ? 'h-fit' : 'h-31',
      )}
    >
      <div className="flex h-6 w-full flex-row items-center justify-between gap-1">
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-4 w-4 items-center justify-center">
            <DoNotIcon className="text-primary" sx={{ width: 16 }} />
          </div>
          <span className="text-body1-m">앱별 차단</span>
        </div>

        <Toggle isChecked={isAppBlockOn} onToggle={() => setIsAppBlockOn(!isAppBlockOn)} />
      </div>

      <div className="flex h-12 w-full">
        <DropDown
          isOpen={isDropdownOpen}
          setIsOpen={setIsDropdownOpen}
          options={appOptions}
          selectedOption="차단할 앱을 선택하세요."
          setSelectedOption={handleSelectApp}
          disabled={!isAppBlockOn}
          renderOption={renderAppOption}
          className="!w-full !min-w-0 rounded-2xl border border-gray-200"
        />
      </div>

      {isAppBlockOn && (
        <>
          <Divider />

          <span className="text-body1-m">차단된 앱 ({blockedApps.length})</span>

          <div className="flex h-fit w-full flex-col items-start gap-3">
            {blockedApps.map((app) => (
              <div key={app.id} className="flex w-full flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="bg-brand-white relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-[9.6px]">
                    <AppIcon type={app.type} className="h-full w-full object-cover" />
                  </div>
                  <span className="text-body2-m flex-none text-center">{app.name}</span>
                </div>
                <button
                  onClick={() => handleUnblock(app.id)}
                  className="text-caption-m text-gray-500"
                >
                  차단 해제
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </MainBox>
  );
};
