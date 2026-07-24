'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { LAUNCH_DATE } from '@/constants';

const LAUNCH_TIME = new Date(LAUNCH_DATE).getTime();

export default function PageGate({
  fallback,
  children,
}: {
  fallback: ReactNode;
  children: ReactNode;
}) {
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const check = () => setLaunched(Date.now() >= LAUNCH_TIME);
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  return launched ? <>{children}</> : <>{fallback}</>;
}
