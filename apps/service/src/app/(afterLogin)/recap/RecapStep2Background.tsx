'use client';

import React from 'react';

export function CrystalSkyBackground() {
  return (
    <div className="bg-recap-morning-base fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[30%] -left-[20%] h-[900px] w-[900px] rounded-full bg-white opacity-50 blur-[130px]" />
      <div className="bg-opalescent-mint absolute -top-[10%] left-[10%] h-[600px] w-[600px] rounded-full opacity-40 blur-[120px]" />
      <div className="bg-recap-morning-glow-1 absolute top-[0%] left-[40%] h-[500px] w-[500px] rounded-full opacity-30 blur-[140px]" />
      <div className="bg-recap-morning-glow-2 absolute -right-[15%] -bottom-[20%] h-[900px] w-[900px] rounded-full opacity-50 blur-[160px]" />
      <div className="bg-recap-morning-glow-3 absolute right-[15%] bottom-[5%] h-[650px] w-[650px] rounded-full opacity-30 blur-[140px]" />
      <div className="absolute top-[30%] right-[25%] h-[400px] w-[400px] rounded-full bg-white opacity-20 blur-[100px]" />
    </div>
  );
}

export function DeepBlueLuminousBackground() {
  return (
    <div className="bg-recap-night-base fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[25%] -left-[20%] h-[800px] w-[800px] rounded-full bg-white opacity-20 blur-[130px]" />
      <div className="bg-opalescent-mint absolute -top-[10%] left-[0%] h-[600px] w-[600px] rounded-full opacity-15 blur-[120px]" />
      <div className="bg-recap-night-glow-1 absolute top-[0%] left-[30%] h-[500px] w-[500px] rounded-full opacity-10 blur-[140px]" />
      <div className="bg-recap-night-glow-2 absolute -right-[15%] -bottom-[20%] h-[900px] w-[900px] rounded-full opacity-40 blur-[160px]" />
      <div className="bg-recap-night-glow-3 absolute right-[10%] bottom-[5%] h-[650px] w-[650px] rounded-full opacity-25 blur-[140px]" />
      <div className="bg-opalescent-blue absolute top-[10%] -right-[10%] h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]" />
    </div>
  );
}
