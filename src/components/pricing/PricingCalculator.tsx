"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { smsPackages, lowestExtraSmsPackage } from "@/lib/constants";
import { cn } from "@/lib/utils";

const creditPacks = smsPackages
  .filter((pack) => pack.code !== "SMPAYG")
  .sort((a, b) => a.smsCount - b.smsCount);
const formatNumber = (amount: number) => amount.toLocaleString("en-LK");
const formatPrice = (amount: number) =>
  `LKR ${amount.toLocaleString("en-LK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function PricingCalculator({ className }: { className?: string }) {
  const inputId = useId();
  const [requestedCredits, setRequestedCredits] = useState("5000");
  const count = Number(requestedCredits);
  const isValid = requestedCredits.trim() !== "" && Number.isSafeInteger(count) && count > 0;
  const selectedPack = isValid
    ? creditPacks.find((pack) => pack.smsCount >= count)
    : undefined;

  return (
    <div className={cn("grid overflow-hidden rounded-3xl border border-slate-200 bg-white lg:grid-cols-2", className)}>
      <div className="p-6 sm:p-9">
        <label htmlFor={inputId} className="block text-lg font-semibold text-slate-950">
          How many credits do you need?
        </label>
        <p id={`${inputId}-hint`} className="mt-2 text-sm leading-relaxed text-slate-600">
          Enter the credits you expect to use within 3 months. We’ll show the
          smallest listed pack that covers them.
        </p>
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={requestedCredits}
          onChange={(event) => setRequestedCredits(event.target.value)}
          aria-invalid={!isValid}
          aria-describedby={`${inputId}-hint${!isValid ? ` ${inputId}-error` : ""}`}
          className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-3xl font-semibold tabular-nums text-slate-950 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
        />
        {!isValid && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-red-700">
            Enter a whole number of credits greater than zero.
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Example credit quantities">
          {[1000, 5000, 30000, lowestExtraSmsPackage.smsCount].map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setRequestedCredits(String(amount))}
              aria-pressed={isValid && count === amount}
              className={cn(
                "min-h-11 rounded-lg border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                isValid && count === amount
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-700"
              )}
            >
              {formatNumber(amount)}
            </button>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-slate-500">
          A long message or one using Unicode characters may use multiple credits.
          Check the credit count for your message before sending.
        </p>
      </div>
      <div aria-live="polite" aria-atomic="true" className="flex flex-col justify-center bg-slate-50 p-6 sm:p-9">
        {selectedPack ? (
          <>
            <p className="text-sm font-medium text-blue-700">Smallest pack covering your credits</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
              {formatNumber(selectedPack.smsCount)} credits
            </h3>
            <p className="mt-1 text-sm text-slate-500">{selectedPack.name} pack</p>
            {selectedPack.code === lowestExtraSmsPackage.code && <p className="mt-3 text-sm font-semibold text-blue-700">Our lowest extra-SMS rate</p>}
            <p className="mt-6 text-3xl font-semibold tabular-nums text-slate-950">
              {formatPrice(selectedPack.price)}
            </p>
            <p className="mt-1 text-sm text-slate-600">Package price</p>
            <dl className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate-600">Extra SMS cost (per SMS)</dt>
                <dd className="font-semibold text-slate-900">{formatPrice(selectedPack.extraSmsCost)}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate-600">Credits remaining after your estimate</dt>
                <dd className="font-semibold text-slate-900">{formatNumber(selectedPack.smsCount - count)}</dd>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-slate-600">Validity from purchase</dt>
                <dd className="font-semibold text-slate-900">3 months</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-slate-950">
              {isValid ? "Let’s find the right credit option." : "Your pack estimate will appear here."}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {isValid
                ? `Your estimate exceeds our largest listed pack of ${formatNumber(creditPacks[creditPacks.length - 1].smsCount)} credits. Contact the team to discuss your volume and current pricing.`
                : "Enter a valid credit quantity to compare it with the available packs."}
            </p>
          </>
        )}
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          The package price covers the included credits. Extra SMS are charged at the package’s separate extra-SMS rate.
        </p>
        <Link href="/contact" className="mt-4 w-fit text-sm font-semibold text-blue-700 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
          Ask about pricing
        </Link>
      </div>
    </div>
  );
}
