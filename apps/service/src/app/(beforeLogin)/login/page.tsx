'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ErrorIcon } from '@icons';
import { Button, InputField } from '@shared';

import { useServiceLogin } from 'src/api/auth/useServiceLogin';
import { usePushSubscription } from 'src/hooks/usePushSubscription';

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const { mutateAsync: login, isPending: isLoading } = useServiceLogin();
  const { subscribe } = usePushSubscription();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phoneNumber || !password) {
      alert('전화번호와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await login({ phoneNumber, password });
      await subscribe();
      router.push('/home');
    } catch (error) {
      console.error('로그인 실패:', error);
      setIsLoginFailed(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex w-full flex-col items-center px-5">
        <form onSubmit={(e) => handleLogin(e)} className="flex h-full flex-col items-center gap-30">
          <div className="flex h-75 w-full flex-col gap-10">
            <InputField
              label="전화번호"
              type="tel"
              placeholder="전화번호를 입력해주세요"
              value={phoneNumber}
              onValueChange={(value) => setPhoneNumber(value)}
            />

            <InputField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onValueChange={(value) => {
                setPassword(value);
                setIsLoginFailed(false);
              }}
            />

            {isLoginFailed && (
              <div className="flex flex-row items-center justify-center gap-1">
                <ErrorIcon sx={{ fontSize: 14 }} className="text-negative" />
                <span className="text-body2-m text-negative">
                  아이디 또는 비밀번호가 일치하지 않습니다.
                </span>
              </div>
            )}
          </div>

          <div className="flex w-full justify-center">
            <Button type="submit" size="lg" color="dark" disabled={isLoading}>
              로그인
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
