'use client';

import React, { useState } from 'react';

import { DoNotIcon } from '@icons';
import { AppIcon, Divider, DropDown, MainBox } from '@shared';
import { cn } from '@shared';

import { Toggle } from 'src/components/common/Toggle';

interface BlockedApp {
  id: number;
  name: string;
  appId: string;
  type: React.ComponentProps<typeof AppIcon>['type'];
}

export const AppBlockBox = () => {
  const [isAppBlockOn, setIsAppBlockOn] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState('');

  const allApps: {
    name: string;
    appId: string;
    type: React.ComponentProps<typeof AppIcon>['type'];
  }[] = [
    { name: '유튜브', appId: 'com.youtube.app', type: 'youtube' },
    { name: '넷플릭스', appId: 'com.netflix.app', type: 'netflix' },
    { name: '인스타그램', appId: 'com.instagram.app', type: 'instagram' },
    { name: '틱톡', appId: 'com.tiktok.app', type: 'tiktok' },
    { name: '넥슨', appId: 'com.nexon.game', type: 'nexon' },
    { name: '넷마블', appId: 'com.netmarble.game', type: 'netmarble' },
    { name: '카카오톡', appId: 'com.kakao.talk', type: 'kakao' },
    { name: '라인', appId: 'com.line.app', type: 'line' },
    { name: '크롬', appId: 'com.chrome.browser', type: 'chrome' },
    { name: '삼성 인터넷', appId: 'com.samsung.browser', type: 'internet' },
  ];

  const [blockedApps, setBlockedApps] = useState<BlockedApp[]>([
    { id: 1, name: '유튜브', appId: 'com.youtube.app', type: 'youtube' },
  ]);

  const appOptions = allApps
    .filter((app) => !blockedApps.some((blocked) => blocked.appId === app.appId))
    .map((app) => app.name);

  const handleSelectApp = (appName: string) => {
    setSelectedApp(appName);
    const appToAdd = allApps.find((app) => app.name === appName);

    if (appToAdd && !blockedApps.find((app) => app.appId === appToAdd.appId)) {
      const newBlockedApp: BlockedApp = {
        id: Date.now(),
        name: appToAdd.name,
        appId: appToAdd.appId,
        type: appToAdd.type,
      };
      setBlockedApps((prev) => [...prev, newBlockedApp]);

      const currentPolicyValue = {
        blockedApps: [...blockedApps, newBlockedApp].map((app) => app.appId),
      };
      console.log('APP_BLOCK 정책 반영 데이터:', JSON.stringify(currentPolicyValue));
    }
  };

  const handleUnblock = (appId: string) => {
    setBlockedApps((prev) => prev.filter((app) => app.appId !== appId));

    const updatedPolicyValue = {
      blockedApps: blockedApps.filter((app) => app.appId !== appId).map((app) => app.appId),
    };
    console.log('APP_BLOCK 정책 업데이트(해제):', JSON.stringify(updatedPolicyValue));
  };

  const renderAppOption = (appName: string) => {
    const app = allApps.find((a) => a.name === appName);
    if (!app) return appName;
    return (
      <div className="flex flex-row items-center gap-3">
        <div className="bg-brand-white relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-[7px]">
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
                  onClick={() => handleUnblock(app.appId)}
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
