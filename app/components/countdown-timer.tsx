'use client';

import { useEffect, useState } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LAUNCH_DATE = new Date('2026-08-22T00:00:00+07:00');

function calculate(): TimeLeft {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
          fontWeight: 700,
          color: 'var(--color-accent)',
        }}
      >
        {String(value).padStart(2, '0')}
      </div>
      <span
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(calculate());
    const id = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-3 sm:gap-4">
      <Unit value={timeLeft.days} label="Hari" />
      <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 700, paddingBottom: '1.75rem' }}>:</span>
      <Unit value={timeLeft.hours} label="Jam" />
      <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 700, paddingBottom: '1.75rem' }}>:</span>
      <Unit value={timeLeft.minutes} label="Menit" />
      <span style={{ color: 'var(--color-accent)', fontSize: '1.5rem', fontWeight: 700, paddingBottom: '1.75rem' }}>:</span>
      <Unit value={timeLeft.seconds} label="Detik" />
    </div>
  );
}
