import puppeteer from 'puppeteer-core';
const out=process.argv[2];
const MSG="Hi {firstName}! Our 12.12 sale starts tomorrow: up to 30% off everything at YOUR STORE. Reply STOP to opt out.";
const b=await puppeteer.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true,args:['--no-sandbox']});
const p=await b.newPage(); await p.setViewport({width:480,height:3000,deviceScaleFactor:3});
await p.goto('http://localhost:3013/createNewCampaign.html',{waitUntil:'networkidle0'});
await p.addStyleTag({content:'header,#sidebar,.sidebar{visibility:hidden!important} *{transition:none!important;animation:none!important}'});
// union screenshot of elements matched by a function returning nodes
async function shot(name, fn, pad=14){
  const r=await p.evaluate((src,pad)=>{const els=(new Function('return ('+src+')()'))();const rs=els.map(e=>e.getBoundingClientRect());
    const x=Math.min(...rs.map(r=>r.left))-pad,y=Math.min(...rs.map(r=>r.top))-pad,x2=Math.max(...rs.map(r=>r.right))+pad,y2=Math.max(...rs.map(r=>r.bottom))+Math.min(pad,6);return {x:x+scrollX,y:y+scrollY,width:x2-x,height:y2-y};},fn.toString(),pad);
  await p.screenshot({path:`${out}/${name}.png`,clip:r,captureBeyondViewport:true}); console.log(name,Math.round(r.width),Math.round(r.height));
  return r;
}
const grp=(sel)=>`()=>[...document.querySelectorAll('${sel}')]`;
const group=(label)=>[...document.querySelectorAll('#content label')].find(l=>l.textContent.trim().startsWith(label)).parentElement;
await p.evaluate(`window.group=${group.toString()}`);
async function progress(i){ await shot('progress'+i, ()=>[document.getElementById('step1-indicator').closest('.card')], 0); }
const next=()=>p.click('#next_button');
// STEP 1
await p.evaluate(()=>{const n=document.querySelector('[name=campaign_name]')||group('Campaign Name').querySelector('input'); n.value=''; n.setAttribute('placeholder',''); document.querySelector('[name=channel]').value='sms';});
await progress(1);
await shot('name_empty', ()=>[group('Campaign Name'),group('Channel')]);
await p.evaluate(()=>{(document.querySelector('[name=campaign_name]')||group('Campaign Name').querySelector('input')).value='12.12 Mega Sale';});
await shot('name_filled', ()=>[group('Campaign Name'),group('Channel')]);
await p.evaluate(()=>{document.querySelector('[name=description]').value='Sale announcement to all customers';}); await next();
// STEP 2
await p.evaluate(()=>{const s=document.querySelector('[name=audience_type]'); const o=[...s.options].find(o=>/all/i.test(o.text)); s.value=o.value; s.dispatchEvent(new Event('change',{bubbles:true})); document.getElementById('segments_container').classList.add('hidden'); document.getElementById('audience_count').textContent='1,240'; document.querySelector('[name=exclude_bounced]').checked=false;});
await progress(2);
await shot('audience', ()=>[group('Select Audience'),group('Estimated Audience Size'),group('Exclude Recipients')]);
await next();
// STEP 3
await p.evaluate(()=>{const t=document.querySelector('[name=sms_content]'); t.value=''; t.setAttribute('placeholder',''); document.getElementById('sms_character_count').textContent='0/160 characters'; const pv=document.getElementById('message_preview'); if(pv) pv.textContent='';});
await progress(3);
await shot('message_empty', ()=>[group('SMS Message')]);
await p.evaluate((m)=>{const t=document.querySelector('[name=sms_content]'); t.value=m; document.getElementById('sms_character_count').textContent=m.length+'/160 characters'; const pv=document.getElementById('message_preview'); if(pv) pv.textContent=m;},MSG);
await shot('message_filled', ()=>[group('SMS Message')]);
await shot('message_preview', ()=>[group('Preview')]);
await next();
// STEP 4
await p.evaluate(()=>{document.querySelector('[name=delivery_option][value=send_now]').checked=true; document.getElementById('schedule_datetime_container').classList.add('hidden');});
await progress(4);
await shot('schedule_now', ()=>[group('Delivery Options')]);
await p.evaluate(()=>{document.querySelector('[name=delivery_option][value=schedule]').checked=true; const c=document.getElementById('schedule_datetime_container'); c.classList.remove('hidden'); const [d,t]=c.querySelectorAll('input'); d.value='2026-12-12'; t.value='09:00';});
await shot('schedule_later', ()=>[group('Delivery Options'),document.getElementById('schedule_datetime_container')]);
await p.evaluate(()=>{const r=document.querySelector('[name=is_recurring]'); if(r) r.checked=false;});
await next();
// STEP 5
await p.evaluate((m)=>{const set=(id,v)=>{const e=document.getElementById(id); if(e) e.textContent=v;};
 set('review_campaign_name','12.12 Mega Sale'); set('review_channel','SMS'); set('review_description','Sale announcement to all customers'); set('review_audience_type','All Contacts'); set('review_recipient_count','1,240'); set('review_message',m); set('review_delivery','Scheduled'); set('review_schedule','2026-12-12 at 09:00');
 document.getElementById('review_timezone').closest('.flex.justify-between').style.display='none'; document.getElementById('review_recurring_container').style.display='none';
 document.getElementById('next_button').style.display='none'; document.getElementById('submit_button').style.display=''; document.getElementById('prev_button').style.display='none';},MSG);
await progress(5);
await shot('review_summary', ()=>[...document.querySelectorAll('#step5 .card')]);
await shot('launch_unchecked', ()=>[document.querySelector('[name=terms_accepted]').closest('.mb-4'), document.getElementById('submit_button').parentElement]);
await p.evaluate(()=>{document.querySelector('[name=terms_accepted]').checked=true;});
await shot('launch_checked', ()=>[document.querySelector('[name=terms_accepted]').closest('.mb-4'), document.getElementById('submit_button').parentElement]);
// button boxes for cursor targeting
const boxes=await p.evaluate(()=>{const o={}; for(const [k,el] of Object.entries({launch:document.getElementById('submit_button'),terms:document.querySelector('[name=terms_accepted]')})){const r=el.getBoundingClientRect(); o[k]=[r.left,r.top,r.width,r.height];} return o;});
console.log(JSON.stringify(boxes)); console.log('msglen',MSG.length);
await b.close();
