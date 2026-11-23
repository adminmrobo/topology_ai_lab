/* 위상수학 교실 공용 모듈: 도우미 · Cast · Gloss · Quiz · Duel · 진행 막대 · 표지 배경
   외부 라이브러리 없음, 브라우저 저장소 사용 안 함 */
(function(){
'use strict';
var D=document;
function $(s,r){return (r||D).querySelector(s);}
function $$(s,r){return [].slice.call((r||D).querySelectorAll(s));}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function rng(seed){var s=seed>>>0||1;return function(){s^=s<<13;s>>>=0;s^=s>>17;s^=s<<5;s>>>=0;return s/4294967296;};}
window.LAB={$:$,$$:$$,esc:esc,rng:rng,reduced:window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches};

/* 캐릭터 그림 */
var NAMES={doc:'박사',asst:'조수 하루',fly:'초파리 연구원',robo:'주판봇',sia:'인턴 시아',moa:'인턴 모아',x1:'미공개 X1',x2:'미공개 X2',x3:'미공개 X3'};
var BASE={doc:'e08',asst:'e13',fly:'e10',robo:'e13',sia:'e13',moa:'e13',x1:'e13',x2:'e13',x3:'e13'};
function src(who,mood){
  var S=window.SPRITE||{},A=window.SPRITE_ALIAS||{};
  var k=who+'_'+mood; if(A[k])k=A[k];
  if(/^e\d\d$/.test(mood))k=who+'_'+mood;
  return S[k]||S[who+'_'+BASE[who]]||'';
}
var Cast={names:NAMES,src:src,
  fill:function(root){$$('img[data-who]',root).forEach(function(i){if(i.getAttribute('src'))return;var s=src(i.dataset.who,i.dataset.mood||BASE[i.dataset.who]);if(s)i.src=s;});},
  set:function(img,who,mood){var s=src(who,mood);if(!s)return;img.style.transition='opacity .2s';img.style.opacity=0;setTimeout(function(){img.src=s;img.dataset.mood=mood;img.style.opacity=1;},LAB.reduced?0:200);}};
window.Cast=Cast;

/* 용어 말풍선 */
function Gloss(){
  var tip=D.createElement('div');tip.id='tip';tip.setAttribute('role','tooltip');D.body.appendChild(tip);
  var cur=null;
  function show(el){var t=el.dataset.t,d=el.dataset.d;tip.innerHTML='<b>'+esc(t)+'</b><br>'+esc(d);tip.style.display='block';
    var r=el.getBoundingClientRect(),w=Math.min(300,innerWidth-20);tip.style.maxWidth=w+'px';
    var x=Math.max(10,Math.min(innerWidth-w-10,r.left+scrollX));tip.style.left=x+'px';tip.style.top=(r.bottom+scrollY+6)+'px';cur=el;}
  function hide(){tip.style.display='none';cur=null;}
  $$('.jt').forEach(function(el){el.tabIndex=0;el.setAttribute('role','button');
    el.addEventListener('click',function(e){e.stopPropagation();cur===el?hide():show(el);});
    el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();cur===el?hide():show(el);}});});
  D.addEventListener('click',hide);D.addEventListener('keydown',function(e){if(e.key==='Escape')hide();});
}

/* 확인 퀴즈 */
function Quiz(data){
  $$('.quiz[data-quiz]').forEach(function(box){
    var items=(data||{})[box.dataset.quiz]||[];
    box.innerHTML='<b style="color:var(--info)">확인 퀴즈</b>';
    items.forEach(function(it,qi){
      var d=D.createElement('div');d.className='item';
      d.innerHTML='<p class="qq">Q'+(qi+1)+'. '+esc(it.q)+'</p><div class="opts" role="group"></div><div class="fb" aria-live="polite"></div>'+(it.hint?'<button class="bt hintb" type="button" style="margin-top:6px">힌트 보기</button>':'');
      var opts=$('.opts',d),fb=$('.fb',d);
      it.o.forEach(function(o,oi){var b=D.createElement('button');b.type='button';b.className='bt';b.textContent=o;
        b.onclick=function(){$$('button',opts).forEach(function(x){x.setAttribute('aria-pressed','false');});
          var ok=oi===it.a;b.setAttribute('aria-pressed','true');b.style.background=ok?'var(--gfp)':'var(--eye)';b.style.borderColor=b.style.background;b.style.color='#fff';
          fb.innerHTML=(ok?'<b style="color:var(--gfp)">맞았어요.</b> ':'<b style="color:var(--eye)">다시 볼까요?</b> 정답은 「'+esc(it.o[it.a])+'」. ')+esc(it.why);};
        opts.appendChild(b);});
      var hb=$('.hintb',d);if(hb)hb.onclick=function(){fb.innerHTML='<span style="color:var(--amber)">힌트: '+esc(it.hint)+'</span>';};
      box.appendChild(d);});
  });
}

/* 대결 (조교 대결): run() → {fly:true/false, robo:true/false, report:'조수가 발표할 숫자 문장'} */
function Duel(cfg){
  var el=$('#duel');if(!el||!cfg)return;
  var btn=$('.duel-run',el),out=$('.verdict',el),fs=$('.side.fly',el),rs=$('.side.robo',el);
  btn.onclick=function(){
    var fn=(window.DUELS||{})[cfg.run];if(!fn){out.textContent='판정 모듈 없음';return;}
    var r=fn();fs.classList.toggle('win',r.fly);rs.classList.toggle('win',r.robo);
    Cast.set($('img',fs),'fly',r.fly?'e16':'cry');Cast.set($('img',rs),'robo',r.robo?'happy':'cry');
    var w=r.fly&&!r.robo?'초파리 연구원 승':r.robo&&!r.fly?'주판봇 승':r.fly&&r.robo?'무승부 (둘 다 맞음)':'무승부 (둘 다 틀림)';
    out.innerHTML='<div class="say" data-who="asst"><img class="who" data-who="asst" data-mood="report" alt="" aria-hidden="true"><div><b class="name">조수 하루 (계산 발표)</b><p>'+r.report+'</p></div></div>'+
      '<div class="say" data-who="doc"><img class="who" data-who="doc" data-mood="verdict" alt="" aria-hidden="true"><div><b class="name">박사 (판정)</b><p><b>'+w+'.</b> '+esc(cfg.lesson)+'</p></div></div>';
    Cast.fill(out);};
}

/* 진행 막대 */
function Prog(){var p=$('#prog');if(!p)return;function u(){var h=D.documentElement.scrollHeight-innerHeight;p.style.width=(h>0?100*scrollY/h:0)+'%';}addEventListener('scroll',u,{passive:true});u();}

/* 표지 배경: 픽셀 점 격자 + 도넛·컵 모티프 (설명용 장식) */
function CoverBg(){
  $$('canvas.bgpx').forEach(function(c){
    function draw(){var r=c.getBoundingClientRect(),dpr=devicePixelRatio||1;c.width=Math.max(1,r.width*dpr|0);c.height=Math.max(1,r.height*dpr|0);
      var g=c.getContext('2d');g.imageSmoothingEnabled=false;var px=Math.max(4,Math.round(r.width/160))*dpr,W=c.width,H=c.height,R=rng(+c.dataset.seed||7);
      g.fillStyle='#f3f7fb';g.fillRect(0,0,W,H);
      for(var y=0;y<H;y+=px*4)for(var x=0;x<W;x+=px*4){g.fillStyle='rgba(47,111,143,'+(0.05+0.08*R())+')';g.fillRect(x,y,px,px);}
      var cols=['#2f6f8f','#9b3fb5','#13733a','#a35c00'];
      function ring(cx,cy,rr,th,col){for(var y=-rr;y<=rr;y+=px)for(var x=-rr;x<=rr;x+=px){var d=Math.sqrt(x*x+y*y);if(d<=rr&&d>=rr-th){g.fillStyle=col;g.fillRect(Math.round((cx+x)/px)*px,Math.round((cy+y)/px)*px,px,px);}}}
      var n=+c.dataset.motif||0;
      ring(W*0.88,H*0.78,H*0.11,H*0.055,cols[n%4]);ring(W*0.73,H*0.86,H*0.06,H*0.03,cols[(n+1)%4]);
      g.fillStyle='rgba(22,33,43,.08)';g.fillRect(0,H-px*3,W,px*3);}
    draw();addEventListener('resize',draw);});
}

/* 보이는 것만 움직이는 박자 하나 */
var ticks=[];LAB.tick=function(el,fn){ticks.push({el:el,fn:fn,vis:false});if(window.IntersectionObserver){var t=ticks[ticks.length-1];new IntersectionObserver(function(es){t.vis=es[0].isIntersecting;}).observe(el);}else ticks[ticks.length-1].vis=true;fn(0);};
var last=0;function loop(ts){var dt=Math.min(0.05,(ts-last)/1000||0);last=ts;ticks.forEach(function(t){if(t.vis)t.fn(dt);});requestAnimationFrame(loop);}
requestAnimationFrame(loop);

function init(){
  var P={};try{var e=$('#page-data');if(e)P=JSON.parse(e.textContent);}catch(err){}
  window.PAGE=P;
  Cast.fill();CoverBg();Gloss();Quiz(P.quiz);Prog();
  $$('[data-w]').forEach(function(el){var f=(window.W||{})[el.dataset.w];if(f){var o={};try{o=JSON.parse(el.dataset.o||'{}');}catch(err){}try{f(el,o);}catch(err){el.textContent='그림을 그리지 못했어요: '+err.message;if(window.console)console.error(err);}}});
  Duel(P.duel);
}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',init);else init();
})();
