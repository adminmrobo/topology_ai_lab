/* 실전 연습장: 위상수학 사업장 시뮬레이터 (외부 라이브러리 없음, 기록은 현재 탭에만) */
(function(){
'use strict';
var U=window.WU,C=window.WC,E=U.E,H=U.H,svg=U.svg,tx=U.tx;
var root=document.getElementById('sim');if(!root)return;
var SC={};
function kpi(cls,val,label){return '<div class="kpi '+cls+'"><b>'+val+'</b><span>'+label+'</span></div>';}
function sayH(who,mood,text){return '<div class="say" data-who="'+who+'"><img class="who" data-who="'+who+'" data-mood="'+mood+'" alt="" aria-hidden="true"><div><b class="name">'+Cast.names[who]+'</b><p>'+text+'</p></div></div>';}
function grp(title,cls,inner){return '<div class="cgrp '+cls+'"><div class="ct">'+title+'</div>'+inner+'</div>';}
function btns(id,opts,cur){return '<div class="ctrl" data-k="'+id+'">'+opts.map(function(o){return '<button type="button" class="bt" data-v="'+o[0]+'" aria-pressed="'+(String(o[0])===String(cur))+'">'+o[1]+'</button>';}).join('')+'</div>';}
function rng(id,label,min,max,step,val){return '<div class="ctrl"><span class="glabel">'+label+'</span><input type="range" data-k="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'" aria-label="'+label+'"><span class="val" data-v="'+id+'"></span></div>';}

/* ① 픽셀 사진관 */
var PHOTOS={ring:{name:'고리 하나',truth:[1,1]},two:{name:'고리 두 개',truth:[2,2]},bar:{name:'대각선 막대',truth:[1,0]}};
function photo(k){var N=13,B={};
  if(k==='ring'){B=PIX.ring(N,4);}
  if(k==='two'){var c1=[3,5],c2=[9,5];for(var y=0;y<N;y++)for(var x=0;x<N;x++){if(Math.abs(x-c1[0])+Math.abs(y-c1[1])===2||Math.abs(x-c2[0])+Math.abs(y-c2[1])===2)B[x+','+y]=1;}}
  if(k==='bar'){for(var i=1;i<12;i++)B[i+','+i]=1;}
  return {N:N,B:B};}
SC.pixel={title:'픽셀 사진관',ch:'05_digital_topology.html',chn:'05장 픽셀 세상의 연결',
  st:{photo:'ring',mode:'44'},
  intro:'손님이 가져온 흑백 사진에서 <b>물체(검은 덩어리)</b>와 <b>구멍(물체에 갇힌 흰 덩어리)</b>을 세어 주는 사진관이에요. 사진 종류(초록)는 손님이 정하고, 이웃 규칙(파랑)은 여러분이 정해요.',
  controls:function(st){return grp('시장 환경 · 손님의 사진','env',btns('photo',[['ring','고리 하나'],['two','고리 두 개'],['bar','대각선 막대']],st.photo))+grp('내 결정 · 이웃 규칙 (검은 선 / 흰 바탕)','dec',btns('mode',[['44','4 / 4'],['88','8 / 8'],['84','8 / 4'],['48','4 / 8'],['kh','칼림스키']],st.mode));},
  calc:function(st){var p=photo(st.photo),A=PIX.analyze(p.N,p.B,st.mode),truth=PHOTOS[st.photo].truth;
    var all=[];var black=[],white=[];for(var y=0;y<p.N;y++)for(var x=0;x<p.N;x++)(p.B[x+','+y]?black:white).push([x,y]);
    var holes=A.white-1;return {p:p,A:A,obj:A.black,holes:holes,ok:A.black===truth[0]&&holes===truth[1],truth:truth};},
  scores:function(r){return kpi(r.obj===r.truth[0]?'g':'r',r.obj+'개','센 물체 수 (정답 '+r.truth[0]+')')+kpi(r.holes===r.truth[1]?'g':'r',r.holes+'개','센 구멍 수 (정답 '+r.truth[1]+')')+kpi(r.ok?'g':'r',r.ok?'정확':'틀림','손님에게 줄 답')+kpi('a',r.A.white+'개','흰 바탕 덩어리');},
  graphs:function(r,st,g1,g2){var N=r.p.N,cs=300/N,s=svg(g1,320,320,'사진과 채운 영역');var ins={};r.A.inside.forEach(function(q){ins[q[0]+','+q[1]]=1;});
    for(var y=0;y<N;y++)for(var x=0;x<N;x++){var k=x+','+y;E('rect',{x:10+x*cs,y:10+y*cs,width:cs-1,height:cs-1,fill:r.p.B[k]?C.k:ins[k]?'rgba(30,85,200,.18)':'#fff',stroke:C.rule},s);}
    var modes=['44','88','84','48','kh'],s2=svg(g2,320,200,'규칙별 정답 여부');tx(s2,10,16,'규칙별로 센 (물체, 구멍) — 초록 = 정답',{'font-size':12,fill:C.mu});
    modes.forEach(function(m,i){var a=PIX.analyze(N,r.p.B,m),h=a.white-1,ok=a.black===r.truth[0]&&h===r.truth[1];var x=20+i*60;
      E('rect',{x:x,y:40,width:46,height:110,rx:6,fill:ok?'rgba(19,115,58,.18)':'rgba(201,48,44,.12)',stroke:m===st.mode?C.b:C.rule,'stroke-width':m===st.mode?3:1},s2);
      tx(s2,x+6,70,'('+a.black+','+h+')',{'font-size':12});tx(s2,x+6,170,m==='kh'?'칼림':m[0]+'/'+m[1],{'font-size':12,fill:C.mu});});},
  talk:function(r,st){return [['doc',r.ok?'judge':'think',r.ok?'정답 규칙이에요. 손님 사진에 맞는 답을 냈습니다.':'답이 틀렸어요. 선과 바탕의 규칙이 서로 엇갈리는지 보세요.'],
    ['asst','report','물체 '+r.obj+'개, 구멍 '+r.holes+'개로 셌어요.'],['fly','magnify',st.mode==='88'||st.mode==='44'?'선과 바탕이 같은 규칙이면 역설이 생길 수 있어. 고리 사진으로 확인해 봐.':'규칙을 바꿔도 정답이 유지되는지 다른 사진으로 시험해 봐.'],
    ['robo','calc',st.mode==='88'?'8/8이면 제일 많이 이어 주니까 최고죠!':'숫자가 정답이랑 같으면 손님 만족!']];},
  missions:[{t:'최적 찾기: 「고리 하나」 사진에서 물체 1개·구멍 1개를 정확히 세는 규칙 찾기',chk:function(st,r){return st.photo==='ring'&&r.ok;}},
    {t:'함정 관찰: 「고리 하나」 사진에 4 / 4 규칙을 써서 고리가 조각나는 역설 보기',chk:function(st,r){return st.photo==='ring'&&st.mode==='44'&&r.obj>1;}},
    {t:'조건 바꾸기: 「고리 두 개」 사진에서도 칼림스키 규칙이 정답(물체 2, 구멍 2)인지 확인',chk:function(st,r){return st.photo==='two'&&st.mode==='kh'&&r.ok;}}]};

/* ② 타일 공장 */
function voro(P){var poly=[[-3,-3],[3,-3],[3,3],[-3,3]];P.forEach(function(p){if(p[0]===0&&p[1]===0)return;var nx=p[0],ny=p[1],c0=(nx*nx+ny*ny)/2,np=[];
  for(var i=0;i<poly.length;i++){var A=poly[i],B=poly[(i+1)%poly.length],da=A[0]*nx+A[1]*ny-c0,db=B[0]*nx+B[1]*ny-c0;if(da<=0)np.push(A);if((da<0)!==(db<0)){var t=da/(da-db);np.push([A[0]+t*(B[0]-A[0]),A[1]+t*(B[1]-A[1])]);}}poly=np;});
  var o=[];poly.forEach(function(v){if(!o.some(function(w){return Math.hypot(v[0]-w[0],v[1]-w[1])<1e-6;}))o.push(v);});return o;}
function cellOf(th){var a=[1,0],b=[Math.cos(th),Math.sin(th)],P=[];for(var i=-4;i<=4;i++)for(var j=-4;j<=4;j++)P.push([i*a[0]+j*b[0],i*a[1]+j*b[1]]);var c=voro(P),per=0;c.forEach(function(v,i){var w=c[(i+1)%c.length];per+=Math.hypot(v[0]-w[0],v[1]-w[1]);});var area=Math.sin(th);return {cell:c,per:per,area:area,norm:per/Math.sqrt(area),P:P};}
SC.tile={title:'타일 공장',ch:'09_tiles_lattices.html',chn:'09장 타일과 격자',
  st:{cost:500,deg:90},
  intro:'격자 도장(두 가지 걸음)으로 찍어 바닥 전체를 덮는 타일을 만들어 파는 공장이에요. 타일 넓이는 1로 맞추고, <b>줄눈(타일 테두리) 길이가 짧을수록 비용이 적어요</b>. 줄눈 단가(초록)는 시장이 정하고, 두 번째 걸음의 각도(파랑)는 여러분이 정해요.',
  controls:function(st){return grp('시장 환경 · 줄눈 단가 (원 / 길이 1)','env',rng('cost','단가',100,1000,50,st.cost))+grp('내 결정 · 두 번째 걸음의 각도','dec',rng('deg','각도(도)',60,90,1,st.deg));},
  calc:function(st){var th=st.deg*Math.PI/180,c=cellOf(th),hex=cellOf(Math.PI/3).norm;var cost=Math.round(c.norm/2*st.cost);return {c:c,cost:cost,hex:hex,gap:c.norm-hex,best:Math.abs(st.deg-60)<=2};},
  scores:function(r){return kpi('a',r.c.cell.length+'변','타일 모양')+kpi(r.gap<0.02?'g':'r',r.c.norm.toFixed(3),'넓이 1로 맞춘 둘레 (최소 '+r.hex.toFixed(3)+')')+kpi(r.gap<0.02?'g':'r',r.cost.toLocaleString()+'원','타일 한 장당 줄눈 비용 (둘레의 절반 × 단가)')+kpi(r.gap<0.02?'g':'a','+'+(100*r.gap/r.hex).toFixed(1)+'%','최적보다 더 드는 비용');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,300,'원점의 디리클레 영역(타일)');var S=80,cx=160,cy=150;var sc=1/Math.sqrt(r.c.area);
    r.c.P.forEach(function(p){var x=cx+p[0]*sc*S,y=cy-p[1]*sc*S;if(x>0&&x<320&&y>0&&y<300)E('circle',{cx:x,cy:y,r:3,fill:(p[0]===0&&p[1]===0)?C.r:C.k},s);});
    E('polygon',{points:r.c.cell.map(function(v){return (cx+v[0]*sc*S).toFixed(1)+','+(cy-v[1]*sc*S).toFixed(1);}).join(' '),fill:'rgba(253,226,150,.8)',stroke:C.a,'stroke-width':2.5},s);
    var s2=svg(g2,320,200,'각도별 둘레 곡선');tx(s2,8,16,'각도(60°~90°)별 넓이 1 둘레',{'font-size':12,fill:C.mu});var pts=[];
    for(var d=60;d<=90;d+=1){var v=cellOf(d*Math.PI/180).norm;pts.push([20+(d-60)*9.5,180-(v-3.6)*350]);}
    E('polyline',{points:pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' '),fill:'none',stroke:C.b,'stroke-width':2},s2);
    var me=pts[st.deg-60];E('circle',{cx:me[0],cy:me[1],r:6,fill:C.r},s2);E('circle',{cx:pts[0][0],cy:pts[0][1],r:5,fill:'none',stroke:C.g,'stroke-width':2},s2);
    tx(s2,pts[0][0]+4,pts[0][1]+18,'최적 60°',{'font-size':11,fill:C.g});tx(s2,250,40,'정사각형 90°',{'font-size':11,fill:C.mu});},
  talk:function(r,st){return [['doc',r.best?'judge':'think',r.best?'벌집 타일이 가장 경제적이에요. 판정: 최적.':'아직 줄눈이 길어요. 각도를 바꿔 곡선의 가장 낮은 곳을 찾으세요.'],
    ['asst','report','넓이 1 기준 둘레 '+r.c.norm.toFixed(3)+', 타일당 줄눈 비용 '+r.cost.toLocaleString()+'원이에요.'],['fly','magnify','단가를 바꾸면 최적 각도도 바뀔까? 직접 바꿔 봐.'],
    ['robo','calc',st.deg===90?'정사각형이 제일 단순하니 제일 싸겠죠!':'변이 많으면 줄눈이 길 것 같은데요…?']];},
  missions:[{t:'최적 찾기: 줄눈 비용이 가장 적은 각도 찾기 (최적 ±2° 안)',chk:function(st,r){return r.best;}},
    {t:'함정 관찰: 정사각형 타일(90°)이 벌집보다 비싸다는 것 확인하기',chk:function(st,r){return st.deg===90&&r.gap>0.2;}},
    {t:'조건 바꾸기: 단가를 기본값(500원)에서 바꾸고도 최적 각도가 60°인지 확인',chk:function(st,r){return st.cost!==500&&r.best;}}]};

/* ③ 빙글빙글 주차장 */
SC.park={title:'빙글빙글 주차장',ch:'10_covering_spaces.html',chn:'10장 덮개 공간과 길',
  st:{n:6,start:0,k:0,target:3},
  intro:'층마다 한 바퀴씩 올라가는 둥근 주차장이에요. 맨 위층 다음은 다시 0층(층 수 n짜리 고리형 주차장 = n겹 덮개). 차는 바닥 지도의 「몇 바퀴 돌기」 명령만 받아요. 층 수(초록)는 건물이 정하고, 출발 층과 바퀴 수(파랑)는 여러분이 정해요. 목표: <b>3층</b>에 주차.',
  controls:function(st){return grp('시장 환경 · 주차장 층 수 n','env',rng('n','층 수',2,10,1,st.n))+grp('내 결정 · 출발 층과 바퀴 수','dec',rng('start','출발 층',0,9,1,st.start)+rng('k','바퀴 수 k',-6,12,1,st.k));},
  calc:function(st){var s=Math.min(st.start,st.n-1),end=((s+st.k)%st.n+st.n)%st.n;return {s:s,end:end,hit:end===3%st.n&&st.n>3,back:end===s};},
  scores:function(r,st){return kpi(r.hit?'g':'a',r.end+'층','도착 층 (목표 3층)')+kpi('m',st.k+'바퀴','바닥에서 감은 수')+kpi(r.back?'a':'g',r.back?'제자리':'다른 층','출발 층과 비교')+kpi('g',st.n+'가지','층 바꾸기(덱 변환) 수');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,300,'고리형 주차장의 층');var cx=160,cy=150,R=105,n=st.n;
    for(var i=0;i<n;i++){var a=-Math.PI/2+i*2*Math.PI/n,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);var col=i===r.end?C.r:i===r.s?C.g:'#fff';E('circle',{cx:x,cy:y,r:16,fill:col,stroke:C.b,'stroke-width':2},s);tx(s,x-5,y+5,String(i),{fill:(i===r.end||i===r.s)?'#fff':C.b,'font-weight':700});}
    tx(s,cx-44,cy+4,'초록 출발 · 빨강 도착',{'font-size':11,fill:C.mu});
    var s2=svg(g2,320,200,'바퀴 수별 도착 층');tx(s2,8,16,'바퀴 수 k(−6~12)별 도착 층',{'font-size':12,fill:C.mu});
    for(var k=-6;k<=12;k++){var e=((r.s+k)%n+n)%n,x2=14+(k+6)*16,h=10+e*14;E('rect',{x:x2,y:185-h,width:12,height:h,fill:k===st.k?C.r:(e===3?C.g:C.rule)},s2);}},
  talk:function(r,st){return [['doc',r.hit?'judge':'think',r.hit?'3층 주차 성공! 들어 올린 길이 정확해요.':'아직 3층이 아니에요. 「바퀴 수 = 층 차이」를 떠올리세요.'],
    ['asst','report',r.s+'층 출발, '+st.k+'바퀴 → '+r.end+'층 도착이에요.'],['fly','magnify',r.back&&st.k!==0?'바닥에서는 제자리 고리인데 층도 제자리네. 층 수의 배수만큼 돌았지?':'층 수를 바꿔도 「n바퀴면 제자리」가 맞는지 확인해 봐.'],
    ['robo','calc',st.k!==0&&r.end===r.s?'역시 돌면 제자리예요!':'한 바퀴 돌면 원래 층이겠죠!']];},
  missions:[{t:'최적 찾기: 0층에서 출발해 3층에 주차하기',chk:function(st,r){return r.s===0&&r.hit;}},
    {t:'함정 관찰: 바닥에서는 제자리로 오는 1바퀴 고리가 위층에서는 다른 층에 도착함을 보기',chk:function(st,r){return st.k===1&&!r.back;}},
    {t:'조건 바꾸기: 층 수를 6이 아닌 값으로 바꾸고, 바퀴 수를 층 수와 같게 하면 제자리인지 확인',chk:function(st,r){return st.n!==6&&st.k===st.n&&r.back;}}]};

/* ④ 우산 대여점 */
SC.umb={title:'우산 대여점',ch:'04_compactness.html',chn:'04장 콤팩트',
  st:{closed:'open',N:5},
  intro:'비 오는 산책로 구간을 우산으로 빈틈없이 덮어 주는 대여점이에요. 우산 n번은 (1/n, 1.1)을 덮고, 닫힌 구간 손님에게는 0을 덮는 우산(−0.1, 0.1)이 꼭 함께 나가요. 손님의 구간(초록)은 손님이 정하고, 빌려줄 우산 수(파랑)는 여러분이 정해요.',
  controls:function(st){return grp('시장 환경 · 손님의 구간','env',btns('closed',[['open','(0, 1] — 0 빠짐'],['closed','[0, 1] — 0 포함']],st.closed))+grp('내 결정 · 빌려줄 우산 수','dec',rng('N','우산 수 n',2,200,1,st.N));},
  calc:function(st){var cl=st.closed==='closed',gap=cl?Math.max(0,1/st.N-0.1):1/st.N,used=cl?(st.N>=10?2:st.N):st.N-1;return {cl:cl,gap:gap,used:used,ok:gap<=0};},
  scores:function(r,st){return kpi(r.ok?'g':'r',(100*(1-r.gap)).toFixed(1)+'%','덮인 비율')+kpi(r.ok?'g':'r',r.gap.toFixed(4),'못 덮은 틈 길이')+kpi('a',r.used+'개','실제로 필요한 우산 수')+kpi(r.ok?'g':'r',r.ok?'완전히 덮음':'틈 남음','판정');},
  graphs:function(r,st,g1,g2){var s=svg(g1,320,180,'구간과 우산');var X=function(v){return 30+v*260;};E('line',{x1:X(0),y1:150,x2:X(1),y2:150,stroke:C.k,'stroke-width':4},s);E('circle',{cx:X(0),cy:150,r:6,fill:r.cl?C.k:'#fff',stroke:C.k,'stroke-width':2},s);
    for(var k=2;k<=Math.min(st.N,12);k++)E('line',{x1:X(1/k),y1:10+k*9,x2:X(1.05),y2:10+k*9,stroke:C.b,'stroke-width':5,opacity:.45},s);
    if(r.cl)E('line',{x1:X(-0.08),y1:130,x2:X(0.1),y2:130,stroke:C.a,'stroke-width':7},s);if(r.gap>0)E('rect',{x:X(r.cl?0.1:0),y:142,width:r.gap*260,height:16,fill:'rgba(201,48,44,.3)'},s);
    var s2=svg(g2,320,200,'우산 수별 못 덮은 틈');tx(s2,8,16,'우산 수 n별 틈 길이 (빨강 = 지금)',{'font-size':12,fill:C.mu});var pts=[];
    for(var n=2;n<=200;n+=2){var g=r.cl?Math.max(0,1/n-0.1):1/n;pts.push([20+(n-2)*1.45,185-g*330]);}
    E('polyline',{points:pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' '),fill:'none',stroke:C.b,'stroke-width':2},s2);E('line',{x1:20,y1:185,x2:310,y2:185,stroke:C.mu},s2);
    E('circle',{cx:20+(st.N-2)*1.45,cy:185-r.gap*330,r:5,fill:C.r},s2);},
  talk:function(r,st){return [['doc',r.ok?'judge':'think',r.ok?'유한 개로 완전히 덮었어요. 콤팩트한 구간이라 가능한 일이에요.':'틈이 남았어요. 우산을 늘리면 해결될까요, 구간이 문제일까요?'],
    ['asst','report','우산 '+st.N+'개, 못 덮은 틈 '+r.gap.toFixed(4)+'이에요.'],['fly','magnify',r.cl?'닫힌 구간에선 0을 덮는 우산이 결정적이야.':'0 바로 옆은 아무리 늘려도 남을걸. 200개로 해 봐.'],
    ['robo','calc',r.cl?'우산 2개로 충분하다니, 남는 우산은 팔아야겠어요.':'우산 200개면 틈이 0이 되겠죠!']];},
  missions:[{t:'최적 찾기: [0, 1] 손님에게 우산을 「실제로 필요한 수 2개」만 쓰고 완전히 덮기 (n은 10 이상)',chk:function(st,r){return r.cl&&r.ok&&r.used===2;}},
    {t:'함정 관찰: (0, 1] 손님에게 우산을 100개 이상 줘도 틈이 남는 것 보기',chk:function(st,r){return !r.cl&&st.N>=100&&r.gap>0;}},
    {t:'조건 바꾸기: (0, 1]에서 우산 수를 바꿔도(10개와 200개 모두 시도) 틈이 0이 되지 않음을 확인',chk:function(st,r,hist){return !r.cl&&hist.N10&&hist.N200;}}]};

var ORDER=['pixel','tile','park','umb'],cur=null,touched={},done={},hist={};
var tabs=H('div','ctrl',null,root);tabs.setAttribute('role','tablist');
ORDER.forEach(function(k){var b=H('button','bt',SC[k].title,tabs);b.type='button';b.setAttribute('role','tab');b.dataset.t=k;b.onclick=function(){open(k);};});
var body=H('div',null,null,root);
function open(k){cur=k;[].forEach.call(tabs.children,function(b){b.setAttribute('aria-pressed',b.dataset.t===k);b.setAttribute('aria-selected',b.dataset.t===k);});
  try{history.replaceState(null,'','#'+k);}catch(e){}
  var S=SC[k];body.innerHTML='<h2>'+S.title+'</h2><div class="sitbox">'+S.intro+'</div><div class="simgrid"><div class="simctl">'+S.controls(S.st)+'</div><div class="simout"><div class="kpis"></div><div class="graphs"><div class="g1"></div><div class="g2"></div></div></div></div><div class="talkbox"></div><h3>미션</h3><ol class="missions"></ol><p class="note">배운 곳 다시 보기 → <a href="../'+S.ch+'">'+S.chn+'</a></p>';
  [].forEach.call(body.querySelectorAll('[data-k] button'),function(b){b.onclick=function(){var key=b.parentNode.dataset.k;S.st[key]=b.dataset.v;[].forEach.call(b.parentNode.children,function(x){x.setAttribute('aria-pressed',x===b);});touched[k]=1;update();};});
  [].forEach.call(body.querySelectorAll('input[data-k]'),function(r){r.oninput=function(){S.st[r.dataset.k]=+r.value;touched[k]=1;update();};});
  update();}
function update(){var S=SC[cur],st=S.st,r=S.calc(st);hist[cur]=hist[cur]||{};if(cur==='umb'&&st.closed==='open'){if(st.N===10)hist.umb.N10=1;if(st.N===200)hist.umb.N200=1;}
  [].forEach.call(body.querySelectorAll('.val[data-v]'),function(v){v.textContent=st[v.dataset.v];});
  body.querySelector('.kpis').innerHTML=S.scores(r,st);var g1=body.querySelector('.g1'),g2=body.querySelector('.g2');g1.innerHTML='';g2.innerHTML='';S.graphs(r,st,g1,g2);
  body.querySelector('.talkbox').innerHTML=S.talk(r,st).map(function(t){return sayH(t[0],t[1],t[2]);}).join('');Cast.fill(body);
  done[cur]=done[cur]||{};var ml=body.querySelector('.missions');ml.innerHTML='';
  S.missions.forEach(function(m,i){var ok=touched[cur]&&m.chk(st,r,hist[cur]);if(ok)done[cur][i]=1;var li=document.createElement('li');li.innerHTML=(done[cur][i]?'<b style="color:var(--gfp)">통과 ✓</b> ':'<span class="note">도전 중</span> ')+m.t;ml.appendChild(li);});}
window.PRACTICE={open:open,set:function(k,st){if(cur!==k)open(k);Object.assign(SC[k].st,st);touched[k]=1;update();return SC[k].missions.map(function(m,i){return !!done[k][i];});},status:function(k){return SC[k].missions.map(function(m,i){return !!(done[k]||{})[i];});},calc:function(k){return SC[k].calc(SC[k].st);}};
var h=(location.hash||'').slice(1);open(SC[h]?h:'pixel');
})();
