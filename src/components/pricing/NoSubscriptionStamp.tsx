"use client";

import { motion } from "motion/react";
import { stampSlam } from "@/animations/variants";
import { StampTexture } from "@/illustrations/StampTexture";
import { cn } from "@/lib/utils";

interface NoSubscriptionStampProps {
  className?: string;
}

export function NoSubscriptionStamp({ className }: NoSubscriptionStampProps) {
  return (
    <motion.div
      variants={stampSlam}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("inline-flex", className)}
      style={{ rotate: "-6deg" }}
    >
      <StampTexture className="w-44 md:w-52 lg:w-60">
        <span className="font-heading text-lg font-extrabold uppercase leading-tight tracking-wider text-primary md:text-xl lg:text-2xl">
          No Monthly
          <br />
          Fees
        </span>
      </StampTexture>
    </motion.div>
  );
}
