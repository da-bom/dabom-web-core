'use client';

import React from 'react';

export default function BalancedOpalescentBackground() {
  return (
    <div className="bg-primary-50 fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-opalescent-pink absolute -bottom-[20%] -left-[10%] h-[800px] w-[800px] rounded-full opacity-70 blur-[150px]" />
      <div className="bg-opalescent-purple absolute -right-[15%] bottom-[10%] h-[700px] w-[700px] rounded-full opacity-60 blur-[140px]" />
      <div className="bg-opalescent-mint absolute bottom-[30%] left-[10%] h-[650px] w-[650px] rounded-full opacity-50 blur-[130px]" />
      <div className="bg-opalescent-blue absolute right-[20%] bottom-[45%] h-[500px] w-[500px] rounded-full opacity-40 blur-[110px]" />
      <div className="bg-opalescent-yellow absolute bottom-[20%] left-[40%] h-[600px] w-[600px] rounded-full opacity-65 blur-[140px]" />
      <div className="absolute -top-[15%] right-[10%] h-[450px] w-[450px] rounded-full bg-white opacity-30 blur-[90px]" />
    </div>
  );
}
