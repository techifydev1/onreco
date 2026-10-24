"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

import { demoPage } from "../content";
import { Icon } from "./Icon";

type Clip = {
  id: string;
  title: string;
  blurb: string;
  src: string;
  poster: string;
  duration: string;
};

const items: Clip[] = [{ ...demoPage.tour }, ...demoPage.chapters];

export function DemoPlayer() {
  const [activeId, setActiveId] = useState(demoPage.tour.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  const videoRef = useRef<HTMLVideoElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => {});
  }, [activeId]);

  const select = (id: string) => {
    if (id === activeId) {
      void videoRef.current?.play().catch(() => {});
      return;
    }
    setActiveId(id);
    shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-7">
      <div
        ref={shellRef}
        className="scroll-mt-30 rounded-shell bg-paper-warm p-3 shadow-[0_18px_50px_-8px_rgba(36,60,48,0.07)]"
      >
        <div className="overflow-hidden rounded-frame border border-hairline bg-paper-card">
          <div className="flex h-11 items-center justify-between border-b border-hairline px-4.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
              <span className="truncate text-[10px] font-semibold tracking-[0.08em] text-stone">
                {demoPage.player.label}
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-3 text-[10px] text-stone">
              <span className="hidden min-[701px]:inline">{demoPage.player.note}</span>
              <span className="rounded-sm bg-sage px-1.75 py-0.75 tabular-nums">{active.duration}</span>
            </div>
          </div>

          <div className="bg-forest-deep">
            <video
              key={active.src}
              ref={videoRef}
              src={active.src}
              poster={active.poster}
              controls
              playsInline
              preload="metadata"
              className="block aspect-[8/5] w-full"
            >
              Your browser does not support embedded video.
            </video>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-hairline px-4.5 py-3">
            <span className="truncate text-[12px] font-medium text-ink">{active.title}</span>
            <a
              href={active.src}
              download
              className="inline-flex shrink-0 items-center gap-1.5 text-[12px] text-forest transition-opacity duration-200 hover:opacity-75"
            >
              {demoPage.player.download}
              <Icon name="arrow-down-left" size={13} />
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
            Chapters
          </span>
          <span className="text-[11px] text-stone tabular-nums">
            {active.id === "tour" ? "Full tour" : `${active.id} / 13`}
          </span>
        </div>

        <ul className="grid grid-cols-3 gap-x-6 max-[961px]:grid-cols-2 max-[700px]:grid-cols-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id} className="border-t border-hairline">
                <button
                  type="button"
                  onClick={() => select(item.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "group flex w-full items-start gap-3 py-3.5 text-left transition-colors duration-200",
                    isActive ? "text-forest" : "text-ink hover:text-forest",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 w-5 shrink-0 text-[10px] tabular-nums",
                      isActive ? "text-forest" : "text-stone",
                    )}
                  >
                    {item.id === "tour" ? "ALL" : item.id}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="truncate text-[13px] font-medium">{item.title}</span>
                      <span className="shrink-0 text-[10px] text-stone tabular-nums">
                        {item.duration}
                      </span>
                    </span>
                    <span className="text-[12px] leading-[1.5] text-moss">{item.blurb}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
