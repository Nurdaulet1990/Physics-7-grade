/* ═══ ДЕМО режимі: мұғалім тақтада көрсетеді. Ештеңе серверге жіберілмейді. ═══
   Қосу: кез келген бетке ?demo=1 қосу (teacher.html-дағы «演示模式» батырмасы).
   Шығу: жоғарыдағы «✕ Шығу». */
(function(){
  var Q=new URLSearchParams(location.search);
  var on=false;try{if(Q.get('demo')==='1')sessionStorage.setItem('fiz_demo','1');if(Q.get('demo')==='0')sessionStorage.removeItem('fiz_demo');on=sessionStorage.getItem('fiz_demo')==='1';}catch(e){on=Q.get('demo')==='1';}
  window.FIZ_DEMO=on;if(!on)return;
  var EMBED=Q.get('embed')==='1';

  /* ── жергілікті сақтау: демо өз бөлек кілттерін қолданады (оқушы деректеріне тимейді) ── */
  var SP=Storage.prototype,gI=SP.getItem,sI=SP.setItem,rI=SP.removeItem;
  function isLS(s){try{return s===window.localStorage}catch(e){return false}}
  SP.getItem=function(k){return gI.call(this,isLS(this)?'demo:'+k:k)};
  SP.setItem=function(k,v){return sI.call(this,isLS(this)?'demo:'+k:k,v)};
  SP.removeItem=function(k){return rI.call(this,isLS(this)?'demo:'+k:k)};
  function dget(k,d){try{var v=localStorage.getItem('_'+k);return v?JSON.parse(v):d}catch(e){return d}}
  function dset(k,v){try{localStorage.setItem('_'+k,JSON.stringify(v))}catch(e){}}
  function demoReset(){try{var ks=[];for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('demo:')===0)ks.push(k)}ks.forEach(function(k){rI.call(localStorage,k)})}catch(e){}}

  /* ── беттен шығу ескертуі мен автосақтау демода өшірулі ── */
  window.addEventListener('visibilitychange',function(e){e.stopImmediatePropagation()},true);

  /* ── жалған Supabase ── */
  var ME_ID='demo-student';
  function me(){return dget('me',null)}
  function session(){var m=me();return m?{user:{id:ME_ID,is_anonymous:true},access_token:'demo'}:null}
  function lessons(){return (window.LESSONS||[]).filter(function(L){return L.id&&L.file})}
  function Query(table){this.t=table;this.op='select';this.f={};this.one=false;this.payload=null;}
  ['select','order','limit','not','neq','gt','lt','gte','lte','is','range','filter','match'].forEach(function(m){Query.prototype[m]=function(){if(m==='select'&&this.op==='select')this.op='select';return this}});
  Query.prototype.eq=function(k,v){this.f[k]=v;return this};
  Query.prototype.in=function(k,v){this.f[k]=v;return this};
  Query.prototype.insert=function(p){this.op='insert';this.payload=p;return this};
  Query.prototype.upsert=Query.prototype.insert;
  Query.prototype.update=function(p){this.op='update';this.payload=p;return this};
  Query.prototype.delete=function(){this.op='delete';return this};
  Query.prototype.maybeSingle=function(){this.one=true;return this};
  Query.prototype.single=function(){this.one=true;return this};
  Query.prototype.then=function(res,rej){var self=this;return new Promise(function(ok){setTimeout(function(){ok(self.run())},120)}).then(res,rej)};
  Query.prototype.catch=function(f){return this.then(null,f)};
  Query.prototype.run=function(){var t=this.t,m=me(),data=null;
    if(this.op!=='select'){
      if(t==='submissions'&&this.op==='insert'){var s=dget('sent',{});[].concat(this.payload).forEach(function(x){if(x&&x.lesson)s[x.lesson]=1});dset('sent',s);}
      if(t==='sessions'&&this.op==='insert'){var c=(this.payload&&this.payload.concept_id)||'';data={id:'demo-s|'+c,state:null};}
      return {data:data,error:null};}
    if(t==='students')data=m?[{id:ME_ID,display_name:m.name,class_id:'demo'}]:[];
    else if(t==='lesson_schedule')data=lessons().map(function(L){return {lesson_id:L.id,open_at:'2000-01-01T00:00:00Z',class_id:'demo'}});
    else if(t==='student_concepts'){var cs=dget('concepts',{});data=Object.keys(cs).map(function(k){return {concept_id:k,status:cs[k]}});}
    else if(t==='submissions'){var sn=dget('sent',{});data=Object.keys(sn).map(function(k){return {lesson:k}});}
    else data=[];
    if(this.one){data=data&&data.length?data[0]:null;if(t==='lesson_schedule'&&!data)data={open_at:'2000-01-01T00:00:00Z'};}
    return {data:data,error:null};};
  var TALK=['Сәлем! Мен — Tutor. (Бұл демо: нағыз Tutor сенің жауабыңа қарай сұрақ қояды.) Бастайық: осы тақырып туралы не білесің? Өз сөзіңмен жаз.',
    'Жақсы! Енді неге солай ойлайтыныңды түсіндір. Мен жауапты бірден айтпаймын — сені ойлатамын.',
    'Дұрыс бағыттасың. Тексеру сұрағы: тағы бір мысал келтір.',
    'Керемет! Сен бұл тақырыпты түсіндің. Белгі «Түсіндің» болды. (Демо аяқталды.)'];
  var fake={
    auth:{getSession:function(){return Promise.resolve({data:{session:session()},error:null})},
      getUser:function(){var s=session();return Promise.resolve({data:{user:s?s.user:null},error:null})},
      signInAnonymously:function(){return Promise.resolve({data:{},error:null})},
      signOut:function(){return Promise.resolve({error:null})},
      signInWithPassword:function(){return Promise.resolve({data:{},error:{message:'Демо режимі'}})},
      onAuthStateChange:function(){return {data:{subscription:{unsubscribe:function(){}}}}}},
    from:function(t){return new Query(t)},
    rpc:function(name,args){return new Promise(function(ok){setTimeout(function(){
      if(name==='join_class'){var n=String((args&&args.p_name)||'').trim();if(!n){ok({data:null,error:{message:'invalid_name'}});return;}dset('me',{name:n});ok({data:ME_ID,error:null});return;}
      if(name==='concept_is_open'){ok({data:true,error:null});return;}
      ok({data:null,error:null});},250)})},
    functions:{invoke:function(fn,o){return new Promise(function(ok){setTimeout(function(){
      var b=(o&&o.body)||{},sid=String(b.session_id||''),c=sid.split('|')[1]||'',k='talk:'+sid,n=dget(k,0);
      if(b.message==='__start__')n=0;var i=Math.min(n,TALK.length-1);dset(k,n+1);
      var done=i===TALK.length-1;if(c){var cs=dget('concepts',{});cs[c]=done?'understood':'developing';dset('concepts',cs);}
      ok({data:{reply:TALK[i],phase:done?'done':'talk'},error:null});},700)})}},
    channel:function(){return {on:function(){return this},subscribe:function(){return this}}},removeChannel:function(){}
  };
  window.supabase={createClient:function(){return fake},__demo:true};

  /* ── сілтемелер демода қалсын ── */
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
    var h=a.getAttribute('href');if(!h||/^(#|mailto:|tel:|javascript:)/.test(h))return;
    try{var u=new URL(h,location.href);if(u.origin!==location.origin)return;if(!u.searchParams.has('demo')){u.searchParams.set('demo','1');a.setAttribute('href',u.pathname.split('/').pop()+u.search+u.hash);}}catch(err){}},true);

  /* ── «Жауаптарды көрсету» ── */
  function vis(el){return !!(el&&el.offsetParent!==null)}
  function fmt(v){var n=+v;if(isNaN(n))return String(v);return String(Math.round(n*1e6)/1e6).replace('.',',')}
  function fire(el){['input','change','keyup'].forEach(function(t){el.dispatchEvent(new Event(t,{bubbles:true}))})}
  function fillAnswers(){var n=0;
    if(window.__SETS&&document.getElementById('qnum')){   /* есеп жинағы */
      var t=document.getElementById('qnum').textContent,S=window.__SETS,k=Object.keys(S).filter(function(k){return t.indexOf(S[k].name)===0}).sort(function(a,b){return S[b].name.length-S[a].name.length})[0],m=t.match(/· (\d+) \//);
      if(k&&m){var p=S[k].list[+m[1]-1];document.querySelectorAll('.ans').forEach(function(e,i){if(p.asks[i]){e.value=fmt(p.asks[i].v);fire(e);n++;}});}
      return n;}
    document.querySelectorAll('input[data-ans]').forEach(function(e){if(!vis(e)||e.value)return;e.value=fmt(e.dataset.ans);fire(e);n++;});
    document.querySelectorAll('textarea').forEach(function(e){if(!vis(e)||e.value.trim())return;e.value='Мысал жауап (демо).';fire(e);n++;});
    var groups=[];document.querySelectorAll('.opt[data-ok="1"]').forEach(function(o){var g=o.parentNode;if(groups.indexOf(g)<0&&vis(o))groups.push(g);});
    groups.forEach(function(g){var opts=[].slice.call(g.querySelectorAll('.opt'));if(opts.some(function(x){return x.classList.contains('ok')||x.classList.contains('bad')||x.classList.contains('on')||x.disabled}))return;
      var c=g.querySelector('.opt[data-ok="1"]');if(c){c.click();n++;}});
    return n;}
  function openAll(){var n=0;document.querySelectorAll('section.locked[data-sec]').forEach(function(s){var k=+s.dataset.sec;if(typeof window.unlock==='function'){try{window.unlock(k);n++;return;}catch(e){}}s.classList.remove('locked');n++;});
    document.querySelectorAll('.gate').forEach(function(g){g.style.display='none'});
    if(typeof window.hud==='function')try{window.hud()}catch(e){}return n;}
  window.demoFill=fillAnswers;window.demoOpenAll=openAll;

  /* ── демо жолағы ── */
  if(EMBED)return;
  function bar(){if(document.getElementById('demoBar'))return;
    var css=document.createElement('style');css.textContent=
      '#demoBar{position:fixed;left:10px;top:50%;transform:translateY(-50%);z-index:9999;display:flex;flex-direction:column;gap:6px;align-items:stretch;width:150px;'
      +'background:#1d2440;color:#fff;border-radius:16px;padding:9px;box-shadow:0 6px 24px rgba(0,0,0,.3);font:600 14px/1.2 system-ui,sans-serif}'
      +'#demoBar .tag{background:#e8a33a;color:#1d2440;border-radius:10px;padding:6px 9px;font-weight:800;letter-spacing:1px;text-align:center}'
      +'#demoBar button{border:0;border-radius:10px;padding:8px 9px;font:inherit;cursor:pointer;background:#fff;color:#1d2440;min-height:38px;text-align:left}'
      +'#demoBar button.x{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.4)}'
      +'#demoBar .m{font-size:12px;opacity:.85;text-align:center}'
      +'#demoBar.min>*:not(.tag){display:none}#demoBar .tag{cursor:pointer}'
      +'@media (max-width:1100px){#demoBar{top:auto;bottom:90px;transform:none;width:136px}}';
    document.head.appendChild(css);
    var b=document.createElement('div');b.id='demoBar';
    var isLesson=!!document.querySelector('section[data-sec]')||!!window.__SETS;
    b.innerHTML='<span class="tag">ДЕМО</span>'
      +(isLesson?'<button type="button" id="dmFill">💡 Жауапты көрсету</button>':'')
      +(document.querySelector('section[data-sec]')?'<button type="button" id="dmOpen">⏭ Бәрін ашу</button>':'')
      +'<button type="button" id="dmReset" title="Демоны басынан бастау">🔄 Басынан</button>'
      +'<button type="button" class="x" id="dmExit">✕ Шығу</button><span class="m" id="dmMsg">Ештеңе сақталмайды</span>';
    document.body.appendChild(b);
    b.querySelector('.tag').title='Жасыру / көрсету';b.querySelector('.tag').onclick=function(){b.classList.toggle('min')};
    function msg(t){var m=document.getElementById('dmMsg');m.textContent=t;clearTimeout(m._t);m._t=setTimeout(function(){m.textContent='Ештеңе сақталмайды'},3000);}
    var f=document.getElementById('dmFill');if(f)f.onclick=function(){var n=fillAnswers();msg(n?'Толтырылды: '+n:'Бұл жерде толтыратын жауап жоқ');};
    var o=document.getElementById('dmOpen');if(o)o.onclick=function(){var n=openAll();msg(n?'Ашылды: '+n+' бөлім':'Бәрі ашық');};
    document.getElementById('dmReset').onclick=function(){demoReset();location.href='./index.html?demo=1';};
    document.getElementById('dmExit').onclick=function(){demoReset();try{sessionStorage.removeItem('fiz_demo')}catch(e){}location.href='./teacher.html';};
  }
  if(document.body)bar();else document.addEventListener('DOMContentLoaded',bar);
})();
