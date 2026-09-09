"""Rebuild the three editable, deterministic SMS Buddy HyperFrames compositions."""
from pathlib import Path
import re
import shutil
import math
import wave
from array import array

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / "videos"
MARK = re.search(r'"(M10.*?)";', (ROOT / "src/lib/brand.ts").read_text()).group(1)
source = (ROOT / "src/components/home/PhoneFrame.tsx").read_text()
FRAME = source[source.index("<svg"):source.rindex("</svg>") + 6]
FRAME = re.sub(r'\{`\$\{id\}-(\w+)`\}', r'"phone-\1"', FRAME)
FRAME = re.sub(r'\{`url\(#\$\{id\}-(\w+)\)`\}', r'"url(#phone-\1)"', FRAME)
for before, after in {"className": "class", "fillRule": "fill-rule", "strokeWidth": "stroke-width", "strokeLinecap": "stroke-linecap", "strokeOpacity": "stroke-opacity"}.items():
    FRAME = FRAME.replace(before, after)

def logo():
    return f'<div class="brand"><svg viewBox="0 0 72 88" aria-hidden="true"><path d="{MARK}" fill="currentColor" fill-rule="evenodd"/></svg><span>SMS Buddy</span></div>'

def soundtrack():
    """Original quiet synth bed and message chime; no sampled or licensed music."""
    sr, duration = 48000, 15
    chords = [(130.813,164.814,195.998), (110,130.813,164.814), (87.307,130.813,174.614), (97.999,146.832,195.998)]
    melody = [523.25,659.25,783.99,659.25,440,523.25,659.25,523.25,349.23,523.25,698.46,523.25,392,587.33,783.99,587.33]
    samples = array('h')
    for i in range(sr * duration):
        t = i/sr
        phrase = min(3, int(t/4))
        local = t - phrase*4
        env = min(1, local/.15) * min(1, max(0, (4-local)/.4))
        pad = sum(math.sin(2*math.pi*f*t) + .15*math.sin(4*math.pi*f*t) for f in chords[phrase])*.028*env
        n = min(15, int(t))
        dt = t-int(t)
        pluck = math.sin(2*math.pi*melody[n]*dt) * math.exp(-dt*7) * min(1,dt/.015) * .1
        beat = t % .5
        bass = math.sin(2*math.pi*(55*beat + 3*(1-math.exp(-beat*16)))) * math.exp(-beat*20) * .045
        chime = 0
        for start, freq in [(5.35,880),(5.53,1174.66),(10.55,659.25)]:
            d=t-start
            if 0 <= d < 1:
                chime += math.sin(2*math.pi*freq*d)*math.exp(-d*7)*min(1,d/.01)*.11
        fade = min(1,t/.15,max(0,(15-t)/.65))
        v = int(max(-.9,min(.9,(pad+pluck+bass+chime)*fade))*32767)
        samples.extend([v,v])
    with wave.open(str(BASE/'assets'/'soundtrack.wav'),'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(samples.tobytes())

CSS = """
@font-face{font-family:Manrope;src:url(manrope.woff2);font-weight:200 800;font-display:block}
@font-face{font-family:Ubuntu;src:url(ubuntu-bold.ttf);font-weight:700;font-display:block}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:var(--w);height:var(--h);overflow:hidden;background:#edf3ff;font-family:Manrope,sans-serif;color:#12234b}
#film{position:relative;width:var(--w);height:var(--h);overflow:hidden}
.scene{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;background:#edf3ff}
#scene1{z-index:1}#scene2{z-index:2;opacity:0}#scene3{z-index:3;opacity:0;background:#244ceb;color:#fff}
.scene-content{width:100%;height:100%;padding:76px 100px;display:flex;flex-direction:column;gap:42px;box-sizing:border-box}
.brand{display:flex;align-items:center;gap:18px;font-family:Ubuntu,sans-serif;font-size:48px;font-weight:700;line-height:1.1;height:68px;flex-shrink:0}
.brand svg{width:53px;height:65px;color:#244ceb;flex-shrink:0}
.story-layout{display:grid;grid-template-columns: .95fr 1.05fr;gap:70px;align-items:center;flex:1;min-height:0}
.copy{display:flex;flex-direction:column;gap:32px;min-width:0}
h1,h2{font-size:118px;font-weight:800;letter-spacing:-.04em;line-height:1.06;max-width:740px}
.support{font-size:36px;line-height:1.5;font-weight:400;max-width:680px}
.intro-tag{font-size:28px;line-height:1.45;font-weight:600;color:#244ceb}
.photo-wrap{height:100%;width:100%;min-height:0;overflow:hidden;border-radius:28px}
.business-photo{width:100%;height:100%;object-fit:cover;object-position:62% center;display:block}
.demo-layout{display:grid;grid-template-columns:1fr 390px;gap:120px;align-items:center;flex:1;min-height:0;padding-right:110px}
.demo-layout h2{max-width:680px;font-size:124px}
.categories{display:flex;flex-wrap:wrap;gap:15px;font-size:28px;line-height:1.4;color:#244ceb}
.categories span{padding:10px 18px;border:1px solid #c6d6f5;border-radius:10px}
.phone{position:relative;width:390px;aspect-ratio:320/660;filter:drop-shadow(12px 24px 22px #12234b25);flex-shrink:0}
.sb-phone-frame{position:absolute;inset:0;width:100%;height:100%;z-index:2}
.screen{position:absolute;inset:2.1% 5.9%;border-radius:13.8%/6.2%;overflow:hidden;background:#fff;color:#17191e;display:flex;flex-direction:column}
.status{display:flex;justify-content:space-between;align-items:center;height:10%;padding:0 7%;font-size:16px;font-weight:800;flex-shrink:0}
.status svg{width:44px;height:15px}
.sender{background:#f6f6f8;display:flex;flex-direction:column;align-items:center;gap:9px;padding:10px 14px 20px;flex-shrink:0}
.avatar{width:48px;height:48px;border-radius:50%;background:#9a9ea7;display:grid;place-items:center;color:#fff}
.avatar svg{width:30px;height:30px}
.sender strong{font-size:18px;letter-spacing:.02em}.sender small{font-size:15px;color:#636671}
.conversation{padding:25px 18px;flex:1}.time{text-align:center;font-size:14px;color:#454954;margin-bottom:24px}
.message{background:#e9e9ed;border-radius:22px 22px 22px 5px;font-size:25px;line-height:1.5;padding:21px;color:#1c1c20}
.example{font-size:15px;text-align:right;color:#646874;margin-top:13px}
.input-bar{margin:0 18px 37px;padding:10px 16px;border:1px solid #d9d9df;border-radius:20px;font-size:16px;color:#454954}
.end-content{justify-content:center;align-items:flex-start;gap:34px;position:relative;z-index:2;padding-right:520px}
.end-content .brand svg{color:#fff}.end-content .brand{margin-bottom:22px}
.end-content h2{font-size:112px;max-width:1100px}.end-content .support{color:#edf3ff}
.cta{display:inline-flex;align-items:center;justify-content:space-between;gap:75px;border-radius:14px;background:#fff;color:#244ceb;font-size:46px;font-weight:700;padding:27px 36px;width:max-content;line-height:1.1;margin-top:10px}
.cta svg{width:45px;height:45px}.create{font-size:32px;line-height:1.3;color:#edf3ff}.site{font-size:29px;line-height:1.3;font-weight:500;color:#fff}
.end-symbol{position:absolute;right:-50px;top:150px;width:650px;height:800px;color:#4a6bf1;transform:rotate(10deg);z-index:1}
.format-reels .scene-content{padding:270px 80px 330px;gap:46px}
.format-reels .brand{font-size:48px;height:64px}
.format-reels .story-layout{display:flex;flex-direction:column;gap:44px;align-items:stretch;justify-content:flex-start}
.format-reels .copy{gap:24px}.format-reels h1{font-size:118px;max-width:900px;line-height:1.04}
.format-reels .support{font-size:38px;max-width:880px}.format-reels .intro-tag{font-size:29px}
.format-reels .photo-wrap{height:500px;flex:0 0 500px}.format-reels .business-photo{object-position:center 58%}
.format-reels .demo-layout{display:flex;flex-direction:column;gap:20px;padding:0;align-items:flex-start}
.format-reels .demo-layout h2{font-size:98px;max-width:700px;line-height:1.07}
.format-reels .categories{font-size:27px;gap:12px}.format-reels .categories span{padding:6px 12px}
.format-reels .phone{width:410px;align-self:center}
.format-reels .end-content{justify-content:flex-start;padding-top:285px;gap:32px}
.format-reels .end-content .brand{margin-bottom:25px}.format-reels .end-content h2{font-size:94px;max-width:850px;line-height:1.1}
.format-reels .cta{font-size:47px;margin-top:18px;padding:30px 38px;gap:80px}
.format-reels .create{font-size:37px}.format-reels .site{font-size:30px}
.format-reels .end-symbol{width:700px;height:850px;top:1150px;right:-180px}
.format-feed .scene-content{padding:70px 75px;gap:35px}
.format-feed .brand{font-size:42px;height:58px}.format-feed .brand svg{width:45px;height:56px}
.format-feed .story-layout{display:flex;flex-direction:column;gap:32px;align-items:stretch;justify-content:flex-start}
.format-feed .copy{gap:20px}.format-feed h1{font-size:100px;max-width:850px;line-height:1.04}
.format-feed .support{font-size:33px;max-width:850px}.format-feed .intro-tag{font-size:26px}
.format-feed .photo-wrap{height:510px;flex:0 0 510px}.format-feed .business-photo{object-position:center 58%}
.format-feed .demo-layout{display:flex;flex-direction:column;gap:30px;padding:0;align-items:flex-start}
.format-feed .demo-layout .copy{gap:22px}.format-feed .demo-layout h2{font-size:85px;max-width:650px;line-height:1.08}
.format-feed .categories{font-size:25px;gap:12px}.format-feed .categories span{padding:6px 12px}
.format-feed .phone{width:360px;align-self:center}
.format-feed .end-content{justify-content:center;gap:30px;padding-right:85px}
.format-feed .end-content h2{font-size:92px;max-width:850px;line-height:1.09}
.format-feed .end-content .brand{margin-bottom:30px}.format-feed .cta{font-size:45px}
.format-feed .create{font-size:34px}.format-feed .site{font-size:29px}
.format-feed .end-symbol{width:440px;height:540px;top:790px;right:-100px}
"""

JS = """
window.__timelines=window.__timelines||{};
const tl=gsap.timeline({paused:true});
tl.from('#scene1 .brand',{opacity:0,scale:.94,duration:.45,ease:'back.out(1.2)'},.12);
tl.from('#scene1 h1',{opacity:0,y:55,duration:.65,ease:'power4.out'},.18);
tl.from('#scene1 .support',{opacity:0,x:-30,duration:.48,ease:'sine.out'},.36);
tl.from('#scene1 .intro-tag',{opacity:0,y:20,duration:.4,ease:'power2.out'},.49);
tl.from('#scene1 .photo-wrap',{opacity:0,scale:.96,duration:.8,ease:'expo.out'},.24);
tl.fromTo('#scene1 .business-photo',{scale:1.05},{scale:1,duration:3.9,ease:'sine.inOut'},.15);
// The scene crossfade is the exit; content stays present until transition time.
tl.to('#scene1',{opacity:0,duration:.55,ease:'power2.inOut'},3.8);
tl.to('#scene2',{opacity:1,duration:.55,ease:'power2.inOut'},3.8);
tl.from('#scene2 .brand',{opacity:0,x:-20,duration:.4,ease:'power2.out'},4.35);
tl.from('#scene2 h2',{opacity:0,y:45,duration:.6,ease:'power4.out'},4.35);
tl.from('#scene2 .categories',{opacity:0,x:-25,duration:.45,ease:'sine.out'},4.48);
tl.from('#scene2 .phone',{opacity:0,y:50,rotation:3,duration:.75,ease:'expo.out'},4.42);
tl.from('#scene2 .message',{opacity:0,scale:.9,y:25,transformOrigin:'left bottom',duration:.5,ease:'back.out(1.3)'},5.35);
tl.from('#scene2 .example',{opacity:0,duration:.4,ease:'sine.out'},5.65);
tl.to('#scene2',{opacity:0,duration:.55,ease:'power2.inOut'},9.7);
tl.to('#scene3',{opacity:1,duration:.55,ease:'power2.inOut'},9.7);
tl.from('#scene3 .brand',{opacity:0,scale:.94,duration:.5,ease:'back.out(1.2)'},10.25);
tl.from('#scene3 h2',{opacity:0,y:42,duration:.65,ease:'power4.out'},10.25);
tl.from('#scene3 .cta',{opacity:0,x:-35,duration:.55,ease:'expo.out'},10.3);
tl.from('#scene3 .create',{opacity:0,y:20,duration:.45,ease:'sine.out'},10.47);
tl.from('#scene3 .site',{opacity:0,duration:.5,ease:'power2.out'},10.6);
tl.from('#scene3 .end-symbol',{opacity:0,rotation:3,scale:.93,duration:1.2,ease:'sine.out'},9.9);
window.__timelines['smsbuddy-film']=tl;
"""

def make(fmt, width, height):
    project = BASE / f'smsbuddy-{fmt}'
    for src, name in [(BASE/'assets'/'boutique-scene.png','boutique.png'),(BASE/'assets'/'soundtrack.wav','soundtrack.wav'),(ROOT/'src/lib/font-files/manrope.woff2','manrope.woff2'),(ROOT/'src/lib/font-files/ubuntu-bold.ttf','ubuntu-bold.ttf'),(Path('/tmp/smsbuddy-gsap.min.js'),'gsap.min.js')]:
        shutil.copyfile(src,project/name)
    phone=f'''<div class="phone">{FRAME}<div class="screen"><div class="status"><span>9:41</span><svg viewBox="0 0 40 14" fill="currentColor"><path d="M0 10h3v3H0zm5-3h3v6H5zm5-3h3v9h-3zm5-3h3v12h-3z"/><rect x="24" y="3" width="12" height="8" rx="1"/></svg></div><div class="sender"><span class="avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16v13H9l-5 4Z"/><path d="M8 8h8M8 12h5"/></svg></span><strong>YOUR STORE</strong><small>Text message · SMS</small></div><div class="conversation"><div class="time">Today, 9:41 AM</div><div class="message">New arrivals are here. Visit us this weekend.</div><div class="example">Example message</div></div><div class="input-bar">Text message</div></div></div>'''
    html=f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>SMS Buddy — {fmt} film</title><script src="gsap.min.js"></script><style>:root{{--w:{width}px;--h:{height}px}}{CSS}</style></head><body class="format-{fmt}"><div id="film" data-composition-id="smsbuddy-film" data-start="0" data-duration="15" data-width="{width}" data-height="{height}">
<div id="scene1" class="scene" data-layout-allow-occlusion data-layout-allow-overlap><div class="scene-content">{logo()}<div class="story-layout"><div class="copy"><h1>Bring customers back.</h1><p class="support">Business SMS for Sri Lanka.</p><p class="intro-tag">Small messages. Stronger connections.</p></div><div class="photo-wrap" data-layout-allow-overflow><img class="business-photo" src="boutique.png" alt="Illustrative small business packaging a purchase"></div></div></div></div>
<div id="scene2" class="scene" data-layout-allow-occlusion data-layout-allow-overlap><div class="scene-content">{logo()}<div class="demo-layout"><div class="copy"><h2>Your brand. Their inbox.</h2><div class="categories"><span>Promotions</span><span>Order updates</span><span>OTPs</span></div></div>{phone}</div></div></div>
<div id="scene3" class="scene"><svg class="end-symbol" viewBox="0 0 72 88" aria-hidden="true" data-layout-ignore><path d="{MARK}" fill="currentColor" fill-rule="evenodd"/></svg><div class="scene-content end-content">{logo()}<h2>Your customers are a message away.</h2><div class="cta">Get Started<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></div><p class="create">Create your account</p><p class="site">smsbuddy.lk</p></div></div>
<audio id="soundtrack" src="soundtrack.wav" data-start="0" data-duration="15" data-track-index="1" data-volume="1"></audio></div><script>{JS}</script></body></html>'''
    (project/'index.html').write_text(html)
    (project/'DESIGN.md').write_text((ROOT/'DESIGN.md').read_text()+'\n\nVideo application: the owner explicitly requested generated imagery. The staged boutique photograph supplies illustrative business context, not customer evidence. Brand palette and Ubuntu logo are preserved. Three scene, 15-second motion composition with separate landscape, Reels and Feed layouts.\n')

if __name__=='__main__':
    soundtrack()
    for args in [('website',1920,1080),('reels',1080,1920),('feed',1080,1350)]:
        make(*args)
