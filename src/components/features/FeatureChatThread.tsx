"use client";

import { cn } from "@/lib/utils";
import { AnimatedEntry } from "@/components/ui/AnimatedEntry";
import { ChatBubble } from "@/components/hero/ChatBubble";
import { fadeInUp } from "@/animations/variants";

interface FeatureChatThreadProps {
  userProblem: string;
  buddySolution: string;
  icon: React.ReactNode;
  title: string;
  className?: string;
}

export function FeatureChatThread({
  userProblem,
  buddySolution,
  icon,
  title,
  className,
}: FeatureChatThreadProps) {
  return (
    <AnimatedEntry variants={fadeInUp}>
      <div
        className={cn(
          "rounded-2xl bg-surface p-6 hand-drawn-shadow md:p-8",
          className
        )}
      >
        {/* Icon + Title */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            {icon}
          </div>
          <h3 className="font-heading text-lg font-semibold text-secondary">
            {title}
          </h3>
        </div>

        {/* Chat exchange */}
        <div className="flex flex-col gap-3 rounded-xl bg-background p-4">
          <ChatBubble message={userProblem} sender="user" delay={0} />
          <ChatBubble message={buddySolution} sender="buddy" delay={0} />
        </div>
      </div>
    </AnimatedEntry>
  );
}
