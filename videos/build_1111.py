"""Build the SMS Buddy 11.11 ad as three HyperFrames projects (9:16, 4:5, 1:1).

Run from anywhere:  python3 videos/build_1111.py
Each project is standalone and editable: index.html mounts one scene per file in compositions/.
"""
from pathlib import Path
import json
import re
import shutil

BASE = Path(__file__).resolve().parent
ROOT = BASE.parent
MARK = re.search(r'"(M10.*?)";', (ROOT / "src/lib/brand.ts").read_text()).group(1)
FONTS = BASE / "1111-fonts"
# The SMS Buddy jingle lives in the portal repo's marketing folder; effects are Pixabay-licensed (free for ads).
JINGLE = ROOT.parent / "SMS_BUDDY" / "marketing" / "assets" / "audio" / "sms-buddy-jingle.wav"
SFX_DIR = Path.home() / ".claude/skills/media-use/audio/assets/sfx"

# Sound cues: (id, file, start s, volume). Starts are set so each effect's onset lands
# one frame after the picture it belongs to (measured onsets: pop .117, click-soft .055,
# sparkle .025, whoosh-short .124). The jingle sings "S-M-S Buddy" at ~20.5 s, on the end
# card, and its own "BING!" at 14.0 s carries the lock-screen notification.
SFX_LEN = {"pop.mp3": 0.72, "click-soft.mp3": 0.37, "sparkle.mp3": 1.8, "whoosh-short.mp3": 0.57}
SFX = [
    ("sfx-cut1", "whoosh-short.mp3", 2.31, 0.70),
    ("sfx-announce", "pop.mp3", 3.06, 1.10),
    ("sfx-chip", "click-soft.mp3", 3.93, 2.20),
    ("sfx-reach", "pop.mp3", 6.16, 1.10),
    ("sfx-fanout", "sparkle.mp3", 6.80, 0.50),
    ("sfx-lang1", "click-soft.mp3", 9.13, 2.20),
    ("sfx-lang2", "click-soft.mp3", 10.38, 2.20),
    ("sfx-lang3", "click-soft.mp3", 11.68, 2.20),
    ("sfx-cut2", "whoosh-short.mp3", 13.11, 0.70),
    ("sfx-order1", "pop.mp3", 17.06, 1.10),
    ("sfx-order2", "pop.mp3", 17.96, 1.10),
]

# ---------------------------------------------------------------- formats
FORMATS = {
    # Reels/Stories: keep every word between y=200 and y=1320 (bottom 30% is platform UI).
    "reels": dict(w=1080, h=1920, layout="col", pad="200px 80px 600px", head=96, hook=300, vis=0.80, gap=56),
    "feed": dict(w=1080, h=1350, layout="col", pad="96px 80px 96px", head=84, hook=280, vis=0.74, gap=40),
    "square": dict(w=1080, h=1080, layout="row", pad="80px 72px", head=76, hook=250, vis=0.80, gap=40),
}

# Scene id, duration (s), background
SCENES = [
    ("hook", 2.4, "cobalt"),
    ("announce", 3.6, "sky"),
    ("reach", 2.8, "cobalt"),
    ("language", 4.4, "sky"),
    ("remind", 3.4, "cobalt"),
    ("orders", 3.4, "sky"),
    ("endcard", 3.2, "cobalt"),
]

FONT_CSS = """
@font-face{font-family:Manrope;src:url('assets/fonts/manrope.woff2') format('woff2');font-weight:200 800;font-display:block}
@font-face{font-family:'SB Ubuntu';src:url('assets/fonts/ubuntu-bold.woff2') format('woff2');font-weight:700;font-display:block}
@font-face{font-family:'Noto Sans Sinhala';src:url('assets/fonts/noto-sans-sinhala.ttf') format('truetype');font-weight:100 900;font-display:block}
@font-face{font-family:'Noto Sans Tamil';src:url('assets/fonts/noto-sans-tamil.woff2') format('woff2');font-weight:600;font-display:block}
"""


def base_css(f):
    row = f["layout"] == "row"
    return FONT_CSS + f"""
#root{{position:absolute;inset:0;overflow:hidden;font-family:Manrope,sans-serif;
  --cobalt:#244ceb;--cobalt-deep:#1a37b8;--ink:#12234b;--muted:#526589;--sky:#edf3ff;--line:#dce5f3;--amber:#ffb547;--amber-ink:#5a3300}}
#root .bg{{position:absolute;inset:0}}
#root .bg.cobalt{{background:radial-gradient(120% 80% at 50% 20%,#2f58f5 0%,#244ceb 45%,#1a37b8 100%)}}
#root .bg.sky{{background:linear-gradient(180deg,#f6f9ff 0%,#edf3ff 100%)}}
#root .stage{{position:absolute;inset:0;padding:{f['pad']};display:flex;
  flex-direction:{'row' if row else 'column'};align-items:center;justify-content:{'space-between' if row else 'flex-start'};gap:{f['gap']}px}}
#root .copy{{{'width:46%;' if row else 'width:100%;'}text-align:{'left' if row else 'center'}}}
#root h2{{font-size:{f['head']}px;line-height:1.06;letter-spacing:-.04em;font-weight:800;margin:0;text-wrap:balance}}
#root .on-cobalt h2{{color:#fff}}
#root .on-sky h2{{color:var(--ink)}}
#root h2 em{{font-style:normal;color:var(--amber)}}
#root .on-sky h2 em{{color:var(--cobalt)}}
#root .vis-wrap{{flex:1;{'height:100%;' if row else 'width:100%;'}display:flex;align-items:{'center' if row else 'flex-start'};justify-content:center;min-height:0}}
#root .vis{{zoom:{f['vis']}}}
/* phone */
#root .phone-col{{display:flex;flex-direction:column;align-items:center;gap:22px}}
#root .example{{font-size:30px;font-weight:700;letter-spacing:.01em;padding:8px 22px;border-radius:999px}}
#root .on-cobalt .example{{background:#ffffff26;color:#fff}}
#root .on-sky .example{{background:#dfe8fb;color:var(--muted)}}
#root .phone{{width:520px;height:1000px;border-radius:72px;background:#0e1730;padding:16px;box-shadow:0 40px 80px #0b1a5a40,inset 0 0 0 2px #2b3a63}}
#root .screen{{position:relative;width:100%;height:100%;border-radius:58px;background:#f4f6fb;overflow:hidden;display:flex;flex-direction:column}}
#root .notch{{position:absolute;top:18px;left:50%;width:150px;height:40px;margin-left:-75px;border-radius:24px;background:#0e1730;z-index:3}}
#root .appbar{{padding:86px 30px 22px;display:flex;flex-direction:column;align-items:center;gap:10px;background:#fff;border-bottom:2px solid var(--line)}}
#root .avatar{{width:92px;height:92px;border-radius:50%;background:var(--cobalt);color:#fff;font-size:34px;font-weight:800;display:flex;align-items:center;justify-content:center}}
#root .sender{{position:relative;font-size:34px;font-weight:800;color:var(--ink);letter-spacing:.02em;padding:4px 16px;border-radius:12px}}
#root .thread{{flex:1;padding:30px 26px;display:flex;flex-direction:column;gap:20px;align-items:flex-start}}
#root .bubble{{max-width:410px;background:#e6ebf5;color:var(--ink);font-size:36px;line-height:1.3;font-weight:600;padding:22px 28px;border-radius:34px 34px 34px 10px}}
#root .stamp{{font-size:36px;color:var(--muted);font-weight:600;align-self:center}}
"""


def phone(prefix, thread_html, label=True, sender="YOUR STORE", extra_screen="", bare=False):
    lab = f'<div id="{prefix}-label" class="example">Example message</div>' if label else ""
    body = "" if bare else f"""<div class="appbar"><div class="avatar">YS</div><div id="{prefix}-sender" class="sender">{sender}</div></div>
        <div class="thread">{thread_html}</div>"""
    return f"""<div class="phone-col">{lab}
      <div id="{prefix}-phone" class="phone"><div class="screen"><div class="notch"></div>
        {body}{extra_screen}
      </div></div></div>"""


def logo(color="#fff", size=64):
    return (f'<div class="brand" style="display:flex;align-items:center;gap:{size*0.3:.0f}px;color:{color}">'
            f'<svg viewBox="0 0 72 88" style="width:{size*0.82:.0f}px;height:{size:.0f}px" aria-hidden="true">'
            f'<path d="{MARK}" fill="currentColor" fill-rule="evenodd"/></svg>'
            f'<span style="font-family:\'SB Ubuntu\',sans-serif;font-weight:700;font-size:{size*0.78:.0f}px;letter-spacing:-.01em">SMS Buddy</span></div>')


# ---------------------------------------------------------------- scenes
def scene_hook(f):
    css = f"""
#root .hook{{position:absolute;inset:0;padding:{f['pad']};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:18px}}
#root .digits{{display:flex;align-items:baseline;font-size:{f['hook']}px;font-weight:800;letter-spacing:-.06em;line-height:1;color:var(--amber)}}
#root .digits span{{display:inline-block}}
#root .kicker{{font-size:{f['head']*0.62:.0f}px;font-weight:800;color:#fff;letter-spacing:-.03em}}
#root .ask{{font-size:{f['head']*0.62:.0f}px;font-weight:600;color:#dbe5ff;letter-spacing:-.02em;margin-top:22px}}
#root .ask b{{color:#fff;font-weight:800}}
"""
    html = """<div class="bg cobalt"></div>
  <div class="hook">
    <div id="hook-digits" class="digits"><span id="hook-d1">1</span><span id="hook-d2">1</span><span id="hook-dot">.</span><span id="hook-d3">1</span><span id="hook-d4">1</span></div>
    <div id="hook-kicker" class="kicker">is almost here.</div>
    <div id="hook-ask" class="ask">Are your customers <b>ready?</b></div>
  </div>"""
    js = """
tl.fromTo("#hook-digits",{scale:1.08},{scale:1,duration:2.6,ease:"power1.out"},0);
tl.fromTo(["#hook-d1","#hook-d2","#hook-dot","#hook-d3","#hook-d4"],{yPercent:0},{yPercent:-6,duration:.18,ease:"power2.out",stagger:.06,yoyo:true,repeat:1},0.05);
tl.fromTo("#hook-kicker",{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:"power3.out"},0.35);
tl.fromTo("#hook-ask",{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:"power3.out"},1.1);
"""
    return css, html, js


def scene_announce(f):
    css = """
#root .chip{display:inline-block;margin-top:22px;background:var(--amber);color:var(--amber-ink);font-size:34px;font-weight:800;padding:12px 26px;border-radius:999px}
#root .stage[data-row] .chip{font-size:28px;white-space:nowrap;padding:10px 22px}
"""
    thread = '<div class="stamp">Today 9:00 AM</div><div id="announce-bubble" class="bubble">Our 11.11 sale starts at midnight. Don’t miss it!</div>'
    html = f"""<div class="bg sky"></div>
  <div class="stage on-sky"{' data-row' if f['layout']=='row' else ''}>
    <div class="copy"><h2 id="announce-head">Announce <em>your sale.</em></h2><div id="announce-chip" class="chip">Sent as your business name</div></div>
    <div class="vis-wrap"><div class="vis">{phone('announce', thread)}</div></div>
  </div>"""
    js = """
tl.fromTo("#announce-head",{opacity:0,y:40},{opacity:1,y:0,duration:.4,ease:"power3.out"},0);
tl.fromTo("#announce-phone",{y:120,opacity:0},{y:0,opacity:1,duration:.55,ease:"power3.out"},0.05);
tl.fromTo("#announce-label",{opacity:0},{opacity:1,duration:.3},0.3);
tl.fromTo("#announce-bubble",{opacity:0,scale:.6,transformOrigin:"0% 100%"},{opacity:1,scale:1,duration:.4,ease:"back.out(1.7)"},0.75);
tl.fromTo("#announce-sender",{backgroundColor:"rgba(255,181,71,0)"},{backgroundColor:"rgba(255,181,71,.45)",duration:.3},1.5);
tl.fromTo("#announce-chip",{opacity:0,y:20,scale:.8},{opacity:1,y:0,scale:1,duration:.35,ease:"back.out(2)"},1.55);
tl.fromTo("#announce-phone",{rotation:0},{rotation:-1.5,duration:2.2,ease:"sine.inOut"},1.2);
"""
    return css, html, js


def scene_reach(f):
    cells = []
    order = [4, 1, 3, 5, 7, 0, 2, 6, 8]
    for i in range(9):
        src = " src" if i == 4 else ""
        cells.append(f'<div id="reach-c{i}" class="card{src}"><div class="av">YS</div><div class="txt"><b>YOUR STORE</b><span>11.11 sale starts at midnight!</span></div></div>')
    css = """
#root .grid{display:grid;grid-template-columns:repeat(3,300px);gap:22px}
#root .card{background:#fff;border-radius:24px;padding:20px;display:flex;gap:14px;align-items:flex-start;box-shadow:0 18px 30px #0b1a5a33;height:180px}
#root .card.src{outline:5px solid var(--amber)}
#root .av{flex:none;width:52px;height:52px;border-radius:50%;background:var(--cobalt);color:#fff;font-size:20px;font-weight:800;display:flex;align-items:center;justify-content:center}
#root .txt{display:flex;flex-direction:column;gap:6px;color:var(--ink);font-size:30px;line-height:1.2}
#root .txt b{font-size:26px;letter-spacing:.03em}
#root .txt span{font-weight:600;color:#33456f}
#root .count{margin-top:34px;text-align:center;color:#fff;font-size:40px;font-weight:800}
#root .count span{color:var(--amber)}
"""
    if f["layout"] == "row":  # square: stack the headline over the grid so the cards fit
        css += "#root .stage{flex-direction:column;justify-content:flex-start}#root .copy{width:100%;text-align:center}#root .vis-wrap{width:100%;height:auto;align-items:flex-start}"
    html = f"""<div class="bg cobalt"></div>
  <div class="stage on-cobalt">
    <div class="copy"><h2 id="reach-head">Reach your <em>whole list</em> at once.</h2></div>
    <div class="vis-wrap"><div class="vis"><div class="grid">{''.join(cells)}</div>
      <div id="reach-count" class="count">One message. <span>Every customer.</span></div></div></div>
  </div>"""
    sel = json.dumps([f"#reach-c{i}" for i in order[1:]])
    js = f"""
tl.fromTo("#reach-head",{{opacity:0,y:40}},{{opacity:1,y:0,duration:.4,ease:"power3.out"}},0);
tl.fromTo("#reach-c4",{{opacity:0,scale:.5}},{{opacity:1,scale:1,duration:.4,ease:"back.out(1.8)"}},0.25);
tl.fromTo({sel},{{opacity:0,scale:.4}},{{opacity:1,scale:1,duration:.35,ease:"back.out(1.8)",stagger:.07}},0.8);
tl.fromTo("#reach-count",{{opacity:0,y:20}},{{opacity:1,y:0,duration:.35,ease:"power3.out"}},1.65);
"""
    return css, html, js


def scene_language(f):
    css = """
#root .langs{display:flex;gap:14px;justify-content:center;margin-bottom:6px}
#root .lang{font-size:34px;font-weight:800;padding:10px 26px;border-radius:999px;background:#dfe8fb;color:var(--muted)}
#root .lang.si{font-family:'Noto Sans Sinhala',Manrope,sans-serif}
#root .lang.ta{font-family:'Noto Sans Tamil',Manrope,sans-serif;font-weight:600}
#root .stack{position:relative;width:410px;height:300px}
#root .stack .bubble{position:absolute;left:0;top:0}
#root .bubble.si{font-family:'Noto Sans Sinhala',Manrope,sans-serif;font-weight:600;line-height:1.45}
#root .bubble.ta{font-family:'Noto Sans Tamil',Manrope,sans-serif;font-weight:600;line-height:1.45;font-size:32px}
"""
    thread = """<div class="stamp">Today 9:00 AM</div><div class="stack">
      <div id="language-en" class="bubble">Our 11.11 sale starts at midnight. Don’t miss it!</div>
      <div id="language-si" class="bubble si">අපේ 11.11 විශේෂ වට්ටම් අද රෑ 12ට පටන් ගන්නවා!</div>
      <div id="language-ta" class="bubble ta">எங்கள் 11.11 சிறப்பு தள்ளுபடி இன்று நள்ளிரவு ஆரம்பம்!</div></div>"""
    html = f"""<div class="bg sky"></div>
  <div class="stage on-sky">
    <div class="copy"><h2 id="language-head">In <em>Sinhala, Tamil</em> or English.</h2></div>
    <div class="vis-wrap"><div class="vis"><div class="langs"><div id="language-ten" class="lang">English</div><div id="language-tsi" class="lang si">සිංහල</div><div id="language-tta" class="lang ta">தமிழ்</div></div>{phone('language', thread, label=True)}</div></div>
  </div>"""
    on = '{backgroundColor:"#244ceb",color:"#ffffff"}'
    off = '{backgroundColor:"#dfe8fb",color:"#526589"}'
    js = f"""
tl.fromTo("#language-head",{{opacity:0,y:40}},{{opacity:1,y:0,duration:.4,ease:"power3.out"}},0);
tl.fromTo("#language-phone",{{y:100,opacity:0}},{{y:0,opacity:1,duration:.5,ease:"power3.out"}},0.05);
tl.fromTo("#language-en",{{opacity:0,y:20}},{{opacity:1,y:0,duration:.3}},0.35);
tl.fromTo("#language-si",{{opacity:0,y:20}},{{opacity:0,y:20,duration:.01}},0);
tl.fromTo("#language-ta",{{opacity:0,y:20}},{{opacity:0,y:20,duration:.01}},0);
tl.fromTo("#language-ten",{off},{{...{on},duration:.2}},0.35);
tl.to("#language-en",{{opacity:0,y:-20,duration:.25}},1.55);
tl.to("#language-si",{{opacity:1,y:0,duration:.3}},1.65);
tl.to("#language-ten",{{...{off},duration:.2}},1.6);
tl.fromTo("#language-tsi",{off},{{...{on},duration:.2}},1.6);
tl.to("#language-si",{{opacity:0,y:-20,duration:.25}},2.85);
tl.to("#language-ta",{{opacity:1,y:0,duration:.3}},2.95);
tl.to("#language-tsi",{{...{off},duration:.2}},2.9);
tl.fromTo("#language-tta",{off},{{...{on},duration:.2}},2.9);
"""
    return css, html, js


def scene_remind(f):
    css = """
#root .lock{position:absolute;inset:0;background:linear-gradient(180deg,#1f3fc7 0%,#12234b 100%);display:flex;flex-direction:column;align-items:center;padding-top:110px;color:#fff;z-index:2}
#root .lock .date{font-size:30px;font-weight:700;opacity:.85}
#root .lock .time{font-size:150px;font-weight:700;letter-spacing:-.05em;line-height:1.05;font-variant-numeric:tabular-nums}
#root .note{margin-top:60px;width:460px;background:#ffffffee;color:var(--ink);border-radius:34px;padding:22px 24px;display:flex;gap:16px}
#root .note .av{flex:none;width:58px;height:58px;border-radius:14px;background:var(--cobalt);color:#fff;font-size:22px;font-weight:800;display:flex;align-items:center;justify-content:center}
#root .note b{display:block;font-size:30px;letter-spacing:.03em}
#root .note p{margin:4px 0 0;font-size:36px;line-height:1.25;font-weight:600}
"""
    lock = """<div class="lock"><div class="date">Tuesday, 11 November</div>
      <div class="time"><span id="remind-time">6:00</span></div>
      <div id="remind-note" class="note"><div class="av">YS</div><div><b>YOUR STORE</b><p>Only a few hours left of our 11.11 sale!</p></div></div></div>"""
    html = f"""<div class="bg cobalt"></div>
  <div class="stage on-cobalt">
    <div class="copy"><h2 id="remind-head">Remind them <em>on the day.</em></h2></div>
    <div class="vis-wrap"><div class="vis">{phone('remind', '', label=True, extra_screen=lock, bare=True)}</div></div>
  </div>"""
    js = """
tl.fromTo("#remind-head",{opacity:0,y:40},{opacity:1,y:0,duration:.4,ease:"power3.out"},0);
tl.fromTo("#remind-phone",{y:100,opacity:0},{y:0,opacity:1,duration:.5,ease:"power3.out"},0.05);
tl.fromTo("#remind-note",{opacity:0,y:-60,scale:.9},{opacity:1,y:0,scale:1,duration:.45,ease:"back.out(1.6)"},0.75);
tl.fromTo("#remind-phone",{rotation:0},{rotation:1.5,duration:2.4,ease:"sine.inOut"},0.9);
"""
    return css, html, js


def scene_orders(f):
    css = """
#root .ok{display:inline-flex;align-items:center;gap:10px;font-size:26px;font-weight:800;color:#0f7a43;background:#dff6e9;padding:8px 18px;border-radius:999px;align-self:center}
"""
    thread = """<div class="stamp">Today 2:14 PM</div>
      <div id="orders-b1" class="bubble">Order #1111 confirmed. Thank you for shopping with us!</div>
      <div class="stamp" id="orders-s2">Today 4:30 PM</div>
      <div id="orders-b2" class="bubble">Your order is out for delivery today.</div>"""
    html = f"""<div class="bg sky"></div>
  <div class="stage on-sky">
    <div class="copy"><h2 id="orders-head">Confirm orders and <em>deliveries.</em></h2></div>
    <div class="vis-wrap"><div class="vis">{phone('orders', thread)}</div></div>
  </div>"""
    js = """
tl.fromTo("#orders-head",{opacity:0,y:40},{opacity:1,y:0,duration:.4,ease:"power3.out"},0);
tl.fromTo("#orders-phone",{y:100,opacity:0},{y:0,opacity:1,duration:.5,ease:"power3.out"},0.05);
tl.fromTo("#orders-b1",{opacity:0,scale:.6,transformOrigin:"0% 100%"},{opacity:1,scale:1,duration:.4,ease:"back.out(1.7)"},0.55);
tl.fromTo("#orders-s2",{opacity:0},{opacity:1,duration:.2},1.4);
tl.fromTo("#orders-b2",{opacity:0,scale:.6,transformOrigin:"0% 100%"},{opacity:1,scale:1,duration:.4,ease:"back.out(1.7)"},1.45);
"""
    return css, html, js


def scene_endcard(f):
    css = f"""
#root .end{{position:absolute;inset:0;padding:{f['pad']};display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:44px}}
#root .end h2{{color:#fff;font-size:{f['head']*1.05:.0f}px}}
#root .cta{{display:inline-flex;align-items:center;gap:18px;background:#fff;color:var(--cobalt);font-size:44px;font-weight:800;padding:26px 46px;border-radius:22px;box-shadow:0 18px 40px #0b1a5a55}}
#root .cta i{{font-style:normal;color:var(--cobalt);font-size:46px}}
#root .url{{color:#dbe5ff;font-size:38px;font-weight:700;letter-spacing:.01em}}
"""
    html = f"""<div class="bg cobalt"></div>
  <div class="end">
    <div id="endcard-logo">{logo('#fff', 92)}</div>
    <h2 id="endcard-head">Make 11.11 your <em>busiest sale.</em></h2>
    <div id="endcard-cta" class="cta">Get Started <i>→</i></div>
    <div id="endcard-url" class="url">smsbuddy.lk</div>
  </div>"""
    js = """
tl.fromTo("#endcard-logo",{opacity:0,y:-30},{opacity:1,y:0,duration:.4,ease:"power3.out"},0);
tl.fromTo("#endcard-head",{opacity:0,y:40},{opacity:1,y:0,duration:.45,ease:"power3.out"},0.2);
tl.fromTo("#endcard-cta",{opacity:0,scale:.7},{opacity:1,scale:1,duration:.4,ease:"back.out(2)"},0.6);
tl.fromTo("#endcard-url",{opacity:0},{opacity:1,duration:.3},0.85);
tl.to("#endcard-cta",{scale:1.04,duration:.5,ease:"sine.inOut",yoyo:true,repeat:1},1.4);
"""
    return css, html, js


BUILDERS = {"hook": scene_hook, "announce": scene_announce, "reach": scene_reach, "language": scene_language,
            "remind": scene_remind, "orders": scene_orders, "endcard": scene_endcard}


def scene_file(sid, dur, f):
    css, html, js = BUILDERS[sid](f)
    return f"""<template>
  <style>{base_css(f)}{css}</style>
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


def index_file(name, f):
    hosts, t = [], 0.0
    for i, (sid, dur, _) in enumerate(SCENES):
        hosts.append(f'      <div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" '
                     f'data-start="{t:.2f}" data-duration="{dur}" data-track-index="1" data-track-kind="graphics" '
                     f'data-width="{f["w"]}" data-height="{f["h"]}"></div>')
        t += dur
    total = round(t, 2)
    hosts.append(f'      <audio id="jingle" class="clip" src="assets/audio/sms-buddy-jingle.wav" data-start="0" data-duration="{total}" '
                 f'data-track-index="2" data-volume="1" data-fade-out="0.9"></audio>')
    for i, (aid, file, start, vol) in enumerate(SFX):
        hosts.append(f'      <audio id="{aid}" class="clip" src="assets/sfx/{file}" data-start="{start}" data-duration="{SFX_LEN[file]}" '
                     f'data-track-index="{3 + i % 2}" data-volume="{vol}"></audio>')
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width={f['w']}, height={f['h']}" />
    <title>SMS Buddy 11.11 ad ({name})</title>
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
        proj = BASE / f"smsbuddy-1111-{name}"
        if not proj.exists():
            shutil.copytree(template, proj, ignore=shutil.ignore_patterns("compositions", "assets", "snapshots", "*.mp4"))
            meta = json.loads((proj / "meta.json").read_text())
            meta.update(id=proj.name, name=proj.name)
            (proj / "meta.json").write_text(json.dumps(meta, indent=2))
            pkg = json.loads((proj / "package.json").read_text())
            pkg["name"] = proj.name
            (proj / "package.json").write_text(json.dumps(pkg, indent=2))
        (proj / "compositions").mkdir(exist_ok=True)
        fonts = proj / "assets" / "fonts"
        fonts.mkdir(parents=True, exist_ok=True)
        for font in FONTS.iterdir():
            shutil.copy(font, fonts / font.name)
        (proj / "assets" / "audio").mkdir(exist_ok=True)
        shutil.copy(JINGLE, proj / "assets" / "audio" / JINGLE.name)
        (proj / "assets" / "sfx").mkdir(exist_ok=True)
        for _, file, _, _ in SFX:
            shutil.copy(SFX_DIR / file, proj / "assets" / "sfx" / file)
        for sid, dur, _ in SCENES:
            (proj / "compositions" / f"{sid}.html").write_text(scene_file(sid, dur, f))
        (proj / "index.html").write_text(index_file(name, f))
        print("built", proj.name)


if __name__ == "__main__":
    build()
