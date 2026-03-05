"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type HeaderTimerProps = {
  initialSeconds?: number;
  onExpire: () => void;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function HeaderTimer({
  initialSeconds = 120,
  onExpire
}: HeaderTimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const didExpireRef = useRef(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          window.clearInterval(intervalId);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0 && !didExpireRef.current) {
      didExpireRef.current = true;
      onExpire();
    }
  }, [secondsLeft, onExpire]);

  const isCritical = secondsLeft > 0 && secondsLeft <= 30;
  const [minutes, seconds] = formatTime(secondsLeft).split(":");

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-offer-bg/95 px-4 py-2 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1216px] items-center justify-center gap-2">
        <p className="text-center text-[13px] font-semibold text-[#edfff3] min-[376px]:text-[14px] sm:text-sm">
          Успейте открыть пробную неделю
        </p>
      </div>
      <div className="mx-auto mt-0.5 flex w-full max-w-[1216px] items-center justify-center gap-2 sm:gap-3">
        <span className="text-[14px] text-timer min-[376px]:text-[16px]">✦</span>
        <div
          className={cn(
            "digits text-[28px] font-bold leading-none tracking-[0.02em] text-timer min-[376px]:text-[30px] sm:text-[32px]",
            isCritical && "animate-criticalTimer text-danger"
          )}
        >
          {minutes}
        </div>
        <div
          className={cn(
            "digits pb-0.5 text-[36px] font-bold leading-none text-timer min-[376px]:text-[40px] sm:text-[42px]",
            isCritical && "animate-criticalTimer text-danger"
          )}
        >
          :
        </div>
        <div
          className={cn(
            "digits text-[28px] font-bold leading-none tracking-[0.02em] text-timer min-[376px]:text-[30px] sm:text-[32px]",
            isCritical && "animate-criticalTimer text-danger"
          )}
        >
          {seconds}
        </div>
        <span className="text-[14px] text-timer min-[376px]:text-[16px]">✦</span>
      </div>
    </header>
  );
}
