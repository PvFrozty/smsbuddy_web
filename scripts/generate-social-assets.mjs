import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const brandSource = await readFile("src/lib/brand.ts", "utf8");
const mark = brandSource.match(/"(M10[^"]+)"/)[1];
const font = await readFile("src/lib/font-files/ubuntu-bold.ttf");
const logo = h("svg", { width: 76, height: 88, viewBox: "0 0 72 88" }, h("path", { d: mark, fill: "#244ceb", fillRule: "evenodd" }));
const image = new ImageResponse(
  h("div", { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "64px 76px", background: "#edf3ff", color: "#12234b", fontFamily: "Ubuntu", fontWeight: 700 } },
    h("div", { style: { display: "flex", alignItems: "center", gap: 20, fontSize: 48 } }, logo, "SMS Buddy"),
    h("div", { style: { display: "flex", flexDirection: "column", fontSize: 72, lineHeight: 1.08, letterSpacing: "-2px" } }, h("span", {}, "Your business."), h("span", {}, "Their inbox.")),
    h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 26 } }, h("span", {}, "Bulk SMS & API for Sri Lanka"), h("span", { style: { color: "#244ceb" } }, "smsbuddy.lk")),
  ),
  { width: 1200, height: 630, fonts: [{ name: "Ubuntu", data: font, style: "normal", weight: 700 }] },
);
await mkdir("public/social", { recursive: true });
await writeFile("public/social/smsbuddy.png", Buffer.from(await image.arrayBuffer()));
await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 112 112"><rect width="112" height="112" rx="20" fill="white"/><path transform="translate(20 12)" d="${mark}" fill="#244ceb" fill-rule="evenodd"/></svg>`)).png().toFile("public/brand/buddy-b.png");
console.log("Generated 1200×630 social image and 512×512 organization logo.");
