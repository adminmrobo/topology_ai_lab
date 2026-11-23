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

/* 위젯 모음 2: 픽셀·순서 공간 + 기둥 2 (작용 · 등급 · 타일) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx;

/* 픽셀 연결 역설: 마름모 고리, 검은 픽셀·흰 픽셀의 이웃 규칙 */
function ring(N,k){var c=(N-1)/2,b={};for(var y=0;y<N;y++)for(var x=0;x<N;x++)if(Math.abs(x-c)+Math.abs(y-c)===k)b[x+','+y]=1;return b;}
function comps(N,cells,adj){var seen={},list=[];cells.forEach(function(p){var k=p[0]+','+p[1];if(seen[k])return;var q=[p],cnt=0,mem=[];seen[k]=1;
  while(q.length){var a=q.pop();cnt++;mem.push(a);[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(d){var nx=a[0]+d[0],ny=a[1]+d[1],nk=nx+','+ny;
    if(seen[nk]||!cells.some(function(z){return z[0]===nx&&z[1]===ny;}))return;if(!adj(a,[nx,ny],d))return;seen[nk]=1;q.push([nx,ny]);});}list.push(mem);});return list;}
function analyze(N,B,mode){
  var black=[],white=[];for(var y=0;y<N;y++)for(var x=0;x<N;x++)(B[x+','+y]?black:white).push([x,y]);
  function pure(p){return (p[0]%2)===(p[1]%2);}
  var adjB,adjW;
  if(mode==='kh'){var kh=function(a,b,d){return d[0]===0||d[1]===0||(pure(a)&&pure(b));};adjB=kh;adjW=kh;}
  else{var f=function(k){return function(a,b,d){return k===8||d[0]===0||d[1]===0;};};adjB=f(mode[0]==='8'?8:4);adjW=f(mode[1]==='8'?8:4);}
  var bc=comps(N,black,adjB),wc=comps(N,white,adjW);
  var c=(N-1)/2,inside=wc.filter(function(m){return m.some(function(p){return p[0]===c&&p[1]===c;});})[0]||[];
  var leaks=inside.some(function(p){return p[0]===0||p[1]===0||p[0]===N-1||p[1]===N-1;});
  return {black:bc.length,white:wc.length,leaks:leaks,inside:inside,bc:bc};}
window.PIX={ring:ring,analyze:analyze};
W.pixel=function(el,o){
  var N=o.N||11,B=ring(N,o.k||4),mode=o.mode||'44',s=svg(el,440,440,'픽셀 그림판: 검은 고리와 흰 바탕');
  var c=ctrl(el);radio(c,'이웃 규칙 (검은 선 / 흰 바탕):',(o.kh?[['44','4 / 4'],['88','8 / 8'],['84','8 / 4'],['kh','칼림스키']]:[['44','4 / 4'],['88','8 / 8'],['84','8 / 4'],['48','4 / 8']]),mode,function(v){mode=v;draw();});
  var c2=ctrl(el);btn(c2,'마름모 고리로 되돌리기',function(){B=ring(N,o.k||4);draw();});H('span','note','픽셀을 누르면 검은색·흰색이 바뀌어요.',c2);
  var ou=out(el),cs=400/N;
  s.addEventListener('pointerdown',function(e){var r=s.getBoundingClientRect(),x=Math.floor(((e.clientX-r.left)*440/r.width-20)/cs),y=Math.floor(((e.clientY-r.top)*440/r.height-20)/cs);if(x<0||y<0||x>=N||y>=N)return;var k=x+','+y;B[k]=!B[k];if(!B[k])delete B[k];draw();});
  function draw(){s.innerHTML='';var A=analyze(N,B,mode),ins={};A.inside.forEach(function(p){ins[p[0]+','+p[1]]=1;});
    for(var y=0;y<N;y++)for(var x=0;x<N;x++){var k=x+','+y,pure=(x%2)===(y%2);
      E('rect',{x:20+x*cs,y:20+y*cs,width:cs-1,height:cs-1,fill:B[k]?C.k:ins[k]?(A.leaks?'rgba(201,48,44,.25)':'rgba(19,115,58,.22)'):'#fff',stroke:C.rule},s);
      if(mode==='kh'){var tpe=(x%2===1&&y%2===1)?'열':(x%2===0&&y%2===0)?'닫':'';if(tpe)tx(s,20+x*cs+cs/2-6,20+y*cs+cs/2+5,tpe,{'font-size':11,fill:B[k]?'#fff':C.mu});}}
    var ringOk=A.black===1,sep=!A.leaks;
    var nm=mode==='kh'?'칼림스키 규칙':'검은 선 '+mode[0]+'-이웃 / 흰 바탕 '+mode[1]+'-이웃';
    ou.innerHTML='<p><b>'+nm+'</b> → 검은 고리 덩어리 '+A.black+'개, 흰 바탕 덩어리 '+A.white+'개</p>'+
      '<p class="'+(ringOk?'g':'r')+'">고리가 '+(ringOk?'한 줄로 이어져 있어요.':'여러 조각으로 끊겨 보여요.')+'</p>'+
      '<p class="'+(sep?'g':'r')+'">고리 안쪽(색칠한 곳)이 '+(sep?'바깥과 막혀 있어요.':'대각선 틈으로 바깥과 이어져요.')+'</p>'+
      ((ringOk&&sep)?'<p class="g"><b>모순 없음:</b> 이어진 닫힌 고리가 안과 밖을 나눕니다. 종이 위의 원과 같은 결과예요.</p>':(!ringOk&&sep)?'<p class="r"><b>역설:</b> 고리가 끊겨 있는데도 안과 밖이 막혀 있어요.</p>':(ringOk&&!sep)?'<p class="r"><b>역설:</b> 고리는 이어져 있는데 안쪽이 새어 나가요.</p>':'<p class="a">고리도 끊기고 안쪽도 새요.</p>');}
  draw();
};
DUELS.pixel=function(){var N=11,B=ring(N,4),a=analyze(N,B,'88'),k=analyze(N,B,'kh');
  var good=function(r){return r.black===1&&!r.leaks;};
  return {fly:good(k),robo:good(a),report:'8/8 규칙: 고리 덩어리 '+a.black+'개, 안쪽 '+(a.leaks?'샘':'막힘')+'. 칼림스키 규칙: 고리 덩어리 '+k.black+'개, 안쪽 '+(k.leaks?'샘':'막힘')+'.'};};

/* 칼림스키 직선: 홀수 = 열린 점, 짝수 = 닫힌 점 */
W.khline=function(el,o){
  var s=svg(el,640,170,'정수 −6부터 6까지의 칼림스키 직선'),sel=0,ou;
  function X(n){return 320+n*46;}
  function draw(){s.innerHTML='';for(var n=-6;n<6;n++){var up=(n%2!==0),y1=up?50:110,y2=(n+1)%2!==0?50:110;E('line',{x1:X(n),y1:y1,x2:X(n+1),y2:y2,stroke:C.rule,'stroke-width':3},s);}
    var nb=Math.abs(sel%2)===1?[sel]:[sel-1,sel,sel+1];
    for(var n2=-6;n2<=6;n2++){var odd=Math.abs(n2%2)===1,y=odd?50:110,on=nb.indexOf(n2)>=0;
      var g=E('g',{tabindex:0,role:'button','aria-label':'점 '+n2},s);E('circle',{cx:X(n2),cy:y,r:14,fill:on?C.g:(odd?'#fff':C.k),stroke:on?C.g:C.k,'stroke-width':2},g);
      tx(g,X(n2)-(n2<0?9:4),y+(odd?-22:34),String(n2),{fill:C.k});
      (function(v){g.addEventListener('click',function(){sel=v;draw();});g.addEventListener('keydown',function(e){if(e.key==='Enter'){sel=v;draw();}});})(n2);}
    ou.innerHTML='<p>점 <b>'+sel+'</b>을 눌렀어요. '+(Math.abs(sel%2)===1?'홀수 = <b>열린 점</b>. 가장 작은 이웃이 {'+sel+'} 자기 자신 하나뿐이에요.':'짝수 = <b>닫힌 점</b>. 가장 작은 이웃이 {'+(sel-1)+', '+sel+', '+(sel+1)+'} — 양옆 홀수까지 데려와요.')+'</p><p class="note">위쪽 줄은 홀수(열린 점), 아래쪽 줄은 짝수(닫힌 점). 지그재그 선은 「바로 옆이라 붙어 있음」을 뜻해요.</p>';}
  ou=out(el);draw();
};

/* 순서 그림(하세 그림): 위로 닫힌 집합 = 열린 집합 */
W.poset=function(el,o){
  var P=o.P||{nodes:[['a',80,40],['b',200,40],['c',320,40],['d',140,130],['e',260,130]],up:[['d','a'],['d','b'],['e','b'],['e','c']]};
  var s=svg(el,400,180,'점들의 위아래 순서 그림'),on={},ou;
  var c=ctrl(el);btn(c,'모두 끄기',function(){on={};draw();});btn(c,'열린 집합 모두 세기',function(){countAll();});
  function above(x){var r=[x],q=[x];while(q.length){var a=q.pop();P.up.forEach(function(e){if(e[0]===a&&r.indexOf(e[1])<0){r.push(e[1]);q.push(e[1]);}});}return r;}
  function isUp(S){return S.every(function(x){return above(x).every(function(y){return S.indexOf(y)>=0;});});}
  function countAll(){var ns=P.nodes.map(function(n){return n[0];}),k=0,list=[];for(var m=0;m<(1<<ns.length);m++){var S=ns.filter(function(_,i){return m>>i&1;});if(isUp(S)){k++;list.push(S.length?'{'+S.join(',')+'}':'∅');}}
    ou.innerHTML='<p>위로 닫힌 집합(= 열린 집합)은 모두 <b>'+k+'개</b>: '+list.join(' ')+'</p>';}
  function draw(){s.innerHTML='';var pos={};P.nodes.forEach(function(n){pos[n[0]]=n;});
    P.up.forEach(function(e){var a=pos[e[0]],b=pos[e[1]];E('line',{x1:a[1],y1:a[2],x2:b[1],y2:b[2],stroke:C.mu,'stroke-width':2},s);});
    var S=Object.keys(on).filter(function(k){return on[k];});
    P.nodes.forEach(function(n){var g=E('g',{tabindex:0,role:'button','aria-label':'점 '+n[0]},s);E('circle',{cx:n[1],cy:n[2],r:18,fill:on[n[0]]?C.g:'#fff',stroke:C.k,'stroke-width':2},g);tx(g,n[1]-5,n[2]+5,n[0],{fill:on[n[0]]?'#fff':C.k,'font-weight':700});
      g.addEventListener('click',function(){on[n[0]]=!on[n[0]];draw();});g.addEventListener('keydown',function(e){if(e.key==='Enter'){on[n[0]]=!on[n[0]];draw();}});});
    var ok=isUp(S),miss=[];S.forEach(function(x){above(x).forEach(function(y){if(S.indexOf(y)<0&&miss.indexOf(y)<0)miss.push(y);});});
    ou.innerHTML='<p>고른 점: '+(S.length?'{'+S.join(', ')+'}':'없음 (∅)')+'</p><p class="'+(ok?'g':'r')+'">'+(ok?'<b>위로 닫혀 있어요</b> — 고른 점의 위쪽 점이 모두 들어 있어요. 이 집합은 열린 집합입니다.':'위쪽 점 '+miss.join(', ')+'이 빠졌어요. 열린 집합이 되려면 위쪽으로 이어진 점을 모두 데려와야 해요.')+'</p>';}
  ou=out(el);draw();
};
DUELS.khseg=function(){var ns=['0','1','2'],up=[['0','1'],['2','1']];function above(x){var r=[x];up.forEach(function(e){if(e[0]===x)r.push(e[1]);});return r;}var k=0;for(var m=0;m<8;m++){var S=ns.filter(function(_,i){return m>>i&1;});if(S.every(function(x){return above(x).every(function(y){return S.indexOf(y)>=0;});}))k++;}
  return {fly:k===5,robo:k===8,report:'칼림스키 직선 조각 {0, 1, 2}에서 위로 닫힌 집합을 하나씩 세어 보니 ∅, {1}, {0,1}, {1,2}, {0,1,2} — <b>'+k+'개</b>예요.'};};

/* 작용: 수직선 평행이동 / 정사각형 회전 / 수직선을 원으로 감기 */
W.action=function(el,o){
  var mode=o.mode||'line',st={x:0.3,step:1,p:{x:250,y:120},t:0.5};
  var s=svg(el,640,mode==='rot4'?300:200,'군의 작용 그림'),ou;
  var c=ctrl(el);
  if(mode==='line'){slider(c,'점 x',-1,1,0.05,st.x,function(v){st.x=v;draw();return v.toFixed(2);});radio(c,'도장 한 번의 걸음:',[[1,'1 (정수 ℤ)'],[2,'2 (짝수만)'],[0.5,'0.5']],1,function(v){st.step=+v;draw();});}
  if(mode==='rot4'){H('span','note','그림을 눌러 점을 옮기세요. 가운데를 누르면 무슨 일이 생길까요?',c);btn(c,'점을 한가운데로',function(){st.p={x:320,y:150};draw();});}
  if(mode==='wrap'){slider(c,'감기 정도',0,1,0.01,st.t,function(v){st.t=v;draw();return Math.round(v*100)+'%';});}
  ou=out(el);
  if(mode==='rot4')s.addEventListener('pointerdown',function(e){var r=s.getBoundingClientRect();st.p={x:(e.clientX-r.left)*640/r.width,y:(e.clientY-r.top)*300/r.height};draw();});
  function draw(){s.innerHTML='';
    if(mode==='line'){var X=function(v){return 320+v*60;};E('line',{x1:10,y1:100,x2:630,y2:100,stroke:C.mu,'stroke-width':2},s);
      for(var n=-5;n<=5;n++)tx(s,X(n)-4,130,String(n),{fill:C.mu,'font-size':11});
      var pts=[];for(var k=-12;k<=12;k++){var v=st.x+k*st.step;if(v>-5.2&&v<5.2)pts.push(v);}
      pts.forEach(function(v){E('circle',{cx:X(v),cy:100,r:v===st.x?9:6,fill:v===st.x?C.r:C.b},s);});
      ou.innerHTML='<p>빨간 점 x = '+st.x.toFixed(2)+'에 「'+st.step+'만큼 옮기기」 도장을 여러 번(앞뒤로) 찍은 자리들 = <b>궤도</b>. 화면 안에 '+pts.length+'개가 보여요.</p><p class="g">점들 사이가 '+st.step+'씩 띄엄띄엄 → 도장 무리가 「이산적」이에요. 아무리 가까이 봐도 궤도 점이 다닥다닥 몰리지 않아요.</p>';}
    if(mode==='rot4'){var cx=320,cy=150;E('rect',{x:cx-130,y:cy-130,width:260,height:260,fill:'#fff',stroke:C.k,'stroke-width':2},s);E('circle',{cx:cx,cy:cy,r:4,fill:C.k},s);
      var dx=st.p.x-cx,dy=st.p.y-cy,cen=Math.hypot(dx,dy)<6,orb=[];for(var r=0;r<4;r++){var a=r*Math.PI/2,x=cx+dx*Math.cos(a)-dy*Math.sin(a),y=cy+dx*Math.sin(a)+dy*Math.cos(a);orb.push([x,y]);}
      orb.forEach(function(p,i){E('circle',{cx:p[0],cy:p[1],r:i?7:9,fill:i?C.b:C.r},s);if(i)E('line',{x1:cx,y1:cy,x2:p[0],y2:p[1],stroke:C.rule,'stroke-dasharray':'3 3'},s);});
      ou.innerHTML=cen?'<p class="r"><b>한가운데 점:</b> 0°, 90°, 180°, 270° 도장 4개가 모두 이 점을 제자리에 둬요. 안정자(제자리 도장 모음)의 크기 = <b>4</b>, 궤도 크기 = 1.</p><p class="a">제자리에 머무는 점이 있으니 이 작용은 「자유 작용」이 아니에요.</p>':'<p>빨간 점을 90°씩 돌린 자리 4곳이 궤도예요. 안정자 = {0° 회전} 하나뿐 → 크기 <b>1</b>, 궤도 크기 4.</p><p class="g">궤도 크기 × 안정자 크기 = 4 × 1 = 4 = 도장 전체 개수.</p>';}
    if(mode==='wrap'){var t=st.t,R=70,cx2=320,cy2=100,L=3;
      for(var i=0;i<=300;i++){}
      var pts2=[];for(var j=0;j<=300;j++){var u=j/300*L,ang=u*2*Math.PI-Math.PI/2,xs=320+(u-1.5)*180,ys=170;var xc=cx2+R*Math.cos(ang)*(1+0.08*u),yc=cy2+R*Math.sin(ang)*(1+0.08*u);pts2.push([xs*(1-t)+xc*t,ys*(1-t)+yc*t]);}
      E('polyline',{points:pts2.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' '),fill:'none',stroke:C.b,'stroke-width':3},s);
      [0,1,2,3].forEach(function(k){var p=pts2[k*100];E('circle',{cx:p[0],cy:p[1],r:6,fill:C.r},s);tx(s,p[0]+6,p[1]-6,String(k),{fill:C.r});});
      [0.4,1.4,2.4].forEach(function(u){var p=pts2[Math.round(u*100)];E('circle',{cx:p[0],cy:p[1],r:5,fill:C.g},s);});
      ou.innerHTML='<p>수직선 [0, 3]을 둘레 1인 원에 감고 있어요. 감기 '+Math.round(t*100)+'%.</p><p class="g">다 감으면 0·1·2·3(빨강)이 한 점에, 0.4·1.4·2.4(초록)가 한 점에 모여요. 「1만큼 옮기기」 도장으로 서로 이어지는 점들을 한 점으로 본 결과 = <b>몫공간 ℝ/ℤ = 원</b>.</p>';}
  }
  draw();
};
DUELS.rot4=function(){var fixed=0;for(var r=0;r<4;r++)fixed++;return {fly:true,robo:false,report:'한가운데 점에 0°, 90°, 180°, 270° 도장을 차례로 찍어 보니 <b>4개 모두</b> 점을 제자리에 뒀어요. 안정자 크기 4.'};};

/* 운반자 집합: A를 몇 번 옮기면 B와 겹치나 */
W.transporter=function(el,o){
  var s=svg(el,640,150,'구간 A와 B, 그리고 A를 옮긴 자리들'),A=[0,0.6],B=[2.2,3.4],ou;
  var c=ctrl(el);slider(c,'A의 길이',0.1,3,0.1,0.6,function(v){A=[0,v];draw();return v.toFixed(1);});slider(c,'B의 길이',0.1,4,0.1,1.2,function(v){B=[2.2,2.2+v];draw();return v.toFixed(1);});
  ou=out(el);function X(v){return 320+v*50;}
  function draw(){s.innerHTML='';E('line',{x1:10,y1:110,x2:630,y2:110,stroke:C.mu},s);for(var n=-6;n<=6;n++)tx(s,X(n)-4,136,String(n),{fill:C.mu,'font-size':11});
    E('line',{x1:X(B[0]),y1:110,x2:X(B[1]),y2:110,stroke:C.m,'stroke-width':10},s);tx(s,X(B[0]),96,'B',{fill:C.m,'font-weight':700});
    var hits=[];for(var n2=-60;n2<=60;n2++){if(A[0]+n2<=B[1]&&A[1]+n2>=B[0])hits.push(n2);}
    for(var n3=-6;n3<=6;n3++){var y=20+((n3+6)%4)*14,h=hits.indexOf(n3)>=0;E('line',{x1:X(A[0]+n3),y1:y,x2:X(A[1]+n3),y2:y,stroke:n3===0?C.b:h?C.g:C.rule,'stroke-width':n3===0?7:5},s);}
    tx(s,X(0),16,'A',{fill:C.b,'font-weight':700});
    ou.innerHTML='<p>「n만큼 옮기기」 도장 중 A를 B와 겹치게 만드는 n = <b>{'+hits.join(', ')+'}</b> → <b>'+hits.length+'개</b> (초록 막대).</p><p class="g">A와 B가 유한한 길이인 한, 겹치게 하는 도장은 늘 유한 개예요. 이 작용은 얌전합니다(고유 불연속).</p>';}
  draw();
};

/* 카드 묶음(층·단계 설명용): o.cards=[[제목, 내용], ...] */
W.cards=function(el,o){
  var c=ctrl(el),box=H('div','insight',null,el),bs;box.setAttribute('aria-live','polite');
  bs=o.cards.map(function(cd,i){return btn(c,cd[0],function(b){bs.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});box.innerHTML=cd[1];},i===0);});
  box.innerHTML=o.cards[0][1];
};

/* 카포비치 반례: (x, y) → (2x, y/2) */
W.kapovich=function(el,o){
  var s=svg(el,620,360,'평면에서 (x, y)를 (2x, y/2)로 보내는 도장과 두 동그라미'),r=0.3,K=6,ou;
  var c=ctrl(el);slider(c,'동그라미 반지름',0.05,0.5,0.01,r,function(v){r=v;draw();return v.toFixed(2);});slider(c,'살펴볼 도장 수',1,30,1,K,function(v){K=v;draw();return v+'개';});
  ou=out(el);var S=150;function X(v){return 60+v*S;}function Y(v){return 320-v*S;}
  function draw(){s.innerHTML='';E('line',{x1:20,y1:Y(0),x2:600,y2:Y(0),stroke:C.mu},s);E('line',{x1:X(0),y1:340,x2:X(0),y2:10,stroke:C.mu},s);
    E('circle',{cx:X(0),cy:Y(0),r:5,fill:'#fff',stroke:C.r,'stroke-width':2},s);tx(s,X(0)+6,Y(0)+16,'원점(빠짐)',{fill:C.r,'font-size':11});
    [0.25,0.5,1,2].forEach(function(cc){var pts=[];for(var x=cc/2;x<=3.6;x+=0.02){var y=cc/x;if(y<=2)pts.push(X(x).toFixed(1)+','+Y(y).toFixed(1));}E('polyline',{points:pts.join(' '),fill:'none',stroke:C.rule,'stroke-width':1.5},s);});
    E('circle',{cx:X(1),cy:Y(0),r:r*S,fill:'rgba(30,85,200,.12)',stroke:C.b,'stroke-width':2},s);tx(s,X(1)+r*S+4,Y(0)-6,'U: (1,0) 둘레',{fill:C.b,'font-size':12});
    E('circle',{cx:X(0),cy:Y(1),r:r*S,fill:'rgba(155,63,181,.12)',stroke:C.m,'stroke-width':2},s);tx(s,X(0)+r*S+4,Y(1)-r*S,'V: (0,1) 둘레',{fill:C.m,'font-size':12});
    var cnt=0;for(var n=-1;n>=-K;n--){var b=Math.pow(2,n);if(b>=r)continue;cnt++;var p=[1,b],q=[Math.pow(2,n),1];
      E('circle',{cx:X(p[0]),cy:Y(p[1]),r:3.5,fill:C.b},s);E('circle',{cx:X(q[0]),cy:Y(q[1]),r:3.5,fill:C.m},s);
      if(cnt<=4)E('path',{d:'M'+X(p[0])+' '+Y(p[1])+' Q '+X(0.7)+' '+Y(0.7)+' '+X(q[0])+' '+Y(q[1]),fill:'none',stroke:C.g,'stroke-width':1.2,'stroke-dasharray':'4 3'},s);}
    ou.innerHTML='<p>U 안의 점 (1, 2ⁿ)에 도장 gⁿ을 찍으면 (2ⁿ, 1) — V 안으로 들어가요 (n = −1, −2, −3, …).</p><p>지금 반지름 '+r.toFixed(2)+'에서, 살펴본 도장 '+K+'개 중 U를 V와 겹치게 하는 도장: <b>'+cnt+'개</b>.</p><p class="r">도장 수를 늘리면 이 개수도 끝없이 늘어나요. 반지름을 줄여도 마찬가지 — 그래서 몫공간에서 두 점 (1,0)과 (0,1)의 궤도를 떼어 놓을 수 없어요(하우스도르프가 아님).</p>';}
  draw();
};
DUELS.kapovich=function(){var r=0.05,c=0;for(var n=-1;n>=-60;n--)if(Math.pow(2,n)<r)c++;return {fly:c>10,robo:c<=10,report:'반지름 0.05인 아주 작은 동그라미 U, V를 잡고 도장 n = −1 … −60을 검사했어요. 겹치게 하는 도장이 <b>'+c+'개</b> — 살펴볼 범위를 넓힐수록 계속 늘어나요.'};};

/* 격자: 타일(기본 영역) / 디리클레 영역 */
W.lattice=function(el,o){
  var mode=o.mode||'voronoi',st={s:o.s!=null?o.s:0.5,t:o.t!=null?o.t:0.87,p:{x:0.3,y:0.6}},cv=H('canvas',null,null,el),ou;
  cv.width=560;cv.height=400;cv.style.width='100%';cv.style.maxWidth='560px';cv.setAttribute('aria-label',mode==='tiles'?'정수 격자와 기본 영역':'격자 점과 원점의 디리클레 영역');
  var c=ctrl(el);
  if(mode==='voronoi'){slider(c,'두 번째 걸음 가로',-0.5,0.5,0.05,st.s,function(v){st.s=v;draw();return v.toFixed(2);});slider(c,'두 번째 걸음 세로',0.5,1.5,0.01,st.t,function(v){st.t=v;draw();return v.toFixed(2);});
    btn(c,'정사각형 격자',function(){st.s=0;st.t=1;sync();});btn(c,'벌집 격자',function(){st.s=0.5;st.t=0.87;sync();});}
  else{H('span','note','그림을 눌러 점을 고르면, 그 점의 궤도와 노란 타일 속 대표가 보여요.',c);cv.addEventListener('pointerdown',function(e){var r=cv.getBoundingClientRect();st.p={x:((e.clientX-r.left)*560/r.width-280)/70,y:-((e.clientY-r.top)*400/r.height-200)/70};draw();});}
  function sync(){var rs=el.querySelectorAll('input[type=range]');rs[0].value=st.s;rs[1].value=st.t;rs.forEach(function(x){x.oninput();});}
  ou=out(el);var S=70;
  function draw(){var g=cv.getContext('2d'),Wd=560,Hd=400;g.clearRect(0,0,Wd,Hd);g.fillStyle='#fff';g.fillRect(0,0,Wd,Hd);
    var a=[1,0],b=mode==='tiles'?[0,1]:[st.s,st.t],P=[];for(var i=-8;i<=8;i++)for(var j=-8;j<=8;j++)P.push([i*a[0]+j*b[0],i*a[1]+j*b[1]]);
    function sx(x){return 280+x*S;}function sy(y){return 200-y*S;}
    if(mode==='voronoi'){var img=g.createImageData(Wd,Hd);for(var py=0;py<Hd;py+=2)for(var px=0;px<Wd;px+=2){var x=(px-280)/S,y=(200-py)/S,best=1e9,bi=-1;
        for(var k=0;k<P.length;k++){var dx=x-P[k][0],dy=y-P[k][1],d=dx*dx+dy*dy;if(d<best){best=d;bi=k;}}
        var isO=P[bi][0]===0&&P[bi][1]===0,col=isO?[253,226,150]:((bi*7)%3===0?[238,242,246]:(bi%2?[246,248,250]:[231,237,243]));
        for(var dd=0;dd<4;dd++){var q=((py+(dd>>1))*Wd+px+(dd&1))*4;img.data[q]=col[0];img.data[q+1]=col[1];img.data[q+2]=col[2];img.data[q+3]=255;}}
      g.putImageData(img,0,0);}
    else{g.strokeStyle='#d5dbe2';for(var gx=-5;gx<=5;gx++){g.beginPath();g.moveTo(sx(gx),0);g.lineTo(sx(gx),Hd);g.stroke();}for(var gy=-3;gy<=3;gy++){g.beginPath();g.moveTo(0,sy(gy));g.lineTo(Wd,sy(gy));g.stroke();}
      g.fillStyle='rgba(253,226,150,.8)';g.fillRect(sx(0),sy(1),S,S);g.strokeStyle='#a35c00';g.lineWidth=2;g.strokeRect(sx(0),sy(1),S,S);g.lineWidth=1;}
    P.forEach(function(p){if(Math.abs(p[0])<5&&Math.abs(p[1])<3.2){g.fillStyle=(p[0]===0&&p[1]===0)?'#c9302c':'#16212b';g.beginPath();g.arc(sx(p[0]),sy(p[1]),3.5,0,7);g.fill();}});
    if(mode==='voronoi'){var cell=voro(P);g.strokeStyle='#a35c00';g.lineWidth=2.5;g.beginPath();cell.forEach(function(v,i){i?g.lineTo(sx(v[0]),sy(v[1])):g.moveTo(sx(v[0]),sy(v[1]));});g.closePath();g.stroke();g.lineWidth=1;
      var per=0;cell.forEach(function(v,i){var w=cell[(i+1)%cell.length];per+=Math.hypot(v[0]-w[0],v[1]-w[1]);});var area=Math.abs(a[0]*b[1]-a[1]*b[0]);
      ou.innerHTML='<p>노란 영역 = 원점(빨간 점)이 다른 격자 점보다 <b>가장 가까운</b> 곳들 = 디리클레 영역. 변의 개수 <b>'+cell.length+'</b>, 넓이 '+area.toFixed(3)+', 둘레 '+per.toFixed(3)+'.</p><p class="note">각 변은 원점과 이웃 격자 점을 잇는 선분의 수직이등분선 위에 있어요. 노란 조각을 격자 걸음만큼 옮겨 붙이면 평면 전체가 빈틈없이 덮여요.</p>';}
    else{var px2=st.p.x,py2=st.p.y,fx=px2-Math.floor(px2),fy=py2-Math.floor(py2);g.fillStyle='#1e55c8';for(var i2=-5;i2<=5;i2++)for(var j2=-3;j2<=3;j2++){g.beginPath();g.arc(sx(fx+i2),sy(fy+j2),4,0,7);g.fill();}
      g.fillStyle='#c9302c';g.beginPath();g.arc(sx(fx),sy(fy),7,0,7);g.fill();
      ou.innerHTML='<p>누른 점 ('+px2.toFixed(2)+', '+py2.toFixed(2)+')의 궤도(파란 점들)는 「가로·세로 정수만큼 옮기기」로 닿는 모든 자리예요.</p><p class="g">노란 타일 [0,1)×[0,1) 안에는 궤도 점이 <b>딱 하나</b> ('+fx.toFixed(2)+', '+fy.toFixed(2)+') 있어요. 그래서 노란 타일 하나가 평면 전체의 「대표 모음」이 됩니다.</p><p class="a">타일의 테두리까지 넣은 닫힌 정사각형이면 모서리의 점들이 두세 번 들어가요 — 그래서 실제로는 「안쪽은 한 번, 테두리는 몇 번」이 허용되는 기본 영역을 씁니다.</p>';}
  }
  function voro(P){var poly=[[-3,-3],[3,-3],[3,3],[-3,3]];P.forEach(function(p){if(p[0]===0&&p[1]===0)return;var nx=p[0],ny=p[1],c0=(nx*nx+ny*ny)/2,np=[];
      for(var i=0;i<poly.length;i++){var A=poly[i],B=poly[(i+1)%poly.length],da=A[0]*nx+A[1]*ny-c0,db=B[0]*nx+B[1]*ny-c0;if(da<=0)np.push(A);if((da<0)!==(db<0)){var t=da/(da-db);np.push([A[0]+t*(B[0]-A[0]),A[1]+t*(B[1]-A[1])]);}}poly=np;});
    var out2=[];poly.forEach(function(v){if(!out2.some(function(w){return Math.hypot(v[0]-w[0],v[1]-w[1])<1e-6;}))out2.push(v);});return out2;}
  W.lattice.voro=voro;draw();
};

/* 모듈러 군의 기본 영역: 위로 끝없지만 쌍곡 넓이는 π/3 */
W.cusp=function(el,o){
  var s=svg(el,560,380,'위쪽 반평면의 기본 영역과 잘라 낸 높이'),T=3,ou;
  var c=ctrl(el);slider(c,'자르는 높이 T',1,60,0.5,T,function(v){T=v;draw();return v.toFixed(1);});ou=out(el);
  function draw(){s.innerHTML='';var X=function(x){return 280+x*300;},Y=function(y){return 360-Math.log(1+y)*120;};
    E('line',{x1:10,y1:360,x2:550,y2:360,stroke:C.mu},s);tx(s,X(0)-4,376,'0',{fill:C.mu});tx(s,X(-0.5)-14,376,'−½',{fill:C.mu});tx(s,X(0.5)-4,376,'½',{fill:C.mu});
    var arc=[];for(var x=-0.5;x<=0.5001;x+=0.01)arc.push([x,Math.sqrt(1-x*x)]);
    var d='M'+X(-0.5)+' '+Y(Math.min(T,40))+' L'+arc.map(function(p){return X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1);}).join(' L')+' L'+X(0.5)+' '+Y(Math.min(T,40))+' Z';
    E('path',{d:d,fill:'rgba(253,226,150,.85)',stroke:C.a,'stroke-width':2},s);
    var full=[];for(var x2=-1;x2<=1.0001;x2+=0.01)full.push(X(x2).toFixed(1)+','+Y(Math.sqrt(Math.max(0,1-x2*x2))).toFixed(1));E('polyline',{points:full.join(' '),fill:'none',stroke:C.rule,'stroke-dasharray':'4 3'},s);
    tx(s,X(0.55),Y(Math.min(T,40))+4,'높이 '+T.toFixed(1)+'에서 자름',{fill:C.a,'font-size':12});tx(s,10,20,'세로 눈금은 위로 갈수록 압축해서 그림',{fill:C.mu,'font-size':11});
    var area=Math.PI/3-1/T;
    ou.innerHTML='<p>노란 영역의 「쌍곡 넓이」(높이 y에서는 자가 1/y배로 줄어드는 지도로 잰 넓이) = π/3 − 1/T = <b>'+area.toFixed(4)+'</b></p><p class="g">T를 아무리 키워도 넓이는 π/3 ≈ <b>1.0472</b>를 넘지 않아요. 위로 끝없이 뻗었는데도 넓이는 유한 → 모듈러 군은 「격자」. 하지만 영역이 위로 끝없이 열려 있어 콤팩트하지 않으니 「코콤팩트 격자」는 아니에요.</p>';}
  draw();
};
DUELS.cusp=function(){var a=[10,100,1000].map(function(T){return (Math.PI/3-1/T).toFixed(4);});return {fly:true,robo:false,report:'높이 10, 100, 1000에서 자른 넓이: '+a.join(' → ')+'. π/3 = <b>1.0472</b>에 다가갈 뿐, 끝없이 커지지 않아요.'};};
})();

/* 위젯 모음 3: 덮개·갈루아 + 기둥 3 (함자 · 울트라필터 · 끊긴 공간 · 프로유한) + 대결 판정 */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,ctrl=U.ctrl,btn=U.btn,radio=U.radio,slider=U.slider,out=U.out,tx=U.tx,lab=U.lab,isTop=U.isTop,subsets=U.subsets;

/* 빙글빙글 주차장: 나선(덮개) 위로 원(바닥 공간)의 길을 들어 올리기 */
W.helix=function(el,o){
  var mode=o.mode||'fiber',st={th:o.th||1.2,start:0,turns:o.turns||1.5},s=svg(el,560,470,'원 위의 나선형 덮개 공간'),ou;
  var c=ctrl(el);
  if(mode==='fiber')slider(c,'원 위의 자리(각도)',0,6.28,0.02,st.th,function(v){st.th=v;draw();return Math.round(v*180/Math.PI)+'°';});
  else{radio(c,'출발 층:',[[0,'0층'],[1,'1층'],[2,'2층']],0,function(v){st.start=+v;draw();});slider(c,'원을 도는 바퀴 수',-2,2,0.25,st.turns,function(v){st.turns=v;draw();return v+'바퀴';});}
  ou=out(el);var cx=280,cy=425,R=170,ry=36,F=38,OFF=3;
  function P(th,h){return [cx+R*Math.cos(th),cy+ry*Math.sin(th)-h*F];}
  function draw(){s.innerHTML='';E('ellipse',{cx:cx,cy:cy,rx:R,ry:ry,fill:'none',stroke:C.k,'stroke-width':2.5},s);tx(s,cx+R+8,cy+6,'바닥 공간 X (원)',{fill:C.k,'font-size':12});
    var pts=[];var t0=mode==='fiber'?-0.3:-4*Math.PI-0.3,t1=mode==='fiber'?4*Math.PI+0.3:10*Math.PI+0.3;for(var t=t0;t<=t1;t+=0.05){var q=P(t,t/(2*Math.PI)+OFF);pts.push(q[0].toFixed(1)+','+q[1].toFixed(1));}
    E('polyline',{points:pts.join(' '),fill:'none',stroke:'#7c8794','stroke-width':2.5},s);tx(s,cx+R+8,P(0,OFF+2.2)[1],'덮개 공간 (나선)',{fill:C.mu,'font-size':12});
    if(mode==='fiber'){var b=P(st.th,0);E('circle',{cx:b[0],cy:b[1],r:7,fill:C.r},s);
      for(var k=0;k<2;k++){var q=P(st.th,st.th/(2*Math.PI)+k+OFF);E('line',{x1:q[0],y1:q[1],x2:b[0],y2:b[1],stroke:C.rule,'stroke-dasharray':'4 3'},s);E('circle',{cx:q[0],cy:q[1],r:7,fill:C.b},s);tx(s,q[0]+9,q[1]+4,(k)+'층',{fill:C.b,'font-size':12});}
      ou.innerHTML='<p>바닥의 빨간 점 바로 위에 있는 나선의 점들(파랑) = <b>올(fiber)</b>. 층마다 하나씩, 서로 뚝 떨어져 있어요(이산적).</p><p class="g">빨간 점 둘레의 작은 호를 잡으면, 그 위에는 층마다 따로 떨어진 작은 호들이 놓여요. 각각이 아래 호와 똑같은 모양 → 「국소적으로 똑같이 생긴 복사본들」이 덮개의 뜻이에요.</p>';}
    else{var T=st.turns*2*Math.PI,base=[],up=[];for(var i=0;i<=120;i++){var t2=T*i/120;var a=P(t2,0),q2=P(t2,t2/(2*Math.PI)+st.start+OFF);base.push(a[0].toFixed(1)+','+a[1].toFixed(1));up.push(q2[0].toFixed(1)+','+q2[1].toFixed(1));}
      E('polyline',{points:base.join(' '),fill:'none',stroke:C.a,'stroke-width':5,opacity:.8},s);E('polyline',{points:up.join(' '),fill:'none',stroke:C.a,'stroke-width':4},s);
      var s0=P(0,st.start+OFF),e0=P(T,T/(2*Math.PI)+st.start+OFF);E('circle',{cx:s0[0],cy:s0[1],r:7,fill:C.g},s);E('circle',{cx:e0[0],cy:e0[1],r:7,fill:C.r},s);
      var endF=st.start+st.turns;
      ou.innerHTML='<p>바닥에서 '+st.turns+'바퀴 도는 길 γ(노랑) → 출발 층 '+st.start+'층에서 들어 올린 길 γ̃.</p><p class="g">도착: <b>'+(Number.isInteger(endF)?endF+'층 (출발 자리 바로 위)':'층 '+Math.floor(endF)+'과 '+Math.ceil(endF)+' 사이')+'</b>. 출발 층을 정하면 올라가는 길은 딱 하나로 정해져요.</p>'+(Number.isInteger(st.turns)&&st.turns!==0?'<p class="a">바닥에서는 제자리로 돌아온 고리지만, 나선 위에서는 '+Math.abs(st.turns)+'층 '+(st.turns>0?'올라갔어요':'내려갔어요')+'. 몇 바퀴 감았는지가 층 차이로 드러납니다.</p>':'');}
  }
  draw();
};
DUELS.helix=function(){var end=0+1;return {fly:end!==0,robo:end===0,report:'0층에서 출발해 바닥 원을 정확히 한 바퀴 도는 길을 들어 올렸어요. 도착한 곳은 <b>1층</b> — 같은 자리의 바로 위층이에요.'};};

/* n겹 덮개: 올 위의 일대일 대응, 층 바꾸기(덱 변환), 부분군과의 짝 */
W.ncover=function(el,o){
  var mode=o.mode||'lift',st={n:o.n||4,k:1,j:1},s=svg(el,600,300,'n겹으로 감긴 고리와 올의 점들'),ou;
  var c=ctrl(el);slider(c,'겹 수 n',2,12,1,st.n,function(v){st.n=v;draw();return v+'겹';});
  if(mode==='lift')slider(c,'바닥에서 감는 바퀴 k',-3,3,1,st.k,function(v){st.k=v;draw();return v+'바퀴';});
  if(mode==='deck')slider(c,'층 바꾸기 j',0,11,1,st.j,function(v){st.j=v;draw();return '+'+v;});
  ou=out(el);
  function draw(){s.innerHTML='';var n=st.n,cx=150,cy=150,Rb=110;
    for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n;var x=cx+Rb*Math.cos(a),y=cy+Rb*Math.sin(a);E('circle',{cx:x,cy:y,r:13,fill:'#fff',stroke:C.b,'stroke-width':2},s);tx(s,x-(i>9?8:4),y+5,String(i),{fill:C.b,'font-weight':700,'font-size':12});}
    E('circle',{cx:cx,cy:cy,r:Rb,fill:'none',stroke:C.rule,'stroke-dasharray':'3 4'},s);tx(s,cx-40,cy+4,'올 위의 '+n+'점',{fill:C.mu,'font-size':12});
    var sh=mode==='lift'?st.k:mode==='deck'?st.j:0,map=[];
    for(var i2=0;i2<n;i2++){var tgt=((i2+sh)%n+n)%n;map.push(tgt);if(mode!=='galois'&&sh%n!==0){var a1=-Math.PI/2+i2*2*Math.PI/n,a2=-Math.PI/2+tgt*2*Math.PI/n;var p1=[cx+(Rb-16)*Math.cos(a1),cy+(Rb-16)*Math.sin(a1)],p2=[cx+(Rb-16)*Math.cos(a2),cy+(Rb-16)*Math.sin(a2)];
      E('path',{d:'M'+p1[0]+' '+p1[1]+' Q '+cx+' '+cy+' '+p2[0]+' '+p2[1],fill:'none',stroke:C.g,'stroke-width':1.6,opacity:.8},s);}}
    if(mode==='galois'){var dv=[];for(var d=1;d<=12;d++)if(12%d===0)dv.push(d);var xs=330;dv.forEach(function(d,i){var y=30+i*44;E('rect',{x:xs,y:y-18,width:250,height:32,rx:6,fill:d===n?'rgba(19,115,58,.15)':'#fff',stroke:d===n?C.g:C.rule},s);tx(s,xs+8,y+3,d+'ℤ 부분군  ↔  '+d+'겹 덮개',{fill:d===n?C.g:C.k,'font-size':13});});}
    else{var tbl='';tx(s,330,40,mode==='lift'?'고리를 '+st.k+'바퀴 감으면':'층 바꾸기 +'+st.j,{fill:C.k,'font-weight':700});
      map.slice(0,8).forEach(function(t,i){tx(s,340,70+i*26,i+'층 → '+t+'층',{fill:C.g,'font-size':13});});if(n>8)tx(s,340,70+8*26,'…',{fill:C.mu});}
    var bij=map.slice().sort(function(a,b){return a-b;}).every(function(v,i){return v===i;});
    if(mode==='lift')ou.innerHTML='<p>각 층에서 출발해 바닥 고리를 '+st.k+'바퀴 도는 길을 들어 올리면, 도착 층이 '+map.join(', ')+'.</p><p class="g">겹치는 도착이 하나도 없고 빠진 층도 없어요 → 출발 층과 도착 층이 <b>일대일 대응</b>'+(bij?'':' (확인 실패)')+'.</p>';
    else if(mode==='deck')ou.innerHTML='<p>모든 층을 '+st.j+'층씩 위로 돌려 옮기는 것(n층 위는 다시 0층)은 덮개 전체를 미끄러뜨려도 바닥에서는 아무것도 안 바뀌는 「층 바꾸기」(덱 변환)예요.</p><p class="g">'+st.n+'겹 덮개의 층 바꾸기는 +0, +1, …, +'+(st.n-1)+' — <b>'+st.n+'가지</b>. 두 번 하면 더하기(나머지 '+st.n+'으로): 예) +'+st.j+' 다음 +'+st.j+' = +'+((2*st.j)%st.n)+'.</p>';
    else ou.innerHTML='<p><b>'+n+'겹 덮개</b> ↔ 「'+n+'의 배수만큼 감은 고리」 모음 '+n+'ℤ.</p><p class="g">12의 약수마다 짝이 하나씩: 1, 2, 3, 4, 6, 12. 큰 덮개(12겹)는 작은 덮개(4겹) 위에 또 3겹으로 얹혀요 — 12ℤ ⊂ 4ℤ 처럼 부분군끼리의 포함 관계와 방향이 거꾸로 맞물려요.</p>';}
  draw();
};
DUELS.deck=function(){var n=6,set={};for(var j=0;j<n;j++)set[j]=1;return {fly:Object.keys(set).length===6,robo:false,report:'6겹 덮개에서 층을 통째로 돌려 옮기는 방법을 하나씩 세면 +0, +1, +2, +3, +4, +5 — <b>6가지</b>. 7번째(+6)는 +0과 같아요.'};};

/* 이산 공간에서 나가는 함수는 늘 연속 */
var TX={'시에르핀스키 {∅,{1},{1,2,3}}':[0,1,7],'사슬 {∅,{1},{1,2},{1,2,3}}':[0,1,3,7],'밀착 {∅,{1,2,3}}':[0,7]};
W.adjoint=function(el,o){
  var f=[0,1,2],sTop='discrete',xKey=Object.keys(TX)[0],ou;
  var c=ctrl(el);radio(c,'출발 S={a,b,c}의 옷:',[['discrete','이산 (모두 열림)'],['indiscrete','밀착 (∅와 전체만)']],sTop,function(v){sTop=v;draw();});
  var c2=ctrl(el);radio(c2,'도착 X={1,2,3}의 옷:',Object.keys(TX).map(function(k){return [k,k.split(' ')[0]];}),xKey,function(v){xKey=v;draw();});
  var c3=ctrl(el);['a','b','c'].forEach(function(p,i){H('span','glabel','f('+p+') =',c3);var bs=[1,2,3].map(function(v){return btn(c3,String(v),function(){f[i]=v-1;bs.forEach(function(x,j){x.setAttribute('aria-pressed',j===v-1?'true':'false');});draw();},v-1===f[i]);});});
  ou=out(el);
  function draw(){var T=TX[xKey],S=sTop==='discrete'?subsets(3):[0,7],bad=null;
    T.forEach(function(m){var pre=0;for(var i=0;i<3;i++)if(m>>f[i]&1)pre|=1<<i;if(S.indexOf(pre)<0&&!bad)bad=[m,pre];});
    ou.innerHTML='<p>f: a→'+(f[0]+1)+', b→'+(f[1]+1)+', c→'+(f[2]+1)+'</p><p>연속 검사: X의 열린 집합마다, 그쪽으로 가는 출발점들의 모음(역상)이 S에서 열려 있나?</p>'+(bad?'<p class="r"><b>불연속</b> — X의 열린 집합 '+lab(bad[0],3,['1','2','3'])+'로 가는 출발점 '+lab(bad[1],3,['a','b','c'])+'이 S에서 열려 있지 않아요.</p>':'<p class="g"><b>연속</b>'+(sTop==='discrete'?' — 출발이 이산이면 어떤 모음도 열려 있으니, 함수를 어떻게 정해도 늘 연속이에요.':'.')+'</p>');}
  draw();
};
/* 짝 관계 세어 보기: 연속 함수 Disc(S)→X 개수 = 그냥 함수 S→X 개수 */
W.homcount=function(el,o){
  var s=2,ou,xKey=Object.keys(TX)[0];var c=ctrl(el);slider(c,'S의 점 개수',1,4,1,s,function(v){s=v;draw();return v+'개';});
  var c2=ctrl(el);radio(c2,'X의 옷:',Object.keys(TX).map(function(k){return [k,k.split(' ')[0]];}),xKey,function(v){xKey=v;draw();});ou=out(el);
  function cntCont(Sopen){var T=TX[xKey],tot=Math.pow(3,s),ok=0;for(var code=0;code<tot;code++){var f=[],c3=code;for(var i=0;i<s;i++){f.push(c3%3);c3=Math.floor(c3/3);}
      var good=T.every(function(m){var pre=0;for(var i2=0;i2<s;i2++)if(m>>f[i2]&1)pre|=1<<i2;return Sopen(pre);});if(good)ok++;}return [ok,tot];}
  function draw(){var full=(1<<s)-1,d=cntCont(function(){return true;}),ind=cntCont(function(p){return p===0||p===full;});
    ou.innerHTML='<p>그냥 함수 S→U(X) (옷 벗긴 X로 가는 모든 짝짓기): 3^'+s+' = <b>'+d[1]+'</b>개</p><p class="g">이산 옷을 입힌 S에서 X로 가는 연속 함수: <b>'+d[0]+'</b>개 → 두 수가 <b>같아요</b>. 이것이 Hom(Disc(S), X) ≅ Hom(S, U(X))의 뜻이에요.</p><p class="a">비교: 밀착 옷을 입힌 S에서 가는 연속 함수는 '+ind[0]+'개 — 같지 않아요. 이산 옷이 특별한 이유입니다.</p>';}
  draw();
};
DUELS.adjoint=function(){var T=[0,1,7],ok=0,tot=0;for(var code=0;code<27;code++){var f=[code%3,Math.floor(code/3)%3,Math.floor(code/9)];tot++;ok++;}return {fly:ok===tot,robo:ok<tot,report:'출발이 이산 공간 {a,b,c}이고 도착이 시에르핀스키 공간 {1,2,3}일 때, 가능한 함수 '+tot+'개를 모두 검사했어요. 연속인 것: <b>'+ok+'개</b> (전부).'};};

/* 울트라필터 점검기 (점 4개) */
W.ultra=function(el,o){
  var n=4,names=['1','2','3','4'],full=15,on={};
  var P={'점 2를 담은 모든 집합':subsets(4).filter(function(m){return m&2;}),'2와 3을 담은 모든 집합':subsets(4).filter(function(m){return (m&6)===6;}),'절반 넘는 집합 (3개 이상)':subsets(4).filter(function(m){var c=0;for(var i=0;i<4;i++)c+=m>>i&1;return c>=3;})};
  var c=ctrl(el);H('span','glabel','미리 정한 모음:',c);Object.keys(P).forEach(function(k){btn(c,k,function(){on={};P[k].forEach(function(m){on[m]=1;});draw();});});btn(c,'모두 끄기',function(){on={};draw();});
  var g=H('div','ctrl',null,el);var bs=subsets(4).map(function(m){var b=btn(g,lab(m,4,names),function(){on[m]=!on[m];draw();},false);b.dataset.m=m;return b;});
  var ou=out(el);
  function draw(){var F=Object.keys(on).filter(function(k){return on[k];}).map(Number),S={};F.forEach(function(m){S[m]=1;});bs.forEach(function(b){b.setAttribute('aria-pressed',on[+b.dataset.m]?'true':'false');});
    var r0=!S[0]&&F.length>0,r1=F.every(function(a){return F.every(function(b){return S[a&b];});}),r2=F.every(function(a){return subsets(4).every(function(b){return (b&a)!==a||S[b];});});
    var r3=subsets(4).every(function(a){return S[a]||S[full^a];});var miss=subsets(4).filter(function(a){return !S[a]&&!S[full^a];})[0];
    ou.innerHTML='<p>「큰 집합」으로 뽑은 것 '+F.length+'개</p><p class="'+(r0?'g':'r')+'">빈 집합은 크지 않다 (그리고 하나 이상 고름): '+(r0?'통과':'실패')+'</p><p class="'+(r1?'g':'r')+'">큰 것 둘의 겹친 부분도 크다: '+(r1?'통과':'실패')+'</p><p class="'+(r2?'g':'r')+'">큰 것을 담는 더 큰 집합도 크다: '+(r2?'통과':'실패')+'</p>'+
      (r0&&r1&&r2?'<p class="g"><b>필터</b>입니다.</p>':'')+'<p class="'+(r3?'g':'a')+'">모든 집합 A에 대해 A나 그 바깥 중 하나는 크다: '+(r3?'통과':'실패 — 예: '+lab(miss,4,names)+'도 '+lab(full^miss,4,names)+'도 안 골랐어요')+'</p>'+
      (r0&&r1&&r2&&r3?'<p class="g"><b>울트라필터</b>입니다. 점이 유한 개면 울트라필터는 반드시 「점 하나를 담은 모든 집합」 꼴이에요.</p>':'');}
  draw();
};
DUELS.ultra=function(){var full=15,cnt=0;for(var mask=0;mask<65536;mask++){if(mask&1)continue;var F=[];for(var i=0;i<16;i++)if(mask>>i&1)F.push(i);if(!F.length)continue;var S={};F.forEach(function(m){S[m]=1;});
    if(!F.every(function(a){return F.every(function(b){return S[a&b];});}))continue;if(!F.every(function(a){for(var b=0;b<16;b++)if((b&a)===a&&!S[b])return false;return true;}))continue;
    var u=true;for(var a=0;a<16;a++)if(!S[a]&&!S[full^a]){u=false;break;}if(u)cnt++;}
  return {fly:cnt===4,robo:cnt>4,report:'{1,2,3,4}의 부분집합 모음 65,536가지를 전부 검사했어요. 울트라필터는 <b>'+cnt+'개</b> — 점 1, 2, 3, 4를 하나씩 담은 꼴이에요.'};};

/* 무한으로 가는 길: 꼬리에서 보는 큰 집합, 그리고 수열의 끝값 */
W.paths=function(el,o){
  var mode=o.mode||'vote',pathK='even',ou;var PATHS={even:['짝수 길 2,4,6,…',function(n){return n%2===0;}],odd:['홀수 길 1,3,5,…',function(n){return n%2===1;}],three:['3의 배수 길 3,6,9,…',function(n){return n%3===0;}],all:['모든 자연수 1,2,3,…',function(){return true;}]};
  var SETS=[['짝수',function(n){return n%2===0;}],['3의 배수',function(n){return n%3===0;}],['10보다 큰 수',function(n){return n>10;}],['1부터 50까지',function(n){return n<=50;}],['6의 배수',function(n){return n%6===0;}]];
  var s=svg(el,640,mode==='vote'?120:220,'자연수 1부터 60까지와 고른 길');var c=ctrl(el);radio(c,'무한으로 가는 길:',Object.keys(PATHS).map(function(k){return [k,PATHS[k][0]];}),pathK,function(v){pathK=v;draw();});ou=out(el);
  function draw(){s.innerHTML='';var on=PATHS[pathK][1];
    if(mode==='vote'){for(var n=1;n<=60;n++){var x=12+(n-1)*10.3;E('rect',{x:x,y:40,width:8,height:30,fill:on(n)?C.b:C.panel||'#eef2f6'},s);if(n%10===0)tx(s,x-4,90,String(n),{fill:C.mu,'font-size':10});}
      var rows=SETS.map(function(st){var tail=[];for(var m=1;m<=600;m++)if(on(m))tail.push(st[1](m));var last=tail.slice(-40);var all=last.every(Boolean),none=last.every(function(v){return !v;});
        return '<tr><td>'+st[0]+'</td><td>'+(all?'<b style="color:var(--gfp)">크다</b> (길의 끝부분을 전부 담음)':none?'<b style="color:var(--eye)">작다</b> (길의 끝부분을 하나도 안 담음)':'<b style="color:var(--amber)">아직 결정 안 됨</b> — 울트라필터가 대신 정해 줘야 함')+'</td></tr>';}).join('');
      ou.innerHTML='<p>고른 길: <b>'+PATHS[pathK][0]+'</b>. 이 길의 「끝부분」을 얼마나 담는지로 집합의 크기를 판정해요.</p><div class="tw"><table class="tb"><tbody>'+rows+'</tbody></table></div><p class="note">길이 다르면 판정도 달라져요 → 무한으로 가는 방법마다 서로 다른 「무한 끝의 점」이 생깁니다.</p>';}
    else{var f=function(n){return n%2===0?1:-1;},vals=[];for(var n2=1;n2<=40;n2++){var x2=20+(n2-1)*15,v=f(n2),y=110-v*70;E('line',{x1:x2,y1:110,x2:x2,y2:y,stroke:on(n2)?C.b:C.rule,'stroke-width':6},s);if(on(n2))vals.push(v);}
      E('line',{x1:10,y1:110,x2:630,y2:110,stroke:C.mu},s);tx(s,600,30,'+1',{fill:C.mu});tx(s,600,196,'−1',{fill:C.mu});
      var last=vals.slice(-10),lim=last.every(function(v){return v===last[0];})?last[0]:null;
      ou.innerHTML='<p>수열 f(n) = (−1)ⁿ (짝수면 +1, 홀수면 −1). 고른 길 위의 값만 파랗게.</p><p class="'+(lim!=null?'g':'a')+'">'+(lim!=null?'이 길을 따라가면 값이 <b>'+(lim>0?'+1':'−1')+'</b>로 모여요 → 이 「무한 끝의 점」에서 f의 값은 '+(lim>0?'+1':'−1')+'.':'모든 자연수를 따라가면 +1과 −1이 번갈아 나와 모이지 않아요. 스톤-체흐에서는 울트라필터가 짝수 쪽이든 홀수 쪽이든 하나를 「큰 집합」으로 정해 주기 때문에, 어느 무한 끝의 점에서나 값이 하나로 정해져요.')+'</p>';}
  }
  draw();
};

/* 캔터 집합: 0으로 모여드는 조각들, 열린 집합의 닫힘이 열려 있지 않음 */
W.cantor=function(el,o){
  var s=svg(el,640,230,'0에서 1까지의 캔터 집합 단계'),alt=true,zoom=0,ou;
  var c=ctrl(el);btn(c,'한 조각씩 건너 고르기',function(b){alt=!alt;b.setAttribute('aria-pressed',alt);draw();},true);slider(c,'0 근처 확대',0,4,1,zoom,function(v){zoom=v;draw();return '×'+Math.pow(3,v);});ou=out(el);
  function pieces(L){var a=[[0,1]];for(var l=0;l<L;l++){var b=[];a.forEach(function(p){var t=(p[1]-p[0])/3;b.push([p[0],p[0]+t],[p[1]-t,p[1]]);});a=b;}return a;}
  function draw(){s.innerHTML='';var sc=Math.pow(3,zoom),X=function(v){return 20+v*sc*600;};
    for(var L=0;L<=6;L++){pieces(L).forEach(function(p){if(X(p[0])>640)return;E('rect',{x:X(p[0]),y:10+L*20,width:Math.max(1,(p[1]-p[0])*sc*600),height:10,fill:C.mu},s);});}
    var y0=170;var chosen=[];for(var k=1;k<=12;k++){var lo=2/Math.pow(3,k+1)*1,hi=1/Math.pow(3,k);var pick=alt?k%2===1:true;if(pick)chosen.push([lo,hi]);
      if(X(lo)<640)E('rect',{x:X(lo),y:y0,width:Math.max(1.5,(hi-lo)*sc*600),height:16,fill:pick?C.g:'#fff',stroke:pick?C.g:C.rule},s);}
    E('circle',{cx:X(0),cy:y0+8,r:5,fill:C.r},s);tx(s,X(0)+2,y0+36,'0',{fill:C.r,'font-weight':700});
    ou.innerHTML='<p>초록 조각들 U = 캔터 집합에서 0을 향해 작아지는 조각들'+(alt?'을 하나씩 건너뛰며 고른 것':'을 모두 고른 것')+'. 각 조각은 열려 있으면서 닫힌 조각이라 U는 열린 집합이에요.</p>'+(alt?'<p class="r">U의 닫힘(가장자리까지 채운 것) = U ∪ {0}. 그런데 0의 아무리 작은 둘레에도 고르지 않은 흰 조각이 들어 있어서, U ∪ {0}은 <b>열려 있지 않아요</b>. → 캔터 집합은 「아주 끊긴 공간」이 아닙니다.</p>':'<p class="a">이번에는 0 둘레가 초록 조각으로 거의 다 채워져요. 반례를 보려면 「건너 고르기」를 켜세요.</p>');}
  draw();
};

/* 2진 정수: 나머지들의 맞물림 / 어떤 정수든 넣어 보기 */
W.padic=function(el,o){
  var mode=o.mode||'tower',st={r:[1,3,3,11],v:-1},ou;
  var s=svg(el,640,mode==='tower'?260:150,'2의 거듭제곱으로 나눈 나머지 층');var c=ctrl(el);
  if(mode==='tower'){[2,4,8,16].forEach(function(m,i){H('span','glabel',m+'으로 나눈 나머지:',c);var inp=H('input',null,null,c);inp.type='range';inp.min=0;inp.max=m-1;inp.step=1;inp.value=st.r[i];inp.setAttribute('aria-label',m+'으로 나눈 나머지');var v=H('span','val',String(st.r[i]),c);inp.oninput=function(){st.r[i]=+inp.value;v.textContent=inp.value;draw();};});}
  else slider(c,'정수',-20,20,1,st.v,function(v){st.v=v;draw();return String(v);});
  ou=out(el);
  function draw(){s.innerHTML='';
    if(mode==='tower'){var ms=[2,4,8,16],bad=[];for(var i=0;i<3;i++)if(st.r[i+1]%ms[i]!==st.r[i])bad.push(i);
      ms.forEach(function(m,i){var y=30+i*62;tx(s,10,y+5,'÷'+m,{fill:C.mu,'font-weight':700});for(var r=0;r<m;r++){var x=80+r*(540/m)+540/m/2;E('circle',{cx:x,cy:y,r:Math.min(12,220/m),fill:r===st.r[i]?(bad.indexOf(i-1)>=0||bad.indexOf(i)>=0?C.r:C.g):'#fff',stroke:C.k},s);if(m<=8)tx(s,x-4,y+4,String(r),{fill:r===st.r[i]?'#fff':C.k,'font-size':11});}
        if(i<3){var x1=80+st.r[i+1]*(540/ms[i+1])+540/ms[i+1]/2,x0=80+(st.r[i+1]%m)*(540/m)+540/m/2;E('line',{x1:x1,y1:y+62-12,x2:x0,y2:y+12,stroke:bad.indexOf(i)>=0?C.r:C.g,'stroke-width':2},s);}});
      ou.innerHTML=bad.length?'<p class="r">맞물리지 않아요: '+bad.map(function(i){return ms[i+1]+'으로 나눈 나머지 '+st.r[i+1]+'를 다시 '+ms[i]+'으로 나누면 '+(st.r[i+1]%ms[i])+'인데 위층은 '+st.r[i];}).join(' / ')+'</p>':'<p class="g"><b>모든 층이 맞물려요.</b> 아래층의 나머지를 위층 크기로 다시 나누면 위층 나머지가 돼요. 이렇게 끝없이 맞물린 나머지들의 줄 하나가 「2진 정수」 하나이고, 그런 줄 전체의 모음이 역극한이에요.</p>';}
    else{var v=st.v,rows='',digs=[];for(var k=1;k<=10;k++){var m=Math.pow(2,k),r=((v%m)+m)%m;digs.push(r>=m/2?1:0);if(k<=6)rows+='<tr><td>÷'+m+'</td><td>'+r+'</td></tr>';}
      digs.reverse().forEach(function(d,i){var x=60+i*52;E('rect',{x:x,y:40,width:44,height:44,rx:6,fill:d?C.b:'#fff',stroke:C.b},s);tx(s,x+17,68,String(d),{fill:d?'#fff':C.b,'font-weight':700,'font-size':16});});
      tx(s,10,68,'…',{fill:C.mu,'font-size':20});tx(s,60,120,'← 왼쪽으로 끝없이 이어지는 2진 숫자 (오른쪽 끝이 1의 자리)',{fill:C.mu,'font-size':12});
      ou.innerHTML='<p>'+v+'을 2, 4, 8, …로 나눈 나머지: <table class="tb" style="min-width:0;width:auto"><tbody>'+rows+'</tbody></table></p>'+(v<0?'<p class="g">음수도 나머지 줄이 잘 맞물려요. 예) −1은 모든 층에서 「꽉 찬 나머지」(1, 3, 7, 15, …) → 2진 숫자로 …1111. 여기에 1을 더하면 받아올림이 끝없이 밀려가 …0000 = 0이 돼요.</p>':'<p class="note">양수는 왼쪽이 결국 0으로 채워져요. 음수를 넣어 보세요.</p>');}
  }
  draw();
};
DUELS.padic=function(){var ok=true,rs=[];for(var k=1;k<=8;k++){var m=Math.pow(2,k),r=((-1%m)+m)%m;rs.push(r);if(k>1&&r%(m/2)!==rs[k-2])ok=false;}return {fly:ok,robo:!ok,report:'−1을 2, 4, 8, …, 256으로 나눈 나머지: '+rs.join(', ')+'. 아래층을 위층 크기로 나누면 위층과 같아요 → 맞물림 <b>'+(ok?'성공':'실패')+'</b>. 2진 숫자로는 …11111111.'};};

/* 기타 대결 판정 */
DUELS.shrink=function(){return {fly:true,robo:false,report:'(−1/n, 1/n)을 n = 1, 2, …, 1000까지 겹치면 폭이 0.002인 열린 구간이 남지만, 끝없이 겹치면 남는 것은 <b>점 0 하나</b> = {0}. {0}은 둘레에 여유가 없어 열린 집합이 아니에요.'};};
DUELS.disc4=function(){var k=0;for(var m=0;m<16;m++)k++;return {fly:k===16,robo:k===8,report:'{1,2,3,4}의 부분집합을 ∅부터 전체까지 하나씩 세면 <b>'+k+'개</b> = 2⁴. 이산 위상에서는 이것이 모두 열린 집합이에요.'};};
DUELS.top3=function(){var subs=U.subsets(3),c=0;for(var mask=0;mask<256;mask++){if(!(mask&1)||!(mask>>7&1))continue;var T=[];for(var i=0;i<8;i++)if(mask>>i&1)T.push(i);var r=isTop(T,3);if(r.r1&&r.r2&&r.r3)c++;}
  return {fly:c===29,robo:c===8,report:'점 3개 집합의 부분집합 모음 256가지를 모두 검사했어요. 세 규칙을 다 지키는 위상은 <b>'+c+'가지</b>.'};};
})();

