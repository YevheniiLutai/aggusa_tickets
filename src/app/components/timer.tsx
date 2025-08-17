'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const targetDate = new Date(2025, 8, 20, 12, 0, 0);

  const [text, setText] = useState("");

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) return null;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const updateText = () => {
      const timeLeft = getTimeRemaining();
      if (!timeLeft) {
        setText("The competition has started!");
      } else {
        setText(
          `Competition starts in: ${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`
        );
      }
    };

    updateText();
    const interval = setInterval(updateText, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer relative w-full overflow-hidden py-2 bg-blue-600 text-white">
      <div className="marquee-wrapper">
        <div className="marquee-content">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>{text}&nbsp;&nbsp;&nbsp;</span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          overflow: hidden;
          white-space: nowrap;
          width: 100%;
        }
        .marquee-content {
          display: inline-flex;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .timer {
          /* твій фон, можна змінити на будь-який колір або градієнт */
          background: #FFCB61;
          color: white;
          font-weight: bold;
          padding: 8px 0;
        }
      `}</style>
    </div>
  );
}