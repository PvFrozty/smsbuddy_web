import { useId } from "react";

/** Decorative hardware; the screen remains live, accessible HTML. */
export function PhoneFrame() {
  const id = useId();
  return (
    <svg className="sb-phone-frame" viewBox="0 0 320 660" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-rim`} x1="8" y1="0" x2="312" y2="660" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a6abb4" />
          <stop offset=".16" stopColor="#353940" />
          <stop offset=".48" stopColor="#747a84" />
          <stop offset=".76" stopColor="#282b31" />
          <stop offset="1" stopColor="#8b919b" />
        </linearGradient>
        <linearGradient id={`${id}-lens`} x1="194" y1="24" x2="202" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#25364c" />
          <stop offset="1" stopColor="#080b12" />
        </linearGradient>
      </defs>
      <g fill="#4b5059">
        <rect x="3" y="112" width="6" height="25" rx="2" />
        <rect x="2" y="156" width="7" height="49" rx="2" />
        <rect x="2" y="218" width="7" height="49" rx="2" />
        <rect x="311" y="178" width="7" height="77" rx="2" />
      </g>
      <path fill={`url(#${id}-rim)`} fillRule="evenodd" d="M57 1H263A49 49 0 0 1 312 50V610A49 49 0 0 1 263 659H57A49 49 0 0 1 8 610V50A49 49 0 0 1 57 1ZM58 14A39 39 0 0 0 19 53V607A39 39 0 0 0 58 646H262A39 39 0 0 0 301 607V53A39 39 0 0 0 262 14Z" />
      <rect x="11" y="4" width="298" height="652" rx="46" stroke="#121418" strokeWidth="5" />
      <rect x="18" y="13" width="284" height="634" rx="40" stroke="#07080a" strokeWidth="3" />
      <path d="M15 76V51C15 26 32 8 58 8H99M306 583V609C306 634 289 652 263 652H227" stroke="#d9dce2" strokeOpacity=".55" strokeWidth="1.2" strokeLinecap="round" />
      <g stroke="#b0b5bf" strokeWidth="2" opacity=".6">
        <path d="M8 86H15M305 86H312M8 570H15M305 570H312" />
      </g>
      <rect x="113" y="24" width="94" height="26" rx="13" fill="#08090b" />
      <circle cx="194" cy="37" r="6" fill="#131923" />
      <circle cx="194" cy="37" r="3.7" fill={`url(#${id}-lens)`} />
      <circle cx="192.8" cy="35.7" r="1" fill="#596a93" opacity=".7" />
      <rect x="115" y="632" width="90" height="4" rx="2" fill="#15171b" />
    </svg>
  );
}
