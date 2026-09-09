import localFont from "next/font/local";

export const ubuntu = localFont({
  src: "./font-files/ubuntu-bold.ttf",
  display: "swap",
  variable: "--font-brand",
  weight: "700",
});

export const plusJakartaSans = localFont({
  src: "./font-files/manrope.woff2",
  display: "swap",
  variable: "--font-heading",
  weight: "200 800",
});

export const inter = localFont({
  src: "./font-files/inter.woff2",
  display: "swap",
  variable: "--font-body",
  weight: "100 900",
});

export const jetbrainsMono = localFont({
  src: "./font-files/jetbrains-mono.woff2",
  display: "swap",
  variable: "--font-code",
  weight: "100 800",
  preload: false,
});
