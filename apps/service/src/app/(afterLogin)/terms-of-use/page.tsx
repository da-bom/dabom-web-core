'use client';

import { useState } from 'react';

import { cn } from '@shared';

import { TERMS } from 'src/data/terms-of-use';

const TermsPage = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleSection = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1 border-b pb-4">
        <h1 className="text-display2-d font-bold text-gray-900">{TERMS.title}</h1>
        <div className="text-body3-d flex gap-3 text-gray-500">
          <span>버전 {TERMS.version}</span>
          <span>시행일 {TERMS.effectiveDate}</span>
        </div>
      </div>

      <div className="flex flex-col overflow-hidden rounded-lg border border-gray-100">
        {TERMS.sections.map((section) => {
          const isOpen = openId === section.id;

          return (
            <div key={section.id} className="border-b border-gray-100 last:border-none">
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'flex w-full items-center justify-between p-4 text-left transition-all',
                  isOpen ? 'bg-brand-primary/5 text-brand-primary' : 'bg-white hover:bg-gray-50',
                )}
              >
                <span className="text-body1-d font-semibold">{section.article}</span>
                <span className={cn('transition-transform duration-200', isOpen && 'rotate-180')}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="bg-brand-white text-body2-d animate-in fade-in slide-in-from-top-1 p-5 leading-relaxed text-gray-700">
                  {Array.isArray(section.content) ? (
                    <div className="flex flex-col gap-2">
                      {section.content.map((item, idx) => (
                        <p key={idx} className="whitespace-pre-line">
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="whitespace-pre-line">{section.content}</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-body3-d mt-4 text-center text-gray-400">
        본 서비스의 약관에 관한 문의는 고객센터로 연락 부탁드립니다.
      </div>
    </div>
  );
};

export default TermsPage;
