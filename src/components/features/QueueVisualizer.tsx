"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Stage = "received" | "queued" | "sending" | "delivered" | "retry";

interface Token {
  id: number;
  stage: Stage;
  retried?: boolean;
}

/* ------------------------------------------------------------------ */
/*  Stage metadata                                                     */
/* ------------------------------------------------------------------ */

const stageMeta: Record<
  Exclude<Stage, "retry">,
  { label: string; color: string; bgClass: string; icon: React.ReactNode }
> = {
  received: {
    label: "Received",
    color: "#4ECDC4",
    bgClass: "bg-success/10 border-success/30",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
    ),
  },
  queued: {
    label: "Queued",
    color: "#FFD166",
    bgClass: "bg-accent/10 border-accent/30",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#FFD166" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="4" rx="1" />
        <rect x="3" y="10" width="18" height="4" rx="1" />
        <rect x="3" y="16" width="18" height="4" rx="1" />
      </svg>
    ),
  },
  sending: {
    label: "Sending",
    color: "#FF6B54",
    bgClass: "bg-primary/10 border-primary/30",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#FF6B54" strokeWidth="2" strokeLinecap="round">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  delivered: {
    label: "Delivered",
    color: "#4ECDC4",
    bgClass: "bg-success/10 border-success/30",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="#4ECDC4" strokeWidth="2" strokeLinecap="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
};

/* ------------------------------------------------------------------ */
/*  Message token component                                            */
/* ------------------------------------------------------------------ */

function MessageToken({ stage, retried }: { stage: Stage; retried?: boolean }) {
  const displayStage = stage === "retry" ? "queued" : stage;
  const meta = stageMeta[displayStage];

  return (
    <motion.div
      layout
      className={cn(
        "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-heading text-xs font-semibold shadow-sm",
        meta.bgClass
      )}
      style={{ color: meta.color }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Envelope icon */}
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
      <span className="whitespace-nowrap">SMS</span>
      {retried && (
        <span className="ml-0.5 rounded bg-warning/20 px-1 py-0.5 text-[10px] text-warning">
          retry
        </span>
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connector arrow (between stage columns)                            */
/* ------------------------------------------------------------------ */

function StageConnector({ vertical }: { vertical: boolean }) {
  return vertical ? (
    <div className="flex justify-center py-1">
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" className="text-border">
        <path
          d="M12 2 L12 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <path d="M7 20 L12 28 L17 20" fill="currentColor" />
      </svg>
    </div>
  ) : (
    <div className="flex items-center px-1">
      <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="text-border">
        <path
          d="M2 12 L32 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />
        <path d="M28 7 L36 12 L28 17" fill="currentColor" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Retry loop arrow                                                   */
/* ------------------------------------------------------------------ */

function RetryArrow({ vertical }: { vertical: boolean }) {
  if (vertical) {
    return (
      <div className="relative flex justify-center">
        <svg width="120" height="48" viewBox="0 0 120 48" fill="none" className="text-warning">
          <path
            d="M90 8 C110 8, 110 40, 60 40 C30 40, 10 40, 10 40"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 3"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M14 35 L8 40 L14 45" fill="currentColor" />
        </svg>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warning/15 px-2 py-0.5 font-heading text-[10px] font-bold text-warning">
          RETRY
        </span>
      </div>
    );
  }

  return (
    <div className="relative col-span-full flex justify-center">
      <svg width="100%" height="56" viewBox="0 0 600 56" fill="none" preserveAspectRatio="none" className="text-warning">
        <path
          d="M480 8 C560 8, 580 48, 400 48 C220 48, 180 48, 160 48"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M164 43 L156 48 L164 53" fill="currentColor" />
      </svg>
      <span className="absolute top-1/2 right-1/4 -translate-y-1/2 rounded-full bg-warning/15 px-2.5 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wide text-warning">
        retry
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stage column                                                       */
/* ------------------------------------------------------------------ */

function StageColumn({
  stageKey,
  tokens,
  pulsing,
}: {
  stageKey: Exclude<Stage, "retry">;
  tokens: Token[];
  pulsing?: boolean;
}) {
  const meta = stageMeta[stageKey];
  const stageTokens = tokens.filter(
    (t) => t.stage === stageKey || (stageKey === "queued" && t.stage === "retry")
  );

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Stage header */}
      <div
        className={cn(
          "flex items-center gap-2 rounded-2xl border px-4 py-2.5 transition-all",
          meta.bgClass,
          pulsing && "animate-pulse"
        )}
      >
        {meta.icon}
        <span className="font-heading text-sm font-bold" style={{ color: meta.color }}>
          {meta.label}
        </span>
      </div>

      {/* Status dot */}
      <div className="relative flex h-3 w-3 items-center justify-center">
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-40"
          style={{ backgroundColor: meta.color, animation: pulsing ? "ping 1.2s cubic-bezier(0,0,0.2,1) infinite" : "none" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: meta.color }}
        />
      </div>

      {/* Token tray */}
      <div className="flex min-h-[44px] flex-col items-center gap-1.5">
        <AnimatePresence mode="popLayout">
          {stageTokens.map((t) => (
            <MessageToken key={t.id} stage={t.stage} retried={t.retried} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main QueueVisualizer component                                     */
/* ------------------------------------------------------------------ */

let nextId = 1;

export function QueueVisualizer({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [tokens, setTokens] = useState<Token[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!isInView) {
      // Pause when out of view
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Seed initial tokens
    setTokens([
      { id: nextId++, stage: "delivered" },
      { id: nextId++, stage: "sending" },
      { id: nextId++, stage: "queued" },
      { id: nextId++, stage: "received" },
    ]);

    const tick = () => {
      setTokens((prev) => {
        let updated = prev.map((t) => {
          switch (t.stage) {
            case "received":
              return { ...t, stage: "queued" as Stage };
            case "retry":
              return { ...t, stage: "queued" as Stage, retried: true };
            case "queued":
              return { ...t, stage: "sending" as Stage };
            case "sending": {
              // 20% chance of retry
              const willRetry = !t.retried && Math.random() < 0.2;
              return {
                ...t,
                stage: willRetry ? ("retry" as Stage) : ("delivered" as Stage),
              };
            }
            case "delivered":
              return null as unknown as Token; // remove
            default:
              return t;
          }
        });

        // Filter out nulls (delivered tokens that leave)
        updated = updated.filter(Boolean);

        // Add a new incoming token
        updated.push({ id: nextId++, stage: "received" });

        // Cap total tokens so it doesn't grow unbounded
        if (updated.length > 8) {
          updated = updated.slice(-8);
        }

        return updated;
      });
    };

    intervalRef.current = setInterval(tick, 1800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView]);

  const stageKeys: Exclude<Stage, "retry">[] = [
    "received",
    "queued",
    "sending",
    "delivered",
  ];

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {/* Desktop: horizontal pipeline */}
      <div className="hidden lg:block">
        <div className="rounded-3xl border border-border bg-surface p-8 hand-drawn-shadow">
          {/* Pipeline label */}
          <div className="mb-6 flex items-center justify-center gap-2 text-center">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-text-light">
              Live Queue Pipeline
            </span>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>

          {/* Stages row */}
          <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start">
            {stageKeys.map((key, i) => (
              <div key={key} className="contents">
                <StageColumn
                  stageKey={key}
                  tokens={tokens}
                  pulsing={key === "sending"}
                />
                {i < stageKeys.length - 1 && <StageConnector vertical={false} />}
              </div>
            ))}
          </div>

          {/* Retry loop */}
          <RetryArrow vertical={false} />
        </div>
      </div>

      {/* Mobile / Tablet: vertical pipeline */}
      <div className="lg:hidden">
        <div className="rounded-3xl border border-border bg-surface p-6 hand-drawn-shadow">
          {/* Pipeline label */}
          <div className="mb-5 flex items-center justify-center gap-2 text-center">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-text-light">
              Live Queue Pipeline
            </span>
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
          </div>

          <div className="flex flex-col items-center gap-1">
            {stageKeys.map((key, i) => (
              <div key={key} className="flex flex-col items-center">
                <StageColumn
                  stageKey={key}
                  tokens={tokens}
                  pulsing={key === "sending"}
                />
                {i < stageKeys.length - 1 && <StageConnector vertical />}
              </div>
            ))}
          </div>

          {/* Retry loop */}
          <RetryArrow vertical />
        </div>
      </div>
    </div>
  );
}
