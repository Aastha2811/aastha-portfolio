/* ---------- copy buttons ---------- */
(function(){
  document.querySelectorAll('.copy-btn').forEach(function(b){
    b.addEventListener('click',function(){
      var t=b.dataset.copy;
      var reset=function(){setTimeout(function(){b.textContent='Copy'},1600)};
      var fallback=function(){
        var el=b.parentElement.querySelector('a,.val'); var r=document.createRange(); r.selectNodeContents(el);
        var s=window.getSelection(); s.removeAllRanges(); s.addRange(r); b.textContent='Selected'; reset();
      };
      try{ navigator.clipboard.writeText(t).then(function(){b.textContent='Copied';reset();},fallback); }catch(e){ fallback(); }
    });
  });
})();

/* ---------- fit check ---------- */
(function(){
  var ROOT=document.body.getAttribute("data-root")||"";
  var SAMPLES={
    growth:"Product Manager, Growth & Retention (Consumer App)\n\nYou'll own retention and lifecycle journeys for our consumer app, from first purchase to repeat. Run A/B experiments to improve activation, engagement and conversion, and partner with design, engineering and marketing to ship.\n\nWhat we're looking for:\n- 3+ years of product management experience\n- Strong analytics: SQL, Mixpanel or Amplitude, cohort and funnel analysis\n- Experience with personalisation or AI-driven features\n- Comfortable with user research and turning insights into roadmap bets\n- Excellent stakeholder communication\n- D2C or e-commerce background is a plus",
    ai:"Product Manager, AI\n\nBuild AI-powered recommendation and personalisation features used by millions of shoppers. Write PRDs, partner with ML engineers, and evaluate build vs buy for third-party models and computer vision APIs. Measure impact through experimentation and own the roadmap.\n\nRequirements:\n- 4+ years of product experience\n- Hands-on with LLMs, recommendation systems or computer vision\n- Data-driven: comfortable with SQL and dashboards\n- Experience with pricing and monetisation is a plus",
    travel:"Senior Product Manager, B2B Travel Platform\n\nOwn the roadmap for our booking platform serving thousands of travel agents. Drive supplier API integrations across hotels and flights, payments and checkout, and partner success. Lead customer discovery and manage stakeholders across sales and operations.\n\nRequirements:\n- 5+ years of experience in product or travel tech\n- Strong customer interviews and discovery practice\n- Experience with payments and third-party APIs\n- MBA preferred\n- Based in Bengaluru"
  };

  var C=[
    {n:"Retention & lifecycle",k:["retention","churn","lifecycle","repeat","re-?engagement","reactivation","ltv","lifetime value","loyalty","cohorts?"],e:[["Repeat-purchase journey: completers bought again at 2×+ the rate of other buyers (23% vs 10%).","work/repeat-customers/"],["AI skin scan journey: users returning to their report went from 27% to 62%.","work/ai-skin-scan-journey/"]]},
    {n:"Engagement & habit",k:["engagement","habit","stickiness","dau","mau","gamifi\\w*","streaks?","activation","onboarding"],e:[["AI skin scan journey: turned a one-time scan into a 30-day rescan journey.","work/ai-skin-scan-journey/"],["Pre-launch page: hotspot explorers were 1.6× more likely to pre-order.","work/pre-order-launch-page/"]]},
    {n:"Conversion & experimentation",k:["conversion","funnels?","growth","a\\/b","ab tests?","experiment\\w*","optimi[sz]\\w*","cro"],e:[["Live UV widget: two rounds, five variants, +29.7% PDP conversion for the shipped version.","work/uv-index-widget/"],["15+ A/B experiments across AI recommendations, PDPs, landing pages and lifecycle journeys."]]},
    {n:"AI & personalisation",k:["ai","a\\.i\\.","ml","machine learning","llms?","genai","generative","personali[sz]\\w*","recommend\\w*","computer vision","agentic"],e:[["AI sunscreen recommender: face scan that tripled scan participation.","work/ai-sunscreen-recommender/"],["AI itinerary engine at TravClan cut manual effort by 80%; built Recruit-AI on Llama 3 and n8n."]]},
    {n:"Data & analytics",k:["sql","analytics","data-driven","data driven","mixpanel","amplitude","bigquery","metrics","kpis?","dashboards?","insights?"],e:[["Sized the retention leak in BigQuery and Mixpanel before building anything.","work/repeat-customers/"],["Built a scan cost dashboard with 5 Mixpanel alerts; set up Amplitude tracking at TravClan.","work/ai-sunscreen-recommender/"]]},
    {n:"User research & discovery",k:["user research","research","discovery","customer interviews?","interviews","user insights","jtbd","jobs to be done","usability"],e:[["~20 user calls and 30 in-person conversations to find why buyers didn't return.","work/repeat-customers/"],["150+ customer interviews to prioritise the TravClan roadmap."]]},
    {n:"Consumer, D2C & e-commerce",k:["consumer","b2c","d2c","e-?commerce","shoppers?","mobile app","beauty","skincare","retail"],e:[["Owns retention and engagement for Foxtale's consumer skincare app since Dec 2025."]]},
    {n:"B2B platforms",k:["b2b","saas","platform","enterprise","travel agents?","agencies","partner success","partnerships?"],e:[["Owned the roadmap for TravClan's B2B travel platform serving 500+ agencies."]]},
    {n:"Travel tech",k:["travel","hospitality","booking","ota","hotels?","flights?","itinerar\\w*","tourism"],e:[["4.5 years at TravClan: AI itinerary engine, real-time hotel, transfer and activity APIs (+25% cross-sell)."]]},
    {n:"Payments & checkout",k:["payments?","fintech","checkout","gateway","upi","reconciliation"],e:[["Integrated the NIMBBL payment gateway: 18% fewer payment failures."]]},
    {n:"APIs & technical depth",k:["apis?","integrations?","technical","third-party","build vs buy","build-vs-buy","vendors?"],e:[["Shipped 3+ real-time supplier API integrations at TravClan."],["Ran a build-vs-buy call on the AI scan vendor: shadow mode, A/B test, IP ownership.","work/ai-skin-scan-journey/"]]},
    {n:"Launches & GTM",k:["launch\\w*","go-to-market","gtm","rollouts?","campaigns?"],e:[["Pre-launch page: concept to live pre-order page in about 12 days.","work/pre-order-launch-page/"]]},
    {n:"Stakeholder management",k:["stakeholders?","cross-functional","cross functional","collaborat\\w*","influenc\\w*","alignment","communication"],e:[["Aligned leadership and brand on a launch page direction within a day.","work/pre-order-launch-page/"],["Works daily with Engineering, Design, Marketing and CX."]]},
    {n:"Roadmap & strategy",k:["roadmaps?","strategy","prioriti[sz]\\w*","product vision","okrs?"],e:[["Owns the retention, engagement and AI personalisation roadmap at Foxtale."]]},
    {n:"Specs & execution",k:["prds?","requirements docs?","specs?","user stories","agile","scrum","jira","sprints?","execution","ship"],e:[["Writes PRDs and copy specs (9 surfaces for one launch page); ships with JIRA and Figma.","work/pre-order-launch-page/"]]},
    {n:"Automation & no-code",k:["automation","automate","n8n","zapier","make\\.com","workflows?","no-code","low-code"],e:[["AI post-booking workflow with Make.com cut turnaround from 72+ hours to 24–48."]]},
    {n:"Design & UX",k:["ux","figma","wireframes?","prototyp\\w*","user experience","design"],e:[["Shares working, clickable mockups so stakeholders react to the real interaction.","work/pre-order-launch-page/"]]},
    {n:"Mentoring",k:["mentor\\w*","coach\\w*","team lead"],e:[["Leads a teammate who owns the next round of AI skin scan fixes.","work/ai-skin-scan-journey/"]],w:.6}
  ];
  var GAPS=[
    {n:"Pricing & monetisation",k:["pricing","monetis\\w*","monetiz\\w*","subscriptions?","paywall"]},
    {n:"Ads & ad tech",k:["adtech","ad tech","advertising","programmatic"]},
    {n:"Lending, banking & insurance",k:["lending","loans?","credit","banking","insurance","nbfc"]},
    {n:"Hardware & IoT",k:["hardware","iot","firmware"]},
    {n:"Infrastructure & developer platforms",k:["infrastructure","devops","kubernetes","developer platform","sdks?"]},
    {n:"Managing a team of PMs",k:["manage a team of","managing pms","people management","direct reports","head of product","group product manager"]}
  ];
  var CITIES=["bengaluru","bangalore","delhi","new delhi","gurgaon","gurugram","noida","hyderabad","pune","chennai","kolkata","ahmedabad"];

  function rx(words){return new RegExp("(^|[^a-z0-9])("+words.join("|")+")(?=$|[^a-z0-9])","gi")}
  function found(text,words){var m,out={},r=rx(words);while((m=r.exec(text))){out[m[2].toLowerCase()]=1}return Object.keys(out)}
  function yrs(from){var n=new Date();return Math.round(((n-from)/(365.25*864e5))*10)/10}
  function esc(t){return t.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

  var jd=document.getElementById("jd"),res=document.getElementById("fit-res"),run=document.getElementById("fit-run");
  var chips=[].slice.call(document.querySelectorAll(".samples .chip"));

  function analyse(){
    var raw=jd.value.trim(), t=" "+raw.toLowerCase()+" ";
    if(raw.length<60){res.innerHTML='<p class="res-empty">Paste a fuller job description (a few lines of responsibilities and requirements) to get a useful read.</p>';return}
    var matches=[],gaps=[],S=0,G=0,facts=[];
    C.forEach(function(c){var f=found(t,c.k);if(f.length){matches.push({c:c,f:f});S+=(c.w||1)}});
    GAPS.forEach(function(g){var f=found(t,g.k);if(f.length){gaps.push({n:g.n,why:"Not shown in her portfolio. Worth asking about."});G+=1}});
    var pm=yrs(new Date(2023,3,1)), tot=yrs(new Date(2021,4,1));
    var ym=raw.match(/(\d{1,2})\s*\+?\s*(?:-|–|to)?\s*(?:\d{1,2})?\s*\+?\s*(?:years|yrs)/i);
    if(ym){var need=+ym[1];
      if(need<=pm){facts.push(["ok","Asks for "+need+"+ yrs · "+pm+" yrs in product"])}
      else if(need<=tot){facts.push(["warn","Asks for "+need+"+ yrs · "+pm+" in product, "+tot+" in total"]);G+=.35}
      else{facts.push(["warn","Asks for "+need+"+ yrs · "+tot+" yrs in total"]);gaps.push({n:"Experience",why:"The role asks for "+need+"+ years; Aastha has "+tot+" years, "+pm+" of them in product."});G+=1}
    }
    if(/\bmba\b/i.test(raw)){gaps.push({n:"MBA",why:"Holds a B.Sc. (H) Mathematics; no MBA."});G+=.5}
    var city=null;CITIES.forEach(function(c){if(!city&&rx([c]).test(t))city=c});
    if(/\bmumbai\b/i.test(raw))facts.push(["ok","Based in Mumbai"]);
    else if(city)facts.push(["warn","Role in "+city.replace(/\b\w/g,function(x){return x.toUpperCase()})+" · she's in Mumbai"]);
    else if(/\bremote\b/i.test(raw))facts.push(["ok","Remote · she's in Mumbai"]);

    if(matches.length<3){res.innerHTML='<p class="res-empty">Only '+matches.length+' product skill'+(matches.length==1?'':'s')+' spotted. Paste the full requirements list for a reliable read.</p>';return}
    var score=Math.round(100*S/(S+G+.5));
    var label=score>=80?"Strong fit":score>=60?"Good fit":"Partial fit";
    var title=(raw.split(/\n/)[0]||"").slice(0,90);
    matches.sort(function(a,b){return b.f.length-a.f.length});

    var h='<div class="res-top"><span class="for">Fit for: '+esc(title)+'</span>'+
      '<div class="verdict"><b>'+score+'%</b><span>'+label+'</span></div>'+
      '<div class="meter" role="img" aria-label="Fit score '+score+' percent"><i style="width:'+score+'%"></i></div>'+
      (facts.length?'<div class="facts-row">'+facts.map(function(f){return'<span class="'+f[0]+'">'+esc(f[1])+'</span>'}).join("")+'</div>':'')+'</div>';
    h+='<div><h3>Where she matches <em>'+matches.length+' of the skills you asked for</em></h3><ul class="mlist">'+matches.map(function(m){
      return '<li><div class="t"><b>'+m.c.n+'</b>'+m.f.slice(0,3).map(function(w){return'<i>'+esc(w)+'</i>'}).join("")+'</div>'+
        m.c.e.map(function(e){return'<p>'+esc(e[0])+(e[1]?' <a href="'+ROOT+e[1]+'">Case study →</a>':'')+'</p>'}).join("")+'</li>'}).join("")+'</ul></div>';
    if(gaps.length)h+='<div><h3>Worth asking about</h3><ul class="glist">'+gaps.map(function(g){return'<li><span><b>'+esc(g.n)+'.</b> '+esc(g.why)+'</span></li>'}).join("")+'</ul></div>';
    h+='<div class="res-foot"><button class="btn sm" id="fit-copy" type="button">Copy summary</button><a class="btn sm btn-ghost" href="'+ROOT+'#contact">Contact Aastha</a></div><textarea id="fit-summary" readonly hidden aria-label="Fit summary"></textarea>';
    res.innerHTML=h;

    var sum="Aastha Gupta, Product Manager: "+label+" ("+score+"%) for "+title+"\n\nMatches:\n"+matches.map(function(m){return"- "+m.c.n+": "+m.c.e[0][0]}).join("\n")+
      (gaps.length?"\n\nWorth asking about:\n"+gaps.map(function(g){return"- "+g.n+": "+g.why}).join("\n"):"")+
      "\n\nEmail: aasthag929@gmail.com\nLinkedIn: linkedin.com/in/aastha-gupta-221953113";
    var btn=document.getElementById("fit-copy"),box=document.getElementById("fit-summary");
    btn.addEventListener("click",function(){
      var show=function(){box.value=sum;box.hidden=false;box.focus();box.select();btn.textContent="Select and copy below"};
      try{navigator.clipboard.writeText(sum).then(function(){btn.textContent="Copied";setTimeout(function(){btn.textContent="Copy summary"},1600)},show)}catch(e){show()}
    });
  }

  chips.forEach(function(c){c.addEventListener("click",function(){
    chips.forEach(function(x){x.setAttribute("aria-pressed",x===c?"true":"false")});
    jd.value=SAMPLES[c.dataset.s];analyse();
  })});
  jd.addEventListener("input",function(){chips.forEach(function(x){x.setAttribute("aria-pressed","false")})});
  run.addEventListener("click",analyse);
  jd.value=SAMPLES.growth;analyse();
})();

/* ---------- sticky nav shadow ---------- */
(function(){
  var bar=document.getElementById("topbar");
  var onScroll=function(){bar.classList.toggle("scrolled",window.scrollY>8)};
  window.addEventListener("scroll",onScroll,{passive:true});onScroll();

})();

/* ---------- fit check drawer ---------- */
(function(){
  var d=document.getElementById("fit-drawer"),scrim=document.getElementById("fit-scrim"),
      fab=document.getElementById("fab"),closeBtn=document.getElementById("fit-close"),last=null;
  function open(e){
    if(e)e.preventDefault();
    last=document.activeElement;
    scrim.hidden=false;requestAnimationFrame(function(){scrim.classList.add("on")});
    d.classList.add("open");d.setAttribute("aria-hidden","false");
    document.body.classList.add("drawer-open");document.body.style.overflow="hidden";
    setTimeout(function(){closeBtn.focus()},60);
  }
  function close(){
    d.classList.remove("open");d.setAttribute("aria-hidden","true");
    scrim.classList.remove("on");setTimeout(function(){scrim.hidden=true},260);
    document.body.classList.remove("drawer-open");document.body.style.overflow="";
    if(last&&last.focus)last.focus();
  }
  fab.addEventListener("click",open);
  document.querySelectorAll(".fit-open").forEach(function(a){a.addEventListener("click",open)});
  closeBtn.addEventListener("click",close);
  scrim.addEventListener("click",close);
  document.addEventListener("keydown",function(e){
    if(!d.classList.contains("open"))return;
    if(e.key==="Escape"){close();return}
    if(e.key==="Tab"){
      var f=[].slice.call(d.querySelectorAll('button,a[href],textarea,[tabindex]:not([tabindex="-1"])')).filter(function(x){return x.offsetParent!==null});
      if(!f.length)return;var a=f[0],z=f[f.length-1];
      if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}
      else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}
    }
  });
  /* case-study links inside results close the drawer first */
  d.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href]');if(a)close()});
  if(location.hash==="#fit")open();
})();

/* ---------- section nav: highlight the section in view ---------- */
(function(){
  var links=[].slice.call(document.querySelectorAll(".secnav a[data-sec]"));
  var strip=document.querySelector(".secnav"),cur=null;
  function setActive(id){
    if(id===cur)return;cur=id;
    links.forEach(function(a){var on=a.dataset.sec===id;a.classList.toggle("active",on);if(on){a.setAttribute("aria-current","true")}else{a.removeAttribute("aria-current")}
      if(on&&strip.scrollWidth>strip.clientWidth){strip.scrollTo({left:a.offsetLeft-strip.clientWidth/2+a.offsetWidth/2,behavior:"smooth"})}});
  }
  var secs=links.map(function(a){return document.getElementById(a.dataset.sec)}).filter(Boolean);
  if(!secs.length)return;
  function spy(){
    var line=window.innerHeight*0.35,pick=null;
    secs.forEach(function(sec){if(sec.getBoundingClientRect().top<=line)pick=sec.id});
    if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4)pick="contact";
    setActive(pick);
  }
  var t=null;window.addEventListener("scroll",function(){if(t)return;t=requestAnimationFrame(function(){t=null;spy()})},{passive:true});
  window.addEventListener("hashchange",function(){setTimeout(spy,60)});
  window.addEventListener("resize",spy);spy();
})();

/* ---------- interactive toolkit (enhances static HTML) ---------- */
(function(){
  var host=document.getElementById("tk-groups"),panel=document.getElementById("tk-panel");
  if(!host||!panel)return;
  var btns=[].slice.call(host.querySelectorAll(".sk")),cur=-1;
  btns.forEach(function(b,i){if(b.getAttribute("aria-pressed")==="true")cur=i});
  var narrow=window.matchMedia("(max-width:900px)");
  function esc(t){return t.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function place(b){
    if(narrow.matches){var grp=b.closest(".tk-g");if(grp.nextElementSibling!==panel)grp.after(panel)}
    else if(panel.parentNode!==host.parentNode||panel.previousElementSibling!==host){host.after(panel)}
  }
  function show(i,force){
    if(i===cur&&!force)return;cur=i;var b=btns[i],ev=document.getElementById("ev-"+i);
    btns.forEach(function(x,k){x.setAttribute("aria-pressed",k===i?"true":"false")});
    panel.innerHTML='<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#flower"/></svg><span class="g">'+esc(b.dataset.g)+'</span><h4>'+esc(b.textContent)+'</h4>'+
      (ev?ev.innerHTML:'')+'<div class="nav-sk"><button type="button" data-step="-1">← Previous</button><button type="button" data-step="1">Next skill →</button></div>';
    panel.classList.remove("swap");void panel.offsetWidth;panel.classList.add("swap");
    place(b);
  }
  btns.forEach(function(b,i){
    b.addEventListener("click",function(){show(i)});
    b.addEventListener("mouseenter",function(){if(!narrow.matches)show(i)});
  });
  panel.addEventListener("click",function(e){var s=e.target.closest&&e.target.closest("[data-step]");if(!s)return;
    var n=(cur+ +s.dataset.step+btns.length)%btns.length;show(n);btns[n].focus({preventScroll:true});});
  (narrow.addEventListener?narrow.addEventListener.bind(narrow,"change"):narrow.addListener.bind(narrow))(function(){if(cur>-1)place(btns[cur])});
  if(cur>-1)place(btns[cur]);
})();
