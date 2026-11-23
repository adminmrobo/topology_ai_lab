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
