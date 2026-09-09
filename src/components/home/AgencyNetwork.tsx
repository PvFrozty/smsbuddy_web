import { BUDDY_B_PATH } from "@/lib/brand";

export function AgencyNetwork() {
  return (
    <div className="sb-agency-network" role="img" aria-label="Example: one SMS Buddy credit pool connects three approved brand sender names">
      <svg viewBox="0 0 520 400" fill="none" aria-hidden="true">
        <circle cx="260" cy="200" r="168" stroke="#334970" />
        <circle cx="260" cy="200" r="110" stroke="#334970" />
        <g stroke="#7596df" strokeWidth="1.5">
          <path d="M260 160V78H118" />
          <path d="M304 200H406V118" />
          <path d="M260 242V327H366" />
        </g>
        <g fill="#b5ccff">
          <circle className="sb-network-dot" cx="183" cy="78" r="4" />
          <circle className="sb-network-dot" cx="406" cy="160" r="4" />
          <circle className="sb-network-dot" cx="300" cy="327" r="4" />
        </g>
        <rect x="214" y="154" width="92" height="92" rx="24" fill="#244ceb" />
        <path d={BUDDY_B_PATH} transform="translate(238 172) scale(.65)" fill="white" fillRule="evenodd" />
        <g fontFamily="var(--font-body), sans-serif" textAnchor="middle" fontWeight="600" fontSize="12" fill="#edf3ff">
          <rect x="28" y="53" width="128" height="50" rx="12" fill="#21355d" />
          <text x="92" y="83">YOUR STORE</text>
          <rect x="348" y="71" width="142" height="50" rx="12" fill="#21355d" />
          <text x="419" y="101">YOUR STUDIO</text>
          <rect x="342" y="302" width="146" height="50" rx="12" fill="#21355d" />
          <text x="415" y="332">YOUR NEXT BRAND</text>
        </g>
      </svg>
      <div className="sb-network-caption"><strong>One account. One credit pool.</strong><span>Illustrative setup · Approved sender names</span></div>
    </div>
  );
}
