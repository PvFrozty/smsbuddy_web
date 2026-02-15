"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const tabs = ["cURL", "JavaScript", "PHP", "Python"] as const;
type TabName = (typeof tabs)[number];

/* ─── Syntax‑highlighted code snippets ─── */

function CurlSnippet() {
  return (
    <pre className="overflow-x-auto text-sm leading-relaxed">
      <code>
        <span className="text-primary">curl</span>{" "}
        <span className="text-primary">-X</span> POST{" "}
        <span className="text-secondary">https://api.smsbuddy.lk/v1/send</span>{" "}
        \{"\n"}
        {"  "}<span className="text-primary">-H</span>{" "}
        <span className="text-secondary">{'"Authorization: Bearer YOUR_API_KEY"'}</span>{" "}
        \{"\n"}
        {"  "}<span className="text-primary">-H</span>{" "}
        <span className="text-secondary">{'"Content-Type: application/json"'}</span>{" "}
        \{"\n"}
        {"  "}<span className="text-primary">-d</span>{" "}
        <span className="text-secondary">{"'"}</span>
        {"{"}
        {"\n"}
        {"    "}<span className="text-primary">{'"to"'}</span>:{" "}
        <span className="text-secondary">{'"+94771234567"'}</span>,{"\n"}
        {"    "}<span className="text-primary">{'"mask"'}</span>:{" "}
        <span className="text-secondary">{'"ShopMax"'}</span>,{"\n"}
        {"    "}<span className="text-primary">{'"message"'}</span>:{" "}
        <span className="text-secondary">{'"Your order has been shipped!"'}</span>
        {"\n"}
        {"  "}
        {"}"}
        <span className="text-secondary">{"'"}</span>
      </code>
    </pre>
  );
}

function JavaScriptSnippet() {
  return (
    <pre className="overflow-x-auto text-sm leading-relaxed">
      <code>
        <span className="text-primary">const</span> response{" "}
        <span className="text-primary">=</span>{" "}
        <span className="text-primary">await</span>{" "}
        <span className="text-success">fetch</span>(
        <span className="text-secondary">{`'https://api.smsbuddy.lk/v1/send'`}</span>,{" "}
        {"{"}
        {"\n"}
        {"  "}method:{" "}
        <span className="text-secondary">{`'POST'`}</span>,{"\n"}
        {"  "}headers: {"{"}
        {"\n"}
        {"    "}<span className="text-secondary">{`'Authorization'`}</span>:{" "}
        <span className="text-secondary">{`'Bearer YOUR_API_KEY'`}</span>,{"\n"}
        {"    "}<span className="text-secondary">{`'Content-Type'`}</span>:{" "}
        <span className="text-secondary">{`'application/json'`}</span>,{"\n"}
        {"  "}
        {"},"}
        {"\n"}
        {"  "}body: <span className="text-success">JSON.stringify</span>(
        {"{"}
        {"\n"}
        {"    "}to:{" "}
        <span className="text-secondary">{`'+94771234567'`}</span>,{"\n"}
        {"    "}mask:{" "}
        <span className="text-secondary">{`'ShopMax'`}</span>,{"\n"}
        {"    "}message:{" "}
        <span className="text-secondary">{`'Your order has been shipped!'`}</span>,{"\n"}
        {"  "}
        {"}"}),{"\n"}
        {"}"});
      </code>
    </pre>
  );
}

function PhpSnippet() {
  return (
    <pre className="overflow-x-auto text-sm leading-relaxed">
      <code>
        <span className="text-primary">$response</span> ={" "}
        <span className="text-success">Http::withHeaders</span>([{"\n"}
        {"    "}<span className="text-secondary">{`'Authorization'`}</span>{" "}
        =&gt;{" "}
        <span className="text-secondary">{`'Bearer YOUR_API_KEY'`}</span>,{"\n"}
        ])-&gt;<span className="text-success">post</span>(
        <span className="text-secondary">{`'https://api.smsbuddy.lk/v1/send'`}</span>,
        {" "}[{"\n"}
        {"    "}<span className="text-secondary">{`'to'`}</span> =&gt;{" "}
        <span className="text-secondary">{`'+94771234567'`}</span>,{"\n"}
        {"    "}<span className="text-secondary">{`'mask'`}</span> =&gt;{" "}
        <span className="text-secondary">{`'ShopMax'`}</span>,{"\n"}
        {"    "}<span className="text-secondary">{`'message'`}</span> =&gt;{" "}
        <span className="text-secondary">{`'Your order has been shipped!'`}</span>,{"\n"}
        ]);
      </code>
    </pre>
  );
}

function PythonSnippet() {
  return (
    <pre className="overflow-x-auto text-sm leading-relaxed">
      <code>
        <span className="text-primary">import</span> requests{"\n"}
        {"\n"}
        response = <span className="text-success">requests.post</span>({"\n"}
        {"    "}<span className="text-secondary">{`'https://api.smsbuddy.lk/v1/send'`}</span>,{"\n"}
        {"    "}headers={"{"}
        <span className="text-secondary">{`'Authorization'`}</span>:{" "}
        <span className="text-secondary">{`'Bearer YOUR_API_KEY'`}</span>
        {"}"},
        {"\n"}
        {"    "}json={"{"}
        {"\n"}
        {"        "}<span className="text-secondary">{`'to'`}</span>:{" "}
        <span className="text-secondary">{`'+94771234567'`}</span>,{"\n"}
        {"        "}<span className="text-secondary">{`'mask'`}</span>:{" "}
        <span className="text-secondary">{`'ShopMax'`}</span>,{"\n"}
        {"        "}<span className="text-secondary">{`'message'`}</span>:{" "}
        <span className="text-secondary">{`'Your order has been shipped!'`}</span>,{"\n"}
        {"    "}
        {"},"}
        {"\n"})
      </code>
    </pre>
  );
}

const snippets: Record<TabName, React.ReactNode> = {
  cURL: <CurlSnippet />,
  JavaScript: <JavaScriptSnippet />,
  PHP: <PhpSnippet />,
  Python: <PythonSnippet />,
};

/* ─── Main Component ─── */

export function CodeSnippetShowcase() {
  const [activeTab, setActiveTab] = useState<TabName>("cURL");
  const [copied, setCopied] = useState(false);

  const plainText: Record<TabName, string> = {
    cURL: `curl -X POST https://api.smsbuddy.lk/v1/send \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "+94771234567",
    "mask": "ShopMax",
    "message": "Your order has been shipped!"
  }'`,
    JavaScript: `const response = await fetch('https://api.smsbuddy.lk/v1/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: '+94771234567',
    mask: 'ShopMax',
    message: 'Your order has been shipped!',
  }),
});`,
    PHP: `$response = Http::withHeaders([
    'Authorization' => 'Bearer YOUR_API_KEY',
])->post('https://api.smsbuddy.lk/v1/send', [
    'to' => '+94771234567',
    'mask' => 'ShopMax',
    'message' => 'Your order has been shipped!',
]);`,
    Python: `import requests

response = requests.post(
    'https://api.smsbuddy.lk/v1/send',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'to': '+94771234567',
        'mask': 'ShopMax',
        'message': 'Your order has been shipped!',
    },
)`,
  };

  function handleCopy() {
    navigator.clipboard.writeText(plainText[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface hand-drawn-shadow overflow-hidden">
      {/* ── Title bar with traffic lights ── */}
      <div className="flex items-center gap-2 border-b border-border bg-[#FFF0E0] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#E74C3C]" />
        <span className="h-3 w-3 rounded-full bg-[#F6A623]" />
        <span className="h-3 w-3 rounded-full bg-[#4ECDC4]" />
        <span className="ml-3 text-xs font-medium text-text-light">
          SMS Buddy API
        </span>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex items-center justify-between border-b border-border bg-[#FFF5EB] px-4">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "relative px-4 py-2.5 font-code text-sm font-medium transition-colors duration-200 rounded-t-lg cursor-pointer",
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-transparent text-text-light hover:text-text hover:bg-[#FFE8D6]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Copy button ── */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-text-light transition-colors hover:bg-[#FFE8D6] hover:text-text cursor-pointer"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-success font-semibold"
              >
                Copied!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* ── Code area ── */}
      <div className="bg-[#FFF5EB] p-5 font-code text-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {snippets[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
