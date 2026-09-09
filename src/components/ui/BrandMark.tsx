import { BUDDY_B_PATH } from "@/lib/brand";

export function BrandMark() {
  return (
    <span className="sb-brand">
      <svg
        viewBox="0 0 72 88"
        width="36"
        height="36"
        fill="none"
        aria-hidden="true"
      >
        <path
          d={BUDDY_B_PATH}
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
      <span>
        SMS Buddy
      </span>
    </span>
  );
}
