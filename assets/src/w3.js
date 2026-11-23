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
