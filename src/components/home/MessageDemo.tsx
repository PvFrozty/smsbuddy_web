"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { PhoneFrame } from "./PhoneFrame";
const examples = [
  {
    label: "Promotions",
    icon: "message" as const,
    text: "A little treat for your weekend. Visit us in store for our latest offers. Reply via the contact details on our website.",
  },
  {
    label: "Order updates",
    icon: "box" as const,
    text: "Your order is ready. Thank you for shopping with us! Visit our store to collect it today.",
  },
  {
    label: "OTP",
    icon: "lock" as const,
    text: "Your verification code is 482916. Do not share this code with anyone.",
  },
];
export function MessageDemo() {
  const [selected, setSelected] = useState(1);
  const [sender, setSender] = useState("YOUR BRAND");
  const [draft, setDraft] = useState(examples[1].text);
  const [preview, setPreview] = useState({
    sender: "YOUR BRAND",
    text: examples[1].text,
  });
  const [version, setVersion] = useState(0);
  const reduced = useReducedMotion();
  function choose(index: number) {
    setSelected(index);
    setDraft(examples[index].text);
    setPreview({
      sender: sender.trim() || "YOUR BRAND",
      text: examples[index].text,
    });
    setVersion((v) => v + 1);
  }
  return (
    <div className="sb-demo-stage" id="message-demo">
      <div className="sb-demo-caption">
        <span>Your brand. Their inbox.</span>
        <span className="sb-demo-instruction">Make it yours. Preview the connection.</span>
      </div>
      <div className="sb-composer">
        <div className="sb-composer-top">
          <span className="sb-example-dot" />
          Interactive example
        </div>
        <div className="sb-demo-tabs" role="group" aria-label="Message type">
          {examples.map((e, i) => (
            <button
              key={e.label}
              type="button"
              aria-pressed={selected === i}
              onClick={() => choose(i)}
            >
              <Icon name={e.icon} size={16} />
              {e.label}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPreview({
              sender: sender.trim() || "YOUR BRAND",
              text: draft.trim(),
            });
            setVersion((v) => v + 1);
          }}
        >
          <label htmlFor="demo-sender">Sender name</label>
          <input
            id="demo-sender"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            maxLength={11}
            autoComplete="off"
            spellCheck={false}
          />
          <label htmlFor="demo-message">Your message</label>
          <textarea
            id="demo-message"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={400}
            required
            rows={4}
          />
          <div className="sb-demo-meta">
            <span>Try it with your business name</span>
            <span>{draft.length} characters</span>
          </div>
          <button type="submit" className="sb-primary" disabled={!draft.trim()}>
            Preview message <Icon name="arrow" size={18} />
          </button>
        </form>
      </div>
      <div className="sb-message-transfer" aria-hidden="true">
        <svg viewBox="0 0 80 80" fill="none"><path d="M1 40h72m-9-9 10 9-10 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <motion.span key={version} initial={reduced ? false : { x: -12, opacity: .4 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .45 }}><Icon name="message" size={24} /></motion.span>
      </div>
      <div className="sb-inbox">
        <PhoneFrame />
        <div className="sb-phone-screen">
        <div className="sb-inbox-chrome">
          <span>9:41</span>
          <svg
            viewBox="0 0 40 14"
            width="40"
            height="14"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M0 10h3v3H0zm5-3h3v6H5zm5-3h3v9h-3zm5-3h3v12h-3z" />
            <rect x="24" y="3" width="12" height="8" rx="1" />
            <path d="M38 5h2v4h-2z" />
          </svg>
        </div>
        <div className="sb-inbox-sender">
          <svg className="sb-phone-back" width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true"><path d="m10 2-8 8 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span className="sb-recipient-avatar">
            <Icon name="message" size={22} />
          </span>
          <strong>{preview.sender}</strong>
          <span>Text message · SMS</span>
        </div>
        <div className="sb-inbox-content" role="region" aria-label="Message preview" tabIndex={0} aria-live="polite" aria-atomic="true">
          <span className="sb-inbox-time">Today, 9:41 AM</span>
          <motion.div
            className="sb-sms"
            key={version}
            initial={
              reduced
                ? false
                : {
                    opacity: 0.5,
                    y: 12,
                    clipPath: "inset(0 0 12% 0 round 12px)",
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0 round 12px)",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {preview.text}
          </motion.div>
          <span className="sb-delivery">
            <Icon name="check" size={14} /> Example preview
          </span>
        </div>
        <div className="sb-inbox-bottom">
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <span>Text message <svg width="10" height="14" viewBox="0 0 10 14" fill="none" aria-hidden="true"><rect x="3" y="1" width="4" height="7" rx="2" stroke="currentColor" /><path d="M1 6v1a4 4 0 0 0 8 0V6M5 11v2" stroke="currentColor" strokeLinecap="round" /></svg></span>
        </div>
        </div>
      </div>
      <p className="sb-demo-disclaimer">
        A live preview, not an actual SMS. Nothing is sent.
      </p>
    </div>
  );
}
