"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { Icon } from "@/components/ui/Icon";
import { registerUrl, siteConfig } from "@/lib/constants";
const links = [
  { label: "Product", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "For agencies", href: "/for-agencies" },
  { label: "For developers", href: "/for-developers" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <header
      className="sb-header"
      ref={header}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <nav className="sb-shell sb-nav" aria-label="Main navigation">
        <Link href="/" aria-label="SMS Buddy home">
          <BrandMark />
        </Link>
        <div className="sb-nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="sb-nav-actions">
          <a className="sb-login" href={siteConfig.portal}>
            Log in
          </a>
          <a
            className="sb-primary sb-nav-cta"
            href={registerUrl}
            data-cta-location="header"
          >
            Get Started <Icon name="arrow" size={18} />
          </a>
          <button
            className="sb-menu-toggle"
            ref={toggle}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>
      {open && (
        <nav
          className="sb-mobile-nav"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {[
            ...links,
            { label: "For small businesses", href: "/for-smes" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
              <Icon name="arrow" size={18} />
            </Link>
          ))}
          <a href={siteConfig.portal}>
            Log in
            <Icon name="arrow" size={18} />
          </a>
        </nav>
      )}
    </header>
  );
}
