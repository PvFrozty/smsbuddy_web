"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { registerUrl, smsPackages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SmsPackage } from "@/types";

const formatPrice = (amount: number) => `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const formatCount = (count: number) => count.toLocaleString("en-LK");

/** Every package is a whole number of thousands, so plan in blocks of 1,000 SMS. */
const BLOCK = 1_000;
/** Above this many blocks, fill with the largest package first to keep the search small. */
const SEARCH_LIMIT = 2_000;

type Plan = { lines: { pack: SmsPackage; quantity: number }[]; total: number; credits: number };

/** Cheapest mix of packages whose credits cover `count` SMS (unbounded knapsack over 1,000-SMS blocks). */
function cheapestPlan(count: number): Plan {
  const largest = smsPackages[smsPackages.length - 1];
  let blocks = Math.ceil(count / BLOCK);
  let bulk = 0;
  if (blocks > SEARCH_LIMIT) {
    bulk = Math.floor((blocks - SEARCH_LIMIT) / (largest.smsCount / BLOCK)) + 1;
    blocks -= bulk * (largest.smsCount / BLOCK);
  }
  const maxSize = Math.max(...smsPackages.map((pack) => pack.smsCount / BLOCK));
  const limit = Math.max(blocks, 0) + maxSize;
  const cost = new Array<number>(limit + 1).fill(Infinity);
  const choice = new Array<number>(limit + 1).fill(-1);
  cost[0] = 0;
  for (let b = 1; b <= limit; b++) {
    smsPackages.forEach((pack, index) => {
      const size = pack.smsCount / BLOCK;
      if (size <= b && cost[b - size] + pack.price < cost[b]) {
        cost[b] = cost[b - size] + pack.price;
        choice[b] = index;
      }
    });
  }
  let best = Math.max(blocks, 0);
  for (let b = best; b <= limit; b++) if (cost[b] < cost[best]) best = b;

  const quantities = new Map<number, number>();
  if (bulk > 0) quantities.set(smsPackages.length - 1, bulk);
  for (let b = best; b > 0; b -= smsPackages[choice[b]].smsCount / BLOCK) quantities.set(choice[b], (quantities.get(choice[b]) ?? 0) + 1);

  const lines = [...quantities.entries()].sort(([a], [b]) => b - a).map(([index, quantity]) => ({ pack: smsPackages[index], quantity }));
  return {
    lines,
    total: lines.reduce((sum, line) => sum + line.pack.price * line.quantity, 0),
    credits: lines.reduce((sum, line) => sum + line.pack.smsCount * line.quantity, 0),
  };
}

export function PricingCalculator({ className }: { className?: string }) {
  const inputId = useId();
  const [requestedCredits, setRequestedCredits] = useState("5000");
  const count = Number(requestedCredits);
  const isValid = requestedCredits.trim() !== "" && Number.isSafeInteger(count) && count > 0;
  const plan = isValid ? cheapestPlan(count) : null;
  const spare = plan ? plan.credits - count : 0;

  return (
    <div className={cn("grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-2", className)}>
      <div className="p-6 sm:p-9">
        <label htmlFor={inputId} className="block text-lg font-semibold text-slate-950">How many SMS credits do you expect to use?</label>
        <p id={`${inputId}-hint`} className="mt-2 text-sm leading-relaxed text-slate-600">We’ll find the cheapest mix of packages that covers them.</p>
        <input id={inputId} type="number" inputMode="numeric" min={1} step={1} value={requestedCredits} onChange={(event) => setRequestedCredits(event.target.value)} aria-invalid={!isValid} aria-describedby={`${inputId}-hint${!isValid ? ` ${inputId}-error` : ""}`} className="mt-6 w-full rounded-xl border border-slate-500 bg-white h-13 px-4 py-1.5 text-3xl font-semibold tabular-nums text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20" />
        {!isValid && <p id={`${inputId}-error`} className="mt-2 text-sm text-red-700">Enter a whole number of credits greater than zero.</p>}
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Example credit quantities">
          {[1000, 5000, 30000, 100000].map((amount) => <button key={amount} type="button" onClick={() => setRequestedCredits(String(amount))} aria-pressed={isValid && count === amount} className={cn("min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600", isValid && count === amount ? "border-blue-600 bg-blue-50 text-blue-800" : "border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-700 active:bg-blue-50")}>{formatCount(amount)}</button>)}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-500">Long or Unicode messages may use multiple credits. Check the credit count for your final message before sending.</p>
      </div>
      <div aria-live="polite" aria-atomic="true" className="flex flex-col justify-center bg-slate-50 p-6 sm:p-9">
        <h3 className="text-2xl font-semibold text-slate-950">{plan ? "Your lowest-cost option" : "Your estimate will appear here"}</h3>
        {plan ? <dl className="mt-6 space-y-5 text-sm">
          <div>
            <dt className="font-semibold text-slate-950">{plan.lines.map((line) => `${line.quantity > 1 ? `${line.quantity} × ` : ""}${line.pack.name}`).join(" + ")}</dt>
            <dd className="mt-1 text-3xl font-semibold tabular-nums text-slate-950">{formatPrice(plan.total)}</dd>
            <dd className="mt-1 text-slate-600">{formatCount(plan.credits)} SMS at an average of {formatPrice(plan.total / plan.credits)} each</dd>
          </div>
          {spare > 0 && <div><dt className="text-slate-600">Credits left over</dt><dd className="mt-1 font-semibold tabular-nums text-slate-950">{formatCount(spare)} SMS</dd></div>}
        </dl> : <p className="mt-3 text-sm text-slate-600">Enter a valid credit quantity to see your options.</p>}
        <p className="mt-6 text-sm leading-relaxed text-slate-600">Credits don’t expire, so leftover credits carry over to your next sale. Confirm taxes and any sender-name charges before paying.</p>
        <Link href={registerUrl} data-cta-location="pricing-estimate" className="mt-4 w-fit text-sm font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900 active:text-blue-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">Top up in your account</Link>
      </div>
    </div>
  );
}
