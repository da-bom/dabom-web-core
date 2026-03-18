'use client';

import { useCustomerMe } from 'src/api/auth/useCustomerMe';

export default function UserInitializer() {
  useCustomerMe();

  return null;
}
