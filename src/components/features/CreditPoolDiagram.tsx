"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MaskBrand {
  name: string;
  color: string;
  bgClass: string;
  borderClass: string;
  initial: number; // initial credit allocation percentage
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const TOTAL_CREDITS = 5000;

const brands: MaskBrand[] = [
  {
    name: "ShopMax",
    color: "#FF6B54",
    bgClass: "bg-primary/10",
    borderClass: "border-primary/30",
    initial: 40,
  },
  {
    name: "FreshBite",
    color: "#4ECDC4",
    bgClass: "bg-success/10",
    borderClass: "border-success/30",
    initial: 35,
  },
  {
    name: "TechCorp",
    color: "#1A2B4A",
    bgClass: "bg-secondary/10",
    borderClass: "border-secondary/20",
    initial: 25,
  },
];

/* ------------------------------------------------------------------ */
/*  Animated coin                                                      */
/* ------------------------------------------------------------------ */

function CoinIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" fill="#FFD166" stroke="#E5B84D" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="#E5B84D" strokeWidth="1" strokeDasharray="3 2" />
      <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1A2B4A">
        S
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Flow particle that animates from pool to mask                      */
/* ------------------------------------------------------------------ */

function FlowParticle({
  color,
  delay,
  active,
}: {
  color: string;
  delay: number;
  active: boolean;
}) {
  return (
    <motion.div
      className="absolute left-1/2 top-0 -translate-x-1/2"
      initial={{ y: 0, opacity: 0, scale: 0.5 }}
      animate={
        active
          ? {
              y: [0, 30, 60, 90],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1, 0.5],
            }
          : { y: 0, opacity: 0 }
      }
      transition={{
        duration: 1.6,
        delay,
        repeat: active ? Infinity : 0,
        repeatDelay: 0.8,
        ease: "easeInOut",
      }}
    >
      <CoinIcon size={16} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Mask brand card                                                    */
/* ------------------------------------------------------------------ */

function MaskCard({
  brand,
  credits,
  percentage,
  isActive,
  onClick,
}: {
  brand: MaskBrand;
  credits: number;
  percentage: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all cursor-pointer select-none",
        brand.bgClass,
        brand.borderClass,
        isActive && "ring-2 ring-accent ring-offset-2 ring-offset-background scale-[1.03]"
      )}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Brand icon — shield with letter */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl font-heading text-lg font-bold text-white"
        style={{ backgroundColor: brand.color }}
      >
        {brand.name[0]}
      </div>

      <span className="font-heading text-sm font-bold text-secondary">
        {brand.name}
      </span>

      {/* Usage bar */}
      <div className="w-full overflow-hidden rounded-full bg-border/40 h-2.5">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: brand.color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="flex items-center gap-1.5">
        <CoinIcon size={16} />
        <span className="font-heading text-base font-bold" style={{ color: brand.color }}>
          {credits.toLocaleString()}
        </span>
        <span className="text-xs text-text-light">credits</span>
      </div>

      {isActive && (
        <motion.span
          className="absolute -top-2 -right-2 rounded-full bg-accent px-2 py-0.5 font-heading text-[10px] font-bold text-secondary shadow-sm"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          ACTIVE
        </motion.span>
      )}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main CreditPoolDiagram component                                   */
/* ------------------------------------------------------------------ */

export function CreditPoolDiagram({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });
  const [activeMask, setActiveMask] = useState<number | null>(null);
  const [allocations, setAllocations] = useState<number[]>(
    brands.map((b) => b.initial)
  );

  const handleMaskClick = (index: number) => {
    if (activeMask === index) {
      setActiveMask(null);
      return;
    }

    setActiveMask(index);

    // Simulate "allocating more" — boost the clicked mask by 10, take from others
    setAllocations((prev) => {
      const updated = [...prev];
      const boost = 10;
      const otherIndices = [0, 1, 2].filter((i) => i !== index);

      // Don't go below 10% for any mask
      const canTake = otherIndices.every((i) => updated[i] > 15);
      if (canTake) {
        updated[index] = Math.min(updated[index] + boost, 70);
        const reduction = boost / otherIndices.length;
        otherIndices.forEach((i) => {
          updated[i] = Math.max(updated[i] - reduction, 10);
        });
      }

      // Normalize to 100
      const sum = updated.reduce((a, b) => a + b, 0);
      return updated.map((v) => Math.round((v / sum) * 100));
    });
  };

  const creditAmounts = allocations.map((pct) =>
    Math.round((pct / 100) * TOTAL_CREDITS)
  );

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <div className="rounded-3xl border border-border bg-surface p-6 md:p-8 hand-drawn-shadow">
        {/* Credit Pool — the big top container */}
        <div className="mx-auto mb-2 max-w-md">
          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-accent/10 px-6 py-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Floating coins inside pool */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${15 + i * 18}%`,
                    top: `${20 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [-4, 4, -4],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                >
                  <CoinIcon size={24} className="opacity-30" />
                </motion.div>
              ))}
            </div>

            <div className="relative flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-2">
                <CoinIcon size={28} />
                <span className="font-heading text-2xl font-bold text-secondary sm:text-3xl">
                  {TOTAL_CREDITS.toLocaleString()}
                </span>
              </div>
              <span className="font-heading text-sm font-semibold uppercase tracking-wider text-accent-dark">
                Shared Credit Pool
              </span>
              <p className="mt-1 text-xs text-text-light">
                Click a mask below to allocate credits
              </p>
            </div>
          </motion.div>
        </div>

        {/* Flow lines area */}
        <div className="relative mx-auto max-w-md py-4">
          <div className="flex justify-around">
            {brands.map((brand, i) => (
              <div key={brand.name} className="relative h-[90px] w-8">
                {/* Dashed connector line */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 32 90"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="16"
                    y1="0"
                    x2="16"
                    y2="90"
                    stroke={brand.color}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    opacity={activeMask === i ? 0.8 : 0.25}
                  />
                </svg>

                {/* Flow particles */}
                <FlowParticle
                  color={brand.color}
                  delay={i * 0.3}
                  active={isInView && activeMask === i}
                />
                <FlowParticle
                  color={brand.color}
                  delay={i * 0.3 + 0.8}
                  active={isInView && activeMask === i}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Mask brand cards */}
        <motion.div
          className="grid gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {brands.map((brand, i) => (
            <MaskCard
              key={brand.name}
              brand={brand}
              credits={creditAmounts[i]}
              percentage={allocations[i]}
              isActive={activeMask === i}
              onClick={() => handleMaskClick(i)}
            />
          ))}
        </motion.div>

        {/* Allocation summary bar */}
        <motion.div
          className="mt-6 overflow-hidden rounded-full bg-border/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <div className="flex h-3">
            {brands.map((brand, i) => (
              <motion.div
                key={brand.name}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{ backgroundColor: brand.color }}
                initial={{ width: 0 }}
                animate={{ width: `${allocations[i]}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-3 flex justify-between text-[11px] text-text-light">
          {brands.map((brand, i) => (
            <span key={brand.name} className="flex items-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: brand.color }}
              />
              {brand.name}: {allocations[i]}%
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
