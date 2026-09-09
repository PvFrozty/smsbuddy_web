import type { CSSProperties } from "react";
export function Icon({
  name,
  size = 22,
  style,
}: {
  name:
    | "arrow"
    | "check"
    | "message"
    | "box"
    | "lock"
    | "code"
    | "people"
    | "plus"
    | "close"
    | "menu";
  size?: number;
  style?: CSSProperties;
}) {
  const paths = {
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    message: (
      <>
        <path d="M5 4h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-6 3V6a2 2 0 0 1 2-2Z" />
        <path d="M7 9h10M7 13h6" />
      </>
    ),
    box: (
      <>
        <path d="m12 3 9 5v9l-9 5-9-5V8l9-5Z" />
        <path d="m3 8 9 5 9-5M12 13v9M7 6l10 5" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    code: (
      <>
        <path d="m7 7-5 5 5 5M17 7l5 5-5 5M14 4l-4 16" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3M17 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 4v3" />
      </>
    ),
    plus: <path d="M5 12h14M12 5v14" />,
    close: <path d="m5 5 14 14M5 19 19 5" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      {paths[name]}
    </svg>
  );
}
