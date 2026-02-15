"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { fadeInUp } from "@/animations/variants";
import { CreditCoinIcon } from "@/illustrations/CreditCoinIcon";
import { smsPackages } from "@/lib/constants";

// Real pricing tiers from smsPackages
const packTiers = smsPackages.filter((p) => p.code !== "SMPAYG");
const paygRate = 0.60;

function getRate(count: number): number {
  // Find the best matching pack tier
  for (let i = packTiers.length - 1; i >= 0; i--) {
    if (count >= packTiers[i].smsCount) {
      return packTiers[i].perSmsCost;
    }
  }
  // Below smallest pack, use PAYG rate
  if (count < packTiers[0].smsCount) {
    return paygRate;
  }
  return packTiers[0].perSmsCost;
}

function getRecommendedPack(count: number): { name: string; savings: number } {
  // Find the smallest pack that covers the count
  for (const pack of packTiers) {
    if (count <= pack.smsCount) {
      const paygCost = count * paygRate;
      const packCost = pack.price;
      const savings = paygCost - packCost;
      return { name: pack.name, savings: Math.max(0, savings) };
    }
  }
  // Over the largest pack
  const largest = packTiers[packTiers.length - 1];
  const paygCost = count * paygRate;
  const packCost = largest.price;
  return { name: `${largest.name}+`, savings: Math.max(0, paygCost - packCost) };
}

function formatLKR(amount: number): string {
  if (amount < 1) return `LKR ${amount.toFixed(2)}`;
  return `LKR ${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function PricingCalculator({ className }: { className?: string }) {
  const [smsCount, setSmsCount] = useState(5000);

  const calculation = useMemo(() => {
    const rate = getRate(smsCount);
    const total = smsCount * rate;
    const recommended = getRecommendedPack(smsCount);
    return { rate, total, recommended };
  }, [smsCount]);

  const min = 100;
  const max = 150000;
  const fillPercent = ((smsCount - min) / (max - min)) * 100;

  return (
    <AnimatedEntry variants={fadeInUp} className={className}>
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 md:p-10">
        {/* Input section */}
        <div className="mb-8">
          <label
            htmlFor="sms-count"
            className="mb-3 block font-heading text-sm font-semibold text-secondary"
          >
            How many SMS do you need?
          </label>

          <div className="mb-4 flex items-center justify-center">
            <input
              id="sms-count"
              type="number"
              min={min}
              max={max}
              value={smsCount}
              onChange={(e) => {
                const val = Math.min(max, Math.max(min, Number(e.target.value) || min));
                setSmsCount(val);
              }}
              className="w-44 rounded-xl border border-border bg-background px-4 py-3 text-center font-heading text-2xl font-bold text-secondary outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative">
            <input
              type="range"
              min={min}
              max={max}
              step={100}
              value={smsCount}
              onChange={(e) => setSmsCount(Number(e.target.value))}
              className="pricing-slider w-full cursor-pointer"
              style={
                {
                  "--fill-percent": `${fillPercent}%`,
                } as React.CSSProperties
              }
            />
            <div className="mt-2 flex justify-between text-xs text-text-light">
              <span>100</span>
              <span>30K</span>
              <span>75K</span>
              <span>150K</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-3">
          <ResultCard
            label="Cost per SMS"
            value={formatLKR(calculation.rate)}
            highlight
          />
          <ResultCard
            label="Estimated Total"
            value={formatLKR(calculation.total)}
          />
          <ResultCard
            label="Recommended Pack"
            value={calculation.recommended.name}
            small
          />
        </div>

        {/* Savings indicator */}
        {calculation.recommended.savings > 0 && (
          <div className="mt-4 rounded-xl bg-success/10 px-4 py-3 text-center text-sm">
            <span className="font-semibold text-success">
              Save {formatLKR(calculation.recommended.savings)}
            </span>{" "}
            <span className="text-text-light">
              vs Pay As You Go (LKR 0.60/SMS)
            </span>
          </div>
        )}

        {/* Pack tiers overview */}
        <div className="mt-8 rounded-xl bg-background p-4">
          <div className="mb-3 flex items-center gap-2">
            <CreditCoinIcon className="h-5 w-5" />
            <span className="font-heading text-sm font-semibold text-secondary">
              Volume Pricing Tiers
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {[
              { label: "1K", rate: 0.58, min: 1000, max: 4999 },
              { label: "5K–10K", rate: 0.55, min: 5000, max: 29999 },
              { label: "30K–50K", rate: 0.52, min: 30000, max: 74999 },
              { label: "75K–100K", rate: 0.48, min: 75000, max: 129999 },
              { label: "130K+", rate: 0.45, min: 130000, max: 150000 },
            ].map((tier) => (
              <div
                key={tier.label}
                className={cn(
                  "rounded-lg border px-3 py-2 text-center text-xs transition-colors",
                  smsCount >= tier.min && smsCount <= tier.max
                    ? "border-primary/40 bg-primary/10 text-primary-dark"
                    : "border-border bg-surface text-text-light"
                )}
              >
                <div className="font-semibold">{tier.label}</div>
                <div className="mt-0.5">LKR {tier.rate.toFixed(2)}/SMS</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom slider styles */}
      <style jsx>{`
        .pricing-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            #ff6b54 0%,
            #ff6b54 var(--fill-percent),
            #e8ddd3 var(--fill-percent),
            #e8ddd3 100%
          );
          outline: none;
        }
        .pricing-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ff6b54;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
        .pricing-slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #ff6b54;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </AnimatedEntry>
  );
}

function ResultCard({
  label,
  value,
  highlight,
  small,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 text-center",
        highlight
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-background"
      )}
    >
      <p className="text-xs font-medium text-text-light">{label}</p>
      <p
        className={cn(
          "mt-1 font-heading font-bold text-secondary",
          small ? "text-sm" : "text-lg"
        )}
      >
        {value}
      </p>
    </div>
  );
}
