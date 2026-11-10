"""Build the SMS Buddy "5 steps" how-to ad as three HyperFrames projects (9:16, 4:5, 1:1).

Run from anywhere:  python3 videos/build_howto.py

The UI shots in videos/howto-ui/ are real screens from the SMS Buddy app (SMS_BUDDY repo,
resources/views/createNewCampaign.blade.php), rendered at 480 px wide and 3x density and
filled with an example 12.12 campaign by howto-ui/capture-widgets.mjs. No demo dashboard
statistics are shown.
"""
from pathlib import Path
import json
import shutil

import build_1111 as base

BASE = base.BASE
UI = BASE / "howto-ui"
FORMATS = base.FORMATS
DPR = 3  # widget images were captured at 3x

# Widget sizes in image pixels (from the PNGs).
SIZE = {
    "progress": (1296, 294), "name": (1194, 840), "audience": (1194, 1176), "message": (1194, 720),
    "schedule_now": (1194, 456), "schedule_later": (1260, 756), "launch": (1194, 420),
}

# Widget box limits per format: (max width, max height) in frame pixels, and heading block.
LIMITS = {
    "reels": dict(maxw=940, maxh=760, top=200, head=92),
    "feed": dict(maxw=940, maxh=800, top=96, head=80),
    "square": dict(maxw=920, maxh=640, top=70, head=70),
}

SCENES = [
    ("hook", 2.4, "cobalt"),
    ("name", 3.6, "sky"),
    ("audience", 2.8, "cobalt"),
    ("message", 3.2, "sky"),
    ("schedule", 2.0, "cobalt"),
    ("launch", 3.4, "sky"),
    ("delivered", 2.6, "cobalt"),
    ("endcard", 3.2, "cobalt"),
]

# The jingle sings "S-M-S Buddy" at ~20.5 s (end card) and "BING!" at 14.0 s (cut to the launch step).
SFX_LEN = {"pop.mp3": 0.72, "click-soft.mp3": 0.37, "whoosh-short.mp3": 0.57, "typing.mp3": 1.5, "sparkle.mp3": 1.8}


def fit(key, f):
    w, h = SIZE[key]
    lim = LIMITS[f["name"]]
    s = min(lim["maxw"] / w, lim["maxh"] / h)
    return round(w * s), round(h * s), s


CSS = """
#root{position:absolute;inset:0;overflow:hidden;font-family:Manrope,sans-serif;--cobalt:#244ceb;--ink:#12234b;--muted:#526589;--sky:#edf3ff;--amber:#ffb547}
#root .bg{position:absolute;inset:0}
#root .bg.cobalt{background:radial-gradient(120% 80% at 50% 20%,#2f58f5 0%,#244ceb 45%,#1a37b8 100%)}
#root .bg.sky{background:linear-gradient(180deg,#f6f9ff 0%,#edf3ff 100%)}
#root .col{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;text-align:center}
#root .eyebrow{display:inline-block;font-size:30px;font-weight:800;padding:8px 22px;border-radius:999px;margin-bottom:18px}
#root .on-cobalt .eyebrow{background:#ffffff26;color:#fff}
#root .on-sky .eyebrow{background:#dfe8fb;color:var(--cobalt)}
#root h2{margin:0;font-weight:800;letter-spacing:-.04em;line-height:1.06;text-wrap:balance}
#root .on-cobalt h2{color:#fff}
#root .on-sky h2{color:var(--ink)}
#root h2 em{font-style:normal;color:var(--amber)}
#root .on-sky h2 em{color:var(--cobalt)}
#root .shot{position:relative;border-radius:22px;background:#fff;box-shadow:0 30px 70px #0b1a5a33;overflow:hidden}
#root .shot img{position:absolute;left:0;top:0;width:100%;height:auto;display:block}
#root .shotwrap{position:relative}
#root .ex-pill{position:absolute;right:6px;top:-54px;font-size:28px;font-weight:700;padding:4px 16px;border-radius:999px;z-index:5}
#root .on-sky .ex-pill{color:#526589;background:#dfe8fb}
#root .on-cobalt .ex-pill{color:#fff;background:#ffffff2e}
#root .cursor{position:absolute;width:54px;height:54px;margin:-6px 0 0 -10px;z-index:8;filter:drop-shadow(0 4px 6px #0006)}
#root .ring{position:absolute;width:90px;height:90px;margin:-45px 0 0 -45px;border-radius:50%;border:5px solid #244ceb;z-index:7;opacity:0}
#root .hl{position:absolute;border:5px solid var(--amber);border-radius:16px;z-index:6;opacity:0}
"""

CURSOR = ('<svg viewBox="0 0 24 24" class="cursor" id="{id}"><path d="M3 2l17 10-7.5 1.6L17 21l-3 1.4-3.6-7.6L4 20z" '
          'fill="#12234b" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>')


def head(f, eyebrow, title, prefix):
    lim = LIMITS[f["name"]]
    eb = f'<div id="{prefix}-eyebrow" class="eyebrow">{eyebrow}</div>' if eyebrow else ""
    return (f'<div id="{prefix}-head" style="margin-top:{lim["top"]}px;padding:0 70px;margin-bottom:76px">{eb}'
            f'<h2 style="font-size:{lim["head"]}px">{title}</h2></div>')


def shot_box(key, f, inner, prefix, example=True):
    w, h, _ = fit(key, f)
    ex = f'<div class="ex-pill">Example</div>' if example else ""
    return f'<div class="shotwrap">{ex}<div id="{prefix}-shot" class="shot" style="width:{w}px;height:{h}px">{inner}</div></div>', w, h


def pct(px, total):
    return f"{px / total * 100:.2f}%"


def band(y0, y1, h, x0=0, w=None):
    """clip-path inset that shows only a horizontal band (image pixels); reveal by animating the right inset."""
    left = f"{x0 / w * 100:.2f}%" if w else "0%"
    return f"{y0 / h * 100:.2f}%", f"{100 - y1 / h * 100:.2f}%", left


def scene(sid, f):
    W, H = f["w"], f["h"]
    if sid == "hook":
        pw, ph, _ = fit("progress", f)
        size = {"reels": 112, "feed": 104, "square": 92}[f["name"]]
        html = f"""<div class="bg cobalt"></div>
  <div class="col on-cobalt" style="justify-content:center;gap:56px;padding:0 70px">
    <h2 id="hook-title" style="font-size:{size}px">Your sale SMS.<br><em>Sent in 5 steps.</em></h2>
    <div id="hook-shot" class="shot" style="width:{pw}px;height:{ph}px">
      <img id="hook-p1" src="assets/ui/progress1.png" alt="">
      <img id="hook-p5" src="assets/ui/progress5.png" alt="" style="clip-path:inset(0 100% 0 0)">
    </div>
  </div>"""
        js = """
tl.fromTo("#hook-title",{scale:1.04},{scale:1,duration:2.4,ease:"power1.out"},0);
tl.fromTo("#hook-shot",{opacity:0,y:40},{opacity:1,y:0,duration:.4,ease:"power3.out"},0.25);
tl.fromTo("#hook-p5",{clipPath:"inset(0% 100% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",duration:1.1,ease:"steps(5)"},0.75);
"""
        return html, js

    if sid == "name":
        w, h, _ = fit("name", f)
        iw, ih = SIZE["name"]
        t, b, l = band(150, 207, ih, 180, iw)
        inner = f"""<img src="assets/ui/name_empty.png" alt="">
      <img id="name-fill" src="assets/ui/name_filled.png" alt="" style="clip-path:inset({t} 100% {b} {l})">
      <div id="name-ring" class="ring" style="left:{pct(330, iw)};top:{pct(178, ih)}"></div>
      {CURSOR.format(id="name-cursor").replace('class="cursor"', f'class="cursor" style="left:{pct(330, iw)};top:{pct(178, ih)}"')}"""
        box, _, _ = shot_box("name", f, inner, "name")
        html = f"""<div class="bg sky"></div><div class="col on-sky">{head(f, "Step 1 of 5", "Name your <em>campaign.</em>", "name")}{box}</div>"""
        js = f"""
tl.fromTo("#name-head",{{opacity:0,y:30}},{{opacity:1,y:0,duration:.35,ease:"power3.out"}},0);
tl.fromTo("#name-shot",{{opacity:0,y:60}},{{opacity:1,y:0,duration:.45,ease:"power3.out"}},0.1);
tl.fromTo("#name-cursor",{{x:260,y:220,opacity:0}},{{x:0,y:0,opacity:1,duration:.5,ease:"power2.out"}},0.35);
tl.fromTo("#name-cursor",{{scale:1}},{{scale:.82,duration:.08,yoyo:true,repeat:1}},0.85);
tl.fromTo("#name-ring",{{scale:.4,opacity:.9}},{{scale:1.5,opacity:0,duration:.45}},0.86);
tl.fromTo("#name-fill",{{clipPath:"inset({t} 100% {b} {l})"}},{{clipPath:"inset({t} 0% {b} {l})",duration:1.0,ease:"steps(15)"}},1.05);
tl.to("#name-cursor",{{x:120,y:160,opacity:0,duration:.4}},1.3);
"""
        return html, js

    if sid == "audience":
        iw, ih = SIZE["audience"]
        inner = f"""<img src="assets/ui/audience.png" alt="">
      <div id="aud-hl" class="hl" style="left:{pct(130, iw)};top:{pct(520, ih)};width:{pct(470, iw)};height:{pct(110, ih)}"></div>
      <div id="aud-ring" class="ring" style="left:50%;top:{pct(160, ih)}"></div>
      {CURSOR.format(id="aud-cursor").replace('class="cursor"', f'class="cursor" style="left:50%;top:{pct(160, ih)}"')}"""
        box, _, _ = shot_box("audience", f, inner, "aud")
        html = f"""<div class="bg cobalt"></div><div class="col on-cobalt">{head(f, "Step 2 of 5", "Pick who <em>gets it.</em>", "aud")}{box}</div>"""
        js = """
tl.fromTo("#aud-head",{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:"power3.out"},0);
tl.fromTo("#aud-shot",{opacity:0,y:60},{opacity:1,y:0,duration:.45,ease:"power3.out"},0.1);
tl.fromTo("#aud-cursor",{x:240,y:260,opacity:0},{x:0,y:0,opacity:1,duration:.45,ease:"power2.out"},0.3);
tl.fromTo("#aud-cursor",{scale:1},{scale:.82,duration:.08,yoyo:true,repeat:1},0.75);
tl.fromTo("#aud-ring",{scale:.4,opacity:.9},{scale:1.5,opacity:0,duration:.45},0.76);
tl.to("#aud-cursor",{x:180,y:120,opacity:0,duration:.4},1.05);
tl.fromTo("#aud-hl",{opacity:0,scale:.92},{opacity:1,scale:1,duration:.3,ease:"back.out(2)"},1.2);
"""
        return html, js

    if sid == "message":
        iw, ih = SIZE["message"]
        lines = [(155, 215), (225, 287), (300, 352)]
        layers, tw = [], []
        for i, (y0, y1) in enumerate(lines):
            t, b, _ = band(y0, y1, ih)
            layers.append(f'<img id="msg-l{i}" src="assets/ui/message_filled.png" alt="" style="clip-path:inset({t} 100% {b} 0%)">')
            tw.append(f'tl.fromTo("#msg-l{i}",{{clipPath:"inset({t} 100% {b} 0%)"}},{{clipPath:"inset({t} 0% {b} 0%)",duration:{0.55 if i < 2 else 0.25},ease:"steps({18 if i < 2 else 5})"}},{0.7 + i * 0.6:.2f});')
        ct, cb, cl = band(540, 700, ih, 640, iw)
        inner = f"""<img src="assets/ui/message_empty.png" alt="">{''.join(layers)}
      <img id="msg-count" src="assets/ui/message_filled.png" alt="" style="clip-path:inset({ct} 0% {cb} {cl});opacity:0">"""
        box, _, _ = shot_box("message", f, inner, "msg")
        html = f"""<div class="bg sky"></div><div class="col on-sky">{head(f, "Step 3 of 5", "Write your <em>message.</em>", "msg")}{box}</div>"""
        js = f"""
tl.fromTo("#msg-head",{{opacity:0,y:30}},{{opacity:1,y:0,duration:.35,ease:"power3.out"}},0);
tl.fromTo("#msg-shot",{{opacity:0,y:60}},{{opacity:1,y:0,duration:.45,ease:"power3.out"}},0.1);
{chr(10).join(tw)}
tl.fromTo("#msg-count",{{opacity:0}},{{opacity:1,duration:.2}},2.0);
"""
        return html, js

    if sid == "schedule":
        lw, lh = SIZE["schedule_later"]
        w, h, s = fit("schedule_later", f)
        nw = round(SIZE["schedule_now"][0] * s)
        rx, ry = 137, 330
        inner = f"""<img id="sch-now" src="assets/ui/schedule_now.png" alt="" style="width:{nw}px">
      <img id="sch-later" src="assets/ui/schedule_later.png" alt="" style="opacity:0">
      <div id="sch-ring" class="ring" style="left:{pct(rx, lw)};top:{pct(ry, lh)}"></div>
      {CURSOR.format(id="sch-cursor").replace('class="cursor"', f'class="cursor" style="left:{pct(rx, lw)};top:{pct(ry, lh)}"')}"""
        box, _, _ = shot_box("schedule_later", f, inner, "sch")
        html = f"""<div class="bg cobalt"></div><div class="col on-cobalt">{head(f, "Step 4 of 5", "Send now or <em>schedule it.</em>", "sch")}{box}</div>"""
        js = """
tl.fromTo("#sch-head",{opacity:0,y:30},{opacity:1,y:0,duration:.3,ease:"power3.out"},0);
tl.fromTo("#sch-shot",{opacity:0,y:50},{opacity:1,y:0,duration:.4,ease:"power3.out"},0.05);
tl.fromTo("#sch-cursor",{x:300,y:180,opacity:0},{x:0,y:0,opacity:1,duration:.4,ease:"power2.out"},0.2);
tl.fromTo("#sch-cursor",{scale:1},{scale:.82,duration:.08,yoyo:true,repeat:1},0.62);
tl.fromTo("#sch-ring",{scale:.4,opacity:.9},{scale:1.5,opacity:0,duration:.45},0.63);
tl.fromTo("#sch-later",{opacity:0},{opacity:1,duration:.25},0.7);
tl.to("#sch-cursor",{x:200,y:140,opacity:0,duration:.35},1.0);
"""
        return html, js

    if sid == "launch":
        iw, ih = SIZE["launch"]
        cx, cy = 74, 132
        bx, by = 909, 342
        w, h, s = fit("launch", f)
        dx, dy = round((cx - bx) * s), round((cy - by) * s)
        inner = f"""<img src="assets/ui/launch_unchecked.png" alt="">
      <img id="lch-checked" src="assets/ui/launch_checked.png" alt="" style="opacity:0">
      <div id="lch-ring1" class="ring" style="left:{pct(cx, iw)};top:{pct(cy, ih)}"></div>
      <div id="lch-ring2" class="ring" style="left:{pct(bx, iw)};top:{pct(by, ih)};border-color:#ffb547"></div>
      {CURSOR.format(id="lch-cursor").replace('class="cursor"', f'class="cursor" style="left:{pct(bx, iw)};top:{pct(by, ih)}"')}"""
        box, _, _ = shot_box("launch", f, inner, "lch")
        html = f"""<div class="bg sky"></div><div class="col on-sky">{head(f, "Step 5 of 5", "Check it. <em>Launch it.</em>", "lch")}{box}</div>"""
        js = f"""
tl.fromTo("#lch-head",{{opacity:0,y:30}},{{opacity:1,y:0,duration:.35,ease:"power3.out"}},0);
tl.fromTo("#lch-shot",{{opacity:0,y:60}},{{opacity:1,y:0,duration:.45,ease:"power3.out"}},0.1);
tl.fromTo("#lch-cursor",{{x:{dx + 120},y:{dy + 200},opacity:0}},{{x:{dx},y:{dy},opacity:1,duration:.4,ease:"power2.out"}},0.3);
tl.to("#lch-cursor",{{scale:.82,duration:.08,yoyo:true,repeat:1}},0.72);
tl.fromTo("#lch-ring1",{{scale:.4,opacity:.9}},{{scale:1.4,opacity:0,duration:.45}},0.73);
tl.fromTo("#lch-checked",{{opacity:0}},{{opacity:1,duration:.12}},0.76);
tl.to("#lch-cursor",{{x:0,y:0,duration:.55,ease:"power2.inOut"}},1.05);
tl.to("#lch-cursor",{{scale:.82,duration:.08,yoyo:true,repeat:1}},1.7);
tl.fromTo("#lch-ring2",{{scale:.4,opacity:1}},{{scale:2.2,opacity:0,duration:.6}},1.71);
tl.fromTo("#lch-shot",{{scale:1}},{{scale:1.03,duration:.12,yoyo:true,repeat:1}},1.71);
"""
        return html, js

    if sid == "delivered":
        thread = ('<div class="stamp">Sat 12 Dec 9:00 AM</div><div id="dlv-bubble" class="bubble">'
                  'Hi Nimali! Our 12.12 sale starts tomorrow: up to 30% off everything at YOUR STORE. Reply STOP to opt out.</div>')
        lim = LIMITS[f["name"]]
        zoom = {"reels": 0.84, "feed": 0.72, "square": 0.64}[f["name"]]
        html = f"""<div class="bg cobalt"></div>
  <div class="col on-cobalt">{head(f, "", "On every phone. <em>Under your name.</em>", "dlv")}
    <div style="zoom:{zoom}">{base.phone("dlv", thread)}</div></div>"""
        js = """
tl.fromTo("#dlv-head",{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:"power3.out"},0);
tl.fromTo("#dlv-phone",{y:120,opacity:0},{y:0,opacity:1,duration:.5,ease:"power3.out"},0.05);
tl.fromTo("#dlv-label",{opacity:0},{opacity:1,duration:.3},0.3);
tl.fromTo("#dlv-bubble",{opacity:0,scale:.6,transformOrigin:"0% 100%"},{opacity:1,scale:1,duration:.4,ease:"back.out(1.7)"},0.6);
tl.fromTo("#dlv-sender",{backgroundColor:"rgba(255,181,71,0)"},{backgroundColor:"rgba(255,181,71,.45)",duration:.3},1.1);
"""
        return html, js

    if sid == "endcard":
        hs = {"reels": 96, "feed": 88, "square": 80}[f["name"]]
        html = f"""<div class="bg cobalt"></div>
  <div class="col on-cobalt" style="justify-content:center;gap:40px;padding:{f['pad']}">
    <div id="end-logo">{base.logo('#fff', 88)}</div>
    <h2 id="end-head" style="font-size:{hs}px">Try it with <em>10 free SMS.</em></h2>
    <div id="end-cta" style="display:inline-flex;align-items:center;gap:18px;background:#fff;color:#244ceb;font-size:44px;font-weight:800;padding:26px 46px;border-radius:22px;box-shadow:0 18px 40px #0b1a5a55">Get Started <span style="font-size:46px">→</span></div>
    <div id="end-url" style="color:#fff;font-size:40px;font-weight:700">smsbuddy.lk</div>
    <div id="end-terms" style="color:#dbe5ff;font-size:30px;font-weight:600">No monthly fee. Credits never expire.</div>
  </div>"""
        js = """
tl.fromTo("#end-logo",{opacity:0,y:-30},{opacity:1,y:0,duration:.4,ease:"power3.out"},0);
tl.fromTo("#end-head",{opacity:0,y:40},{opacity:1,y:0,duration:.45,ease:"power3.out"},0.2);
tl.fromTo("#end-cta",{opacity:0,scale:.7},{opacity:1,scale:1,duration:.4,ease:"back.out(2)"},0.55);
tl.fromTo("#end-url",{opacity:0},{opacity:1,duration:.3},0.8);
tl.fromTo("#end-terms",{opacity:0},{opacity:1,duration:.3},0.95);
tl.to("#end-cta",{scale:1.04,duration:.5,ease:"sine.inOut",yoyo:true,repeat:1},1.4);
"""
        return html, js
    raise KeyError(sid)


def scene_file(sid, dur, f):
    html, js = scene(sid, f)
    return f"""<template>
  <style>{base.FONT_CSS}{base.base_css(f)}{CSS}</style>
  <div id="root" data-composition-id="{sid}" data-width="{f['w']}" data-height="{f['h']}">
  {html}
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
{js}
    tl.set({{}}, {{}}, {dur});
    window.__timelines["{sid}"] = tl;
  </script>
</template>
"""


def cue_times():
    """Absolute sound cues: (id, file, time the picture lands, volume). Start = land - onset."""
    starts, t = {}, 0.0
    for sid, dur, _ in SCENES:
        starts[sid] = t
        t += dur
    s = starts
    onset = {"pop.mp3": .117, "click-soft.mp3": .055, "whoosh-short.mp3": .124, "typing.mp3": .455, "sparkle.mp3": .025}
    cues = [
        ("sfx-hook", "sparkle.mp3", s["hook"] + 0.78, 0.45),
        ("sfx-cut1", "whoosh-short.mp3", s["name"] + 0.03, 0.6),
        ("sfx-name-click", "click-soft.mp3", s["name"] + 0.88, 2.2),
        ("sfx-name-type", "typing.mp3", s["name"] + 1.05, 1.6),
        ("sfx-aud-click", "click-soft.mp3", s["audience"] + 0.78, 2.2),
        ("sfx-aud-pop", "pop.mp3", s["audience"] + 1.23, 0.9),
        ("sfx-msg-type", "typing.mp3", s["message"] + 0.7, 1.6),
        ("sfx-sch-click", "click-soft.mp3", s["schedule"] + 0.65, 2.2),
        ("sfx-lch-check", "click-soft.mp3", s["launch"] + 0.76, 2.2),
        ("sfx-lch-launch", "pop.mp3", s["launch"] + 1.74, 1.1),
        ("sfx-dlv", "pop.mp3", s["delivered"] + 0.63, 0.9),
    ]
    return [(cid, fname, round(land - onset[fname] + 0.033, 2), vol) for cid, fname, land, vol in cues]


def index_file(name, f):
    hosts, t = [], 0.0
    for sid, dur, _ in SCENES:
        hosts.append(f'      <div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" '
                     f'data-start="{t:.2f}" data-duration="{dur}" data-track-index="1" data-track-kind="graphics" '
                     f'data-width="{f["w"]}" data-height="{f["h"]}"></div>')
        t += dur
    total = round(t, 2)
    hosts.append(f'      <audio id="jingle" class="clip" src="assets/audio/sms-buddy-jingle.wav" data-start="0" data-duration="{total}" '
                 f'data-track-index="2" data-volume="1" data-fade-out="0.9"></audio>')
    for i, (cid, fname, start, vol) in enumerate(cue_times()):
        hosts.append(f'      <audio id="{cid}" class="clip" src="assets/sfx/{fname}" data-start="{start}" data-duration="{SFX_LEN[fname]}" '
                     f'data-track-index="{3 + i % 2}" data-volume="{vol}"></audio>')
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width={f['w']}, height={f['h']}" />
    <title>SMS Buddy how-to ad ({name})</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ width: {f['w']}px; height: {f['h']}px; overflow: hidden; background: #244ceb; }}
      #main {{ position: relative; width: 100%; height: 100%; }}
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="{total}" data-width="{f['w']}" data-height="{f['h']}">
{chr(10).join(hosts)}
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
"""


def build():
    template = BASE / "smsbuddy-1111-reels"
    for name, f in FORMATS.items():
        f = dict(f, name=name)
        proj = BASE / f"smsbuddy-howto-{name}"
        if not proj.exists():
            shutil.copytree(template, proj, ignore=shutil.ignore_patterns("compositions", "assets", "snapshots*", "*.mp4", ".hyperframes", "renders"))
            for fn, key in (("meta.json", None), ("package.json", None)):
                data = json.loads((proj / fn).read_text())
                data["name"] = proj.name
                if fn == "meta.json":
                    data["id"] = proj.name
                (proj / fn).write_text(json.dumps(data, indent=2))
        (proj / "compositions").mkdir(exist_ok=True)
        for sub in ("fonts", "audio", "sfx", "ui"):
            (proj / "assets" / sub).mkdir(parents=True, exist_ok=True)
        for font in base.FONTS.iterdir():
            shutil.copy(font, proj / "assets" / "fonts" / font.name)
        shutil.copy(base.JINGLE, proj / "assets" / "audio" / base.JINGLE.name)
        for fname in SFX_LEN:
            shutil.copy(base.SFX_DIR / fname, proj / "assets" / "sfx" / fname)
        for png in UI.glob("*.png"):
            shutil.copy(png, proj / "assets" / "ui" / png.name)
        for sid, dur, _ in SCENES:
            (proj / "compositions" / f"{sid}.html").write_text(scene_file(sid, dur, f))
        (proj / "index.html").write_text(index_file(name, f))
        print("built", proj.name)


if __name__ == "__main__":
    build()
