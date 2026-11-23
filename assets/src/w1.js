/* 위젯 모음 1: 공용 도우미 + 기둥 1 (열린 집합 · 이산 · 연결 · 콤팩트) */
var W={},DUELS={};
(function(){
'use strict';
var NS='http://www.w3.org/2000/svg';
function E(tag,at,par){var e=document.createElementNS(NS,tag);for(var k in at)e.setAttribute(k,at[k]);if(par)par.appendChild(e);return e;}
function H(tag,cls,html,par){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;if(par)par.appendChild(e);return e;}
function svg(el,w,h,label){var s=E('svg',{viewBox:'0 0 '+w+' '+h,width:'100%',role:'img','aria-label':label||'설명 그림'});s.style.maxWidth=w+'px';el.appendChild(s);return s;}
function ctrl(el){return H('div','ctrl',null,el);}
function btn(par,label,on,pressed){var b=H('button','bt',label,par);b.type='button';if(pressed!=null)b.setAttribute('aria-pressed',pressed?'true':'false');b.onclick=function(){on(b);};return b;}
function radio(par,label,opts,cur,on){H('span','glabel',label,par);var bs=opts.map(function(o){return btn(par,o[1],function(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});on(o[0]);},o[0]===cur);});return bs;}
function slider(par,label,min,max,step,val,on){H('span','glabel',label,par);var r=H('input',null,null,par);r.type='range';r.min=min;r.max=max;r.step=step;r.value=val;r.setAttribute('aria-label',label);var v=H('span','val','',par);function u(){v.textContent=on(+r.value)||'';}r.oninput=u;Promise.resolve().then(u);return r;}
function out(el){var o=H('div','insight',null,el);o.setAttribute('aria-live','polite');return o;}
function tx(s,x,y,t,at){var e=E('text',Object.assign({x:x,y:y,'font-size':13,fill:'#16212b','font-family':'inherit'},at||{}),s);e.textContent=t;return e;}
function setName(n){return '{'+n.join(', ')+'}';}
function subsets(n){var a=[];for(var m=0;m<(1<<n);m++)a.push(m);return a;}
function lab(m,n,names){var r=[];for(var i=0;i<n;i++)if(m>>i&1)r.push(names[i]);return r.length?setName(r):'∅';}
function isTop(T,n){var full=(1<<n)-1,S={};T.forEach(function(m){S[m]=1;});var r1=S[0]&&S[full];var r2=true,r3=true,b2=null,b3=null;
  T.forEach(function(a){T.forEach(function(b){if(!S[a|b]){r2=false;b2=b2||[a,b];}if(!S[a&b]){r3=false;b3=b3||[a,b];}});});return {r1:!!r1,r2:r2,r3:r3,b2:b2,b3:b3};}
window.WU={E:E,H:H,svg:svg,ctrl:ctrl,btn:btn,radio:radio,slider:slider,out:out,tx:tx,isTop:isTop,lab:lab,subsets:subsets};
var C={g:'#13733a',m:'#9b3fb5',r:'#c9302c',a:'#a35c00',b:'#1e55c8',k:'#16212b',mu:'#5b6874',rule:'#d5dbe2',acc:'#2f6f8f'};
window.WC=C;

/* 수직선 구간: 열린 끝/닫힌 끝, 점 주변의 여유 */
W.interval=function(el,o){
  var s=svg(el,640,150,'수직선 위 0에서 1까지의 구간과 고른 점'),st={l:o.l||'open',r:o.r||'open',x:o.x||0.5};
  var c=ctrl(el);radio(c,'왼쪽 끝 0:',[['open','열림 ( 0 빠짐'],['closed','닫힘 [ 0 포함']],st.l,function(v){st.l=v;draw();});
  var c2=ctrl(el);radio(c2,'오른쪽 끝 1:',[['open','열림 1 빠짐 )'],['closed','닫힘 1 포함 ]']],st.r,function(v){st.r=v;draw();});
  var c3=ctrl(el);slider(c3,'점의 자리',0,1,0.01,st.x,function(v){st.x=v;draw();return v.toFixed(2);});
  var ou=out(el);
  function X(v){return 70+v*500;}
  function draw(){s.innerHTML='';E('line',{x1:20,y1:80,x2:620,y2:80,stroke:C.mu,'stroke-width':2},s);
    E('line',{x1:X(0),y1:80,x2:X(1),y2:80,stroke:C.g,'stroke-width':8,'stroke-linecap':'butt'},s);
    [[0,st.l],[1,st.r]].forEach(function(p){E('circle',{cx:X(p[0]),cy:80,r:9,fill:p[1]==='closed'?C.g:'#fff',stroke:C.g,'stroke-width':3},s);tx(s,X(p[0])-4,112,String(p[0]));});
    var x=st.x,inS=(x>0&&x<1)||(x===0&&st.l==='closed')||(x===1&&st.r==='closed');
    var room=inS?Math.min(x,1-x):0;var ok=inS&&room>0.0001;
    if(ok)E('rect',{x:X(x-room*0.9),y:62,width:room*0.9*2*500,height:36,fill:'rgba(19,115,58,.12)',stroke:C.g,'stroke-dasharray':'4 3'},s);
    E('circle',{cx:X(x),cy:80,r:7,fill:inS?C.b:C.r},s);tx(s,X(x)-14,48,'점 '+x.toFixed(2),{fill:inS?C.b:C.r,'font-weight':700});
    ou.innerHTML=!inS?'<p class="r">이 점은 집합 밖이에요(끝점이 빠져 있음).</p>':ok?'<p class="g">점 둘레로 양쪽 '+(room).toFixed(2)+'만큼 움직여도 집합 안에 있어요. 이런 여유가 모든 점에 있으면 「열린 집합」.</p>':'<p class="a">점이 끝점 바로 위에 있어요. 바깥쪽으로 아주 조금만 움직여도 집합을 벗어나요. 여유가 0이라 이 집합은 열린 집합이 아닙니다.</p>';
    var allOpen=st.l==='open'&&st.r==='open';ou.innerHTML+='<p>지금 집합: <b>'+(st.l==='open'?'(':'[')+'0, 1'+(st.r==='open'?')':']')+'</b> → '+(allOpen?'<span class="g">열린 집합 (모든 점에 여유가 있음)</span>':'<span class="a">열린 집합 아님 (닫힌 끝점에서 여유가 없음)</span>')+'</p>';}
  draw();
};

/* 위상 점검기: 점 n개의 부분집합을 켜고 끄며 세 규칙 확인 (semi: 교집합 규칙을 빼면 무엇인지 표시) */
W.checker=function(el,o){
  var n=o.n||3,names=o.names||['1','2','3','4'].slice(0,n),full=(1<<n)-1,on={};
  var P={discrete:subsets(n),indiscrete:[0,full],sier:[0,1,full],chain:[0,1,3,full],bad:[0,1,2,full],semi:[0,3,6,full]};
  function preset(k){on={};(P[k]||[]).forEach(function(m){on[m]=1;});draw();}
  var c=ctrl(el);H('span','glabel','미리 정한 모음:',c);
  (o.presets||['discrete','indiscrete','sier','bad']).forEach(function(k){btn(c,{discrete:'이산(전부)',indiscrete:'밀착(∅와 전체)',sier:'작은 예',chain:'줄 세우기',bad:'규칙 깨진 예',semi:'합집합만 되는 예'}[k],function(){preset(k);});});
  btn(c,'모두 끄기',function(){on={};draw();});
  var grid=H('div','ctrl',null,el);grid.setAttribute('role','group');grid.setAttribute('aria-label','부분집합 고르기');
  var bs=subsets(n).sort(function(a,b){return pc(a)-pc(b)||a-b;}).map(function(m){var b=btn(grid,lab(m,n,names),function(){on[m]=!on[m];draw();},false);b.dataset.m=m;return b;});
  function pc(m){var c=0;while(m){c+=m&1;m>>=1;}return c;}
  var ou=out(el);
  function draw(){var T=Object.keys(on).filter(function(k){return on[k];}).map(Number);
    bs.forEach(function(b){b.setAttribute('aria-pressed',on[+b.dataset.m]?'true':'false');});
    var r=isTop(T,n),ok=r.r1&&r.r2&&r.r3;
    var h='<p>고른 집합 '+T.length+'개를 「열린 집합」 목록으로 삼으면:</p>';
    h+='<p class="'+(r.r1?'g':'r')+'">규칙 1 (빈 집합 ∅과 전체 '+lab(full,n,names)+'가 들어 있다): '+(r.r1?'통과':'실패')+'</p>';
    h+='<p class="'+(r.r2?'g':'r')+'">규칙 2 (두 개를 합쳐도 목록 안): '+(r.r2?'통과':'실패 — 예: '+lab(r.b2[0],n,names)+' ∪ '+lab(r.b2[1],n,names)+' = '+lab(r.b2[0]|r.b2[1],n,names)+'가 없음')+'</p>';
    h+='<p class="'+(r.r3?'g':'r')+'">규칙 3 (두 개의 겹친 부분도 목록 안): '+(r.r3?'통과':'실패 — 예: '+lab(r.b3[0],n,names)+' ∩ '+lab(r.b3[1],n,names)+' = '+lab(r.b3[0]&r.b3[1],n,names)+'가 없음')+'</p>';
    if(ok){var cl=T.map(function(m){return full^m;});var clopen=T.filter(function(m){return T.indexOf(full^m)>=0;}).length;
      h+='<p class="g"><b>위상입니다.</b> 닫힌 집합(열린 집합의 바깥) '+cl.length+'개, 열리면서 닫힌 집합 '+clopen+'개.</p>';}
    else if(o.semi&&r.r1&&r.r2)h+='<p class="m"><b>위상은 아니지만</b>, 합집합 규칙까지는 지키는 「느슨한 공간」(교집합 규칙을 뺀 것)이에요.</p>';
    else h+='<p class="a">아직 위상이 아니에요. 실패한 규칙의 예를 목록에 더해 보세요.</p>';
    ou.innerHTML=h;}
  preset(o.preset||'sier');
};

/* 벤 그림: 안쪽·경계·바깥 고르기 */
W.venn=function(el,o){
  var s=svg(el,640,330,'직사각형 X 안의 두 원 U1과 U2. 누른 곳의 위치를 판정'),pt={x:320,y:165},mode='both';
  var c=ctrl(el);radio(c,'살펴볼 집합:',[['both','U1 ∩ U2 (겹친 곳)'],['u1','U1'],['union','U1 ∪ U2']],mode,function(v){mode=v;draw();});
  var ou=out(el);var A={x:250,y:165,r:115},B={x:390,y:165,r:115};
  s.addEventListener('pointerdown',function(e){var r=s.getBoundingClientRect();pt={x:(e.clientX-r.left)*640/r.width,y:(e.clientY-r.top)*330/r.height};draw();});
  function d(P,Q){return Math.hypot(P.x-Q.x,P.y-Q.y);}
  function draw(){s.innerHTML='';E('rect',{x:20,y:15,width:600,height:300,fill:'#fff',stroke:C.k,'stroke-width':2},s);tx(s,30,36,'X');
    var inA=d(pt,A)<A.r,inB=d(pt,B)<B.r,onA=Math.abs(d(pt,A)-A.r)<5,onB=Math.abs(d(pt,B)-B.r)<5;
    var fill={both:'rgba(30,85,200,.18)'};E('circle',{cx:A.x,cy:A.y,r:A.r,fill:mode!=='both'?'rgba(30,85,200,.12)':'none',stroke:C.b,'stroke-width':3},s);
    E('circle',{cx:B.x,cy:B.y,r:B.r,fill:mode==='union'?'rgba(30,85,200,.12)':'none',stroke:C.b,'stroke-width':3},s);
    if(mode==='both'){E('clipPath',{id:'vc'},s).appendChild(E('circle',{cx:A.x,cy:A.y,r:A.r}));E('circle',{cx:B.x,cy:B.y,r:B.r,fill:fill.both,'clip-path':'url(#vc)'},s);}
    tx(s,170,70,'U1',{fill:C.b,'font-weight':700});tx(s,450,70,'U2',{fill:C.b,'font-weight':700});
    E('circle',{cx:pt.x,cy:pt.y,r:7,fill:C.r,stroke:'#fff','stroke-width':2},s);
    var inside,edge;
    if(mode==='u1'){inside=inA&&!onA;edge=onA;}
    else if(mode==='union'){inside=(inA||inB)&&!((onA&&!inB)||(onB&&!inA));edge=(onA&&!inB)||(onB&&!inA);}
    else{inside=inA&&inB&&!onA&&!onB;edge=(onA&&(inB||onB))||(onB&&(inA||onA));}
    var nm={both:'U1 ∩ U2',u1:'U1',union:'U1 ∪ U2'}[mode];
    ou.innerHTML='<p>그림 아무 곳이나 눌러 점을 옮기세요. 선 위를 누르면 「경계」를 볼 수 있어요.</p><p class="'+(edge?'a':inside?'g':'r')+'"><b>'+(edge?'경계':inside?'안쪽 (내부)':'바깥 (외부)')+'</b> — '+(edge?'이 점의 아무리 작은 둘레에도 '+nm+'의 안과 밖이 함께 들어 있어요.':inside?'이 점 둘레에 '+nm+' 안에만 있는 작은 동그라미를 그릴 수 있어요.':'이 점 둘레에 '+nm+'과 전혀 안 닿는 작은 동그라미를 그릴 수 있어요.')+'</p>';}
  draw();
};

/* 줄어드는 열린 구간들의 겹친 곳 (−1/n, 1/n) */
W.shrink=function(el,o){
  var s=svg(el,640,170,'점점 줄어드는 열린 구간들'),N=5,c=ctrl(el),ou=out(el);
  slider(c,'구간 개수 n',1,60,1,N,function(v){N=v;draw();return v+'개';});
  function X(v){return 320+v*280;}
  function draw(){s.innerHTML='';E('line',{x1:20,y1:150,x2:620,y2:150,stroke:C.mu},s);tx(s,X(0)-4,166,'0');tx(s,X(1)-6,166,'1');tx(s,X(-1)-10,166,'−1');
    for(var k=1;k<=Math.min(N,12);k++){var a=1/k,y=14+k*10;E('line',{x1:X(-a),y1:y,x2:X(a),y2:y,stroke:C.b,'stroke-width':5,opacity:.35+.5*k/12},s);}
    var a=1/N;E('line',{x1:X(-a),y1:140,x2:X(a),y2:140,stroke:C.g,'stroke-width':8},s);E('circle',{cx:X(0),cy:140,r:4,fill:C.r},s);
    ou.innerHTML='<p>구간 '+N+'개가 모두 겹친 곳 = (−1/'+N+', 1/'+N+') = 폭 <b>'+(2/N).toFixed(4)+'</b>인 열린 구간.</p><p class="a">개수가 유한하면 겹친 곳이 여전히 열린 구간이에요. 하지만 끝없이 계속하면 모든 구간에 공통으로 남는 것은 점 0 하나뿐 — {0}은 여유가 없는 집합이라 열린 집합이 아닙니다.</p>';}
  draw();
};

/* 구별 게임 + 가장 작은 이웃 */
W.tell=function(el,o){
  var n=o.n||3,names=o.names||['1','2','3','4'].slice(0,n),full=(1<<n)-1;
  var P=o.tops||{'이산':subsets(n),'밀착':[0,full],'중간':[0,1,3,full]};var cur=o.start||Object.keys(P)[0],a=0,b=1;
  var c=ctrl(el);radio(c,'위상:',Object.keys(P).map(function(k){return [k,k];}),cur,function(v){cur=v;draw();});
  var c2=ctrl(el),pa,pb;H('span','glabel','점 A:',c2);pa=names.map(function(nm,i){return btn(c2,nm,function(){a=i;draw();},i===a);});
  H('span','glabel','점 B:',c2);pb=names.map(function(nm,i){return btn(c2,nm,function(){b=i;draw();},i===b);});
  var ou=out(el);
  function draw(){var T=P[cur];pa.forEach(function(x,i){x.setAttribute('aria-pressed',i===a?'true':'false');});pb.forEach(function(x,i){x.setAttribute('aria-pressed',i===b?'true':'false');});
    var minA=full;T.forEach(function(m){if(m>>a&1)minA&=m;});var minB=full;T.forEach(function(m){if(m>>b&1)minB&=m;});
    var h='<p>열린 집합 목록: '+T.map(function(m){return lab(m,n,names);}).join(', ')+' ('+T.length+'개)</p>';
    h+='<p>점 '+names[a]+'의 <b>가장 작은 이웃</b>(그 점을 담은 열린 집합들의 공통 부분) = <b>'+lab(minA,n,names)+'</b></p>';
    if(a===b)h+='<p class="a">같은 점을 골랐어요. 서로 다른 두 점을 골라 보세요.</p>';
    else{var w=T.filter(function(m){return (m>>a&1)&&!(m>>b&1);})[0];var w2=T.filter(function(m){return (m>>b&1)&&!(m>>a&1);})[0];
      h+=w!=null?'<p class="g">구별됨: 열린 집합 '+lab(w,n,names)+'은 '+names[a]+'를 담고 '+names[b]+'는 담지 않아요.</p>':(w2!=null?'<p class="a">한쪽만 구별: '+names[a]+'를 담고 '+names[b]+'를 빼는 열린 집합은 없지만, 반대('+lab(w2,n,names)+')는 있어요.</p>':'<p class="r">구별 불가: 어떤 열린 집합도 두 점을 갈라 놓지 못해요. 위상의 눈으로는 두 점이 「같은 자리」처럼 보입니다.</p>');}
    ou.innerHTML=h;}
  draw();
};

/* 점 n개 위의 위상 개수 세기 (전수 조사) */
W.count=function(el,o){
  var c=ctrl(el),ou=out(el),N=3;slider(c,'점 개수',1,4,1,N,function(v){N=v;run();return v+'개';});
  var memo={};function cnt(n){if(memo[n])return memo[n];var subs=subsets(n),full=(1<<n)-1,c=0,mx=0,mn=99;
    var K=1<<subs.length;for(var mask=0;mask<K;mask++){if(!(mask&1)||!(mask>>full&1))continue;var T=[];for(var i=0;i<subs.length;i++)if(mask>>i&1)T.push(i);
      var S={},ok=true;T.forEach(function(m){S[m]=1;});for(var i2=0;i2<T.length&&ok;i2++)for(var j=0;j<T.length;j++){if(!S[T[i2]|T[j]]||!S[T[i2]&T[j]]){ok=false;break;}}
      if(ok){c++;mx=Math.max(mx,T.length);mn=Math.min(mn,T.length);}}
    return memo[n]={c:c,mx:mx,mn:mn,cand:K};}
  function run(){var r=cnt(N);ou.innerHTML='<p>점 '+N+'개 집합에서 부분집합 모음은 모두 2^(2^'+N+') = '+r.cand.toLocaleString()+'가지. 그중 세 규칙을 다 지키는 위상은 <b>'+r.c+'가지</b>.</p><p>열린 집합이 가장 적은 위상: '+r.mn+'개 (밀착) · 가장 많은 위상: '+r.mx+'개 (이산 = 2^'+N+')</p>';}
  run();
};

/* 분리: 수직선 위 집합을 자르는 자리 */
W.separate=function(el,o){
  var s=svg(el,640,140,'수직선 위의 집합과 자르는 자리'),sets={two:[[0,1],[2,3]],one:[[0,3]],dots:[[0,0],[0.6,0.6],[1.2,1.2],[1.8,1.8],[2.4,2.4],[3,3]]},cur=o.start||'two',cut=1.5;
  var c=ctrl(el);radio(c,'집합:',[['two','[0,1] ∪ [2,3]'],['one','[0,3] 한 덩어리'],['dots','떨어진 점 6개']],cur,function(v){cur=v;draw();});
  var c2=ctrl(el);slider(c2,'자르는 자리 c',0.05,2.95,0.05,cut,function(v){cut=v;draw();return v.toFixed(2);});
  var ou=out(el);function X(v){return 60+v*170;}
  function draw(){s.innerHTML='';E('line',{x1:20,y1:70,x2:620,y2:70,stroke:C.rule,'stroke-width':2},s);
    sets[cur].forEach(function(p){if(p[0]===p[1])E('circle',{cx:X(p[0]),cy:70,r:8,fill:p[0]<cut?C.b:C.m},s);else E('line',{x1:X(p[0]),y1:70,x2:X(p[1]),y2:70,stroke:C.g,'stroke-width':10},s);});
    E('line',{x1:X(cut),y1:30,x2:X(cut),y2:110,stroke:C.r,'stroke-width':2,'stroke-dasharray':'5 4'},s);tx(s,X(cut)+4,28,'c='+cut.toFixed(2),{fill:C.r});
    [0,1,2,3].forEach(function(v){tx(s,X(v)-4,130,String(v),{fill:C.mu});});
    var hit=sets[cur].some(function(p){return p[0]<cut&&cut<p[1]||Math.abs(p[0]-cut)<1e-9;});
    var L=sets[cur].some(function(p){return p[0]<cut;}),R=sets[cur].some(function(p){return p[1]>cut;});
    var good=!hit&&L&&R;
    ou.innerHTML=good?'<p class="g"><b>분리 성공.</b> 자르는 선이 집합을 건드리지 않아서, 왼쪽 무리와 오른쪽 무리가 각각 「그 집합 안에서 열린」 두 덩어리가 됐어요. 이 집합은 연결되어 있지 않아요.</p>':hit?'<p class="r">자르는 선이 집합 위를 지나요. 잘린 자리의 점은 어느 쪽에 넣어도 그 쪽이 열린 덩어리가 되지 않아요.</p>':'<p class="a">한쪽이 비었어요. 분리는 비어 있지 않은 두 덩어리가 필요해요.</p>';
    if(cur==='one')ou.innerHTML+='<p class="m">[0,3]은 어디를 잘라도 실패해요 → <b>연결</b>되어 있습니다.</p>';
    if(cur==='dots')ou.innerHTML+='<p class="m">이산 공간의 점들은 점 사이 어디를 잘라도 성공해요 → 점 하나짜리 덩어리만 연결 (완전히 끊김).</p>';}
  draw();
};

/* 구멍 피하기: 평면에서 구멍(점) 여러 개를 피해 꺾은선으로 잇기 */
function holesData(n,seed){var R=LAB.rng(seed),a=[];for(var i=0;i<n;i++)a.push({x:40+R()*560,y:20+R()*300});return a;}
function segHit(P,Q,h,r){var dx=Q.x-P.x,dy=Q.y-P.y,L=dx*dx+dy*dy;var t=Math.max(0,Math.min(1,((h.x-P.x)*dx+(h.y-P.y)*dy)/L));var x=P.x+t*dx-h.x,y=P.y+t*dy-h.y;return x*x+y*y<r*r;}
function pathHits(P,B,Q,H,r){var c=0;H.forEach(function(h){if(segHit(P,B,h,r)||segHit(B,Q,h,r))c++;});return c;}
W.holes=function(el,o){
  var n=o.n||150,r=o.r||2.2,Hs=holesData(n,o.seed||11),P={x:30,y:170},Q={x:610,y:170},B={x:320,y:60};
  var s=svg(el,640,340,'평면 위 구멍들과 두 점을 잇는 꺾은선'),ou=out(el),drag=false;
  var c=ctrl(el);btn(c,'곧은 길로 되돌리기',function(){B={x:320,y:170};draw();});btn(c,'자동으로 빈 길 찾기',function(){for(var k=0;k<400;k++){var cand={x:320,y:10+k*0.8};if(pathHits(P,cand,Q,Hs,r)===0){B=cand;break;}}draw();});
  function pos(e){var q=s.getBoundingClientRect();return {x:(e.clientX-q.left)*640/q.width,y:(e.clientY-q.top)*340/q.height};}
  s.addEventListener('pointerdown',function(e){drag=true;B=pos(e);draw();s.setPointerCapture&&s.setPointerCapture(e.pointerId);});
  s.addEventListener('pointermove',function(e){if(drag){B=pos(e);draw();}});s.addEventListener('pointerup',function(){drag=false;});
  function draw(){s.innerHTML='';Hs.forEach(function(h){E('circle',{cx:h.x,cy:h.y,r:Math.max(1.6,r),fill:'#fff',stroke:C.mu,'stroke-width':1},s);});
    var k=pathHits(P,B,Q,Hs,r);E('polyline',{points:P.x+','+P.y+' '+B.x+','+B.y+' '+Q.x+','+Q.y,fill:'none',stroke:k?C.r:C.g,'stroke-width':3},s);
    [[P,'P'],[Q,'Q']].forEach(function(z){E('circle',{cx:z[0].x,cy:z[0].y,r:7,fill:C.b},s);tx(s,z[0].x-4,z[0].y-12,z[1],{fill:C.b,'font-weight':700});});
    E('circle',{cx:B.x,cy:B.y,r:9,fill:'#fff',stroke:C.a,'stroke-width':3},s);
    ou.innerHTML='<p>구멍 '+n+'개 · 꺾는 점(노란 동그라미)을 끌거나 그림을 눌러 옮기세요.</p><p class="'+(k?'r':'g')+'">'+(k?'이 길은 구멍 '+k+'개에 걸려요.':'<b>구멍을 하나도 밟지 않는 길</b>을 찾았어요. 꺾는 자리를 조금 바꾸면 길이 또 생겨요.')+'</p>';}
  draw();
};
DUELS.holes=function(){var Hs=holesData(1000,29),P={x:30,y:170},Q={x:610,y:170},ok=0,tot=0;for(var y=-400;y<=740;y+=2){tot++;if(pathHits(P,{x:320,y:y},Q,Hs,0.3)===0)ok++;}
  return {fly:ok>0,robo:ok===0,report:'구멍 1,000개를 뿌리고, 꺾는 점을 세로로 '+tot+'곳에 놓아 봤어요. 구멍을 하나도 안 밟는 길이 <b>'+ok+'개</b> 나왔습니다.'};};

/* 덮개: (0,1)을 (1/n,1)로 덮기 vs [0,1]에는 0을 덮는 우산이 꼭 필요 */
W.cover01=function(el,o){
  var s=svg(el,640,200,'0과 1 사이를 덮는 우산(구간)들'),N=o.N||5,closedSet=!!o.closed;
  var c=ctrl(el);slider(c,'우산 개수 n',2,100,1,N,function(v){N=v;draw();return v+'개';});
  var c2=ctrl(el);radio(c2,'덮을 집합:',[['open','(0, 1) — 양끝 빠짐'],['closed','[0, 1] — 양끝 포함']],closedSet?'closed':'open',function(v){closedSet=v==='closed';draw();});
  var ou=out(el);function X(v){return 50+v*540;}
  function draw(){s.innerHTML='';var top=closedSet?1.08:1;
    E('line',{x1:X(0),y1:172,x2:X(1),y2:172,stroke:C.k,'stroke-width':4},s);
    E('circle',{cx:X(0),cy:172,r:6,fill:closedSet?C.k:'#fff',stroke:C.k,'stroke-width':2},s);E('circle',{cx:X(1),cy:172,r:6,fill:closedSet?C.k:'#fff',stroke:C.k,'stroke-width':2},s);
    tx(s,X(0)-4,194,'0');tx(s,X(1)-4,194,'1');
    for(var k=2;k<=Math.min(N,14);k++){var y=12+(k-2)*10;E('line',{x1:X(1/k),y1:y,x2:X(top),y2:y,stroke:C.b,'stroke-width':6,opacity:.45},s);}
    if(N>14)tx(s,X(0.45),164,'… 우산 '+(N-13)+'개 더',{fill:C.mu});
    if(closedSet){E('line',{x1:X(-0.08),y1:152,x2:X(0.1),y2:152,stroke:C.a,'stroke-width':8},s);tx(s,X(-0.06),144,'0을 덮는 우산',{fill:C.a,'font-size':12});}
    if(!closedSet){E('rect',{x:X(0),y:164,width:540/N,height:16,fill:'rgba(201,48,44,.28)'},s);
      ou.innerHTML='<p>우산 '+N+'개가 덮은 곳: (1/'+N+', 1). 아직 못 덮은 곳: <b>(0, '+(1/N).toFixed(4)+']</b> — 길이 '+(1/N).toFixed(4)+'.</p><p class="r">n을 아무리 키워도 0 바로 옆이 남아요. 이 우산 모음에서는 유한 개를 골라 (0, 1)을 다 덮을 수 없어요 → <b>(0, 1)은 콤팩트가 아님</b>.</p>';}
    else{var need=N>=10;if(!need)E('rect',{x:X(0.1),y:164,width:(1/N-0.1)*540,height:16,fill:'rgba(201,48,44,.28)'},s);
      ou.innerHTML='<p>[0, 1]을 덮으려면 0을 담은 우산(−0.08, 0.1)이 반드시 모음에 있어야 해요. 그 우산이 0 근처를 통째로 덮어 줍니다.</p>'+(need?'<p class="g"><b>유한 개로 다 덮었어요:</b> 0 쪽 우산 1개 + (1/10, 1.08) 우산 1개 = <b>2개</b>면 충분해요. 닫힌 구간 [0, 1]은 어떤 우산 모음이 와도 이렇게 유한 개만 골라낼 수 있어요 → 콤팩트.</p>':'<p class="a">남은 틈 [0.1, '+(1/N).toFixed(3)+']. n을 10 이상으로 올려 보세요.</p>');}
  }
  draw();
};
DUELS.cover01=function(){var N=100,g=1/N;return {fly:g>0,robo:g<=0,report:'(1/2, 1), (1/3, 1), …, (1/100, 1) 우산 99개를 합치면 (1/100, 1). 못 덮은 곳은 (0, 0.01] — 길이 <b>0.01</b>이 남았어요.'};};

/* 반으로 자르기: 닫힌 상자 안의 무한히 많은 점 */
W.bisect=function(el,o){
  var s=svg(el,360,360,'정사각형을 반씩 잘라 점이 많이 모인 쪽을 따라가는 그림'),R=LAB.rng(5),pts=[],k=0,box;
  for(var i=0;i<600;i++){var t=R(),a=R()*6.283,rr=Math.pow(R(),2)*0.35;pts.push({x:0.62+rr*Math.cos(a)*0.9,y:0.31+rr*Math.sin(a)*0.7});}
  pts=pts.map(function(p){return {x:Math.min(.999,Math.max(0,p.x)),y:Math.min(.999,Math.max(0,p.y))};});
  var c=ctrl(el);btn(c,'한 번 더 4등분',function(){if(k<8){k++;step();draw();}});btn(c,'처음으로',function(){k=0;box={x:0,y:0,w:1};draw();});
  var ou=out(el);box={x:0,y:0,w:1};
  function cnt(b){return pts.filter(function(p){return p.x>=b.x&&p.x<b.x+b.w&&p.y>=b.y&&p.y<b.y+b.w;}).length;}
  function step(){var h=box.w/2,best=null,bc=-1;[[0,0],[h,0],[0,h],[h,h]].forEach(function(d){var b={x:box.x+d[0],y:box.y+d[1],w:h},c2=cnt(b);if(c2>bc){bc=c2;best=b;}});box=best;}
  function draw(){s.innerHTML='';E('rect',{x:10,y:10,width:340,height:340,fill:'#fff',stroke:C.k,'stroke-width':2},s);
    pts.forEach(function(p){E('circle',{cx:10+p.x*340,cy:10+p.y*340,r:1.6,fill:C.mu},s);});
    E('rect',{x:10+box.x*340,y:10+box.y*340,width:Math.max(1,box.w*340),height:Math.max(1,box.w*340),fill:'rgba(19,115,58,.15)',stroke:C.g,'stroke-width':2},s);
    ou.innerHTML='<p>'+k+'번 4등분 → 상자 한 변 1/'+Math.pow(2,k)+' = <b>'+box.w.toFixed(4)+'</b>. 이 상자 안의 점 '+cnt(box)+'개 (전체 600개).</p><p class="g">점이 가장 많이 모인 조각을 고르며 계속 자르면, 상자들이 한 점으로 모여요. 그 점은 처음 큰 상자의 테두리까지 포함한 [0,1]² 안에 있어요. 테두리를 뺀 상자라면 그 점이 상자 밖(테두리 위)일 수 있어요.</p>';}
  draw();
};
})();
