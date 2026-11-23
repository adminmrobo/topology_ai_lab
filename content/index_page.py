"""오리엔테이션(목차) 페이지 조립"""
import os, json

FORMAT_NOTE = {
    '첫 강의 + 쪽지시험': '박사의 짧은 강의 뒤 퀴즈로 점검',
    '1:1 토론': '두 수강생이 찬반을 맡아 맞붙고, 조교가 근거를 점검',
    '조별 과제': '1조·2조가 같은 과제를 다른 방법으로 풀어 비교',
    '계산배틀': '조교 둘이 숫자로 승부, 수강생은 손계산으로 검산',
    '조별 토론': '조마다 한 가지 주장을 맡아 토론 후 결론 정리',
    '발표수업': '한 조가 발표하고 다른 조가 질문',
    '역할극 수업': '수강생이 「도장」(군의 원소)이 되어 움직여 보기',
}

TOPICS = {1: '공간을 나누는 법', 2: '무리가 공간을 움직이는 법', 3: '끝에서 보는 법'}


def build(B, chs):
    esc, img, says, rich = B.esc, B.img, B.says, B.rich
    B.GLOSS = {'위상수학': '길이·각도는 잊고 「붙어 있음과 떨어져 있음」만으로 모양을 연구하는 수학. 고무찰흙 기하학이라고도 한다.',
               '이산 위상': '모든 부분집합이 열린 집합인 위상. 점마다 혼자 떨어져 있다.'}
    o = [B.head(B.SERIES + ' · 오리엔테이션', '중학생도 따라오는 위상수학 15장 + 실전 연습장. 박사 선생님과 두 조교, 수강생 6명이 함께하는 연구실 해설 시리즈.')]
    o.append('<nav class="top" aria-label="목차"><a class="logo" href="index.html">위상수학 교실</a><a href="#three">3줄 요약</a><a href="#cast">등장인물</a><a href="#pillars">세 기둥</a><a href="#toc">목차</a><a href="#how">수업 방식</a><a href="practice/index.html">실전 연습장</a></nav><div id="prog"></div>')
    chars = ''.join(img(w, m, cls='') for w, m in [('doc', 'front'), ('fly', 'magnify'), ('robo', 'smile'), ('moa', 'cheer')])
    o.append(f'''<div class="cover" id="top" role="img" aria-label="위상수학 교실 표지 — 박사, 초파리 연구원, 주판봇, 인턴 모아">
<canvas class="bgpx" data-seed="3" data-motif="0" aria-hidden="true"></canvas><span class="badge">대체 표지 · 그림 대기 (IMG 명세서 cover_00)</span>
<div class="ctext"><span class="no">오리엔테이션 · 00</span><h1>위상수학 교실</h1><p>고무찰흙 세상의 수학 — 15장 + 실전 연습장</p></div><div class="cchars">{chars}</div></div>''')
    o.append('''<header class="hero"><div class="wrap"><div class="kicker">연구실 해설 시리즈 · 위상수학 입문</div><h1>위상수학 교실 — 고무찰흙 세상의 수학</h1>
<p class="q">핵심 질문 — 늘이고 구부려도 변하지 않는 「모양의 본질」은 무엇일까?</p>
<p>도넛과 손잡이 달린 컵은 [[위상수학]]의 눈으로 보면 같은 모양이에요. 둘 다 구멍이 하나니까요. 이 시리즈는 인포그래픽 20장에 담긴 위상수학의 개념을 15장으로 나눠, 그림을 직접 움직이며 배우게 만든 수업입니다.</p>
<div class="kpis"><div class="kpi g"><b>15장</b><span>한 장에 개념 2~3단계</span></div><div class="kpi m"><b>3기둥</b><span>공간 · 움직임 · 끝</span></div><div class="kpi a"><b>7가지</b><span>수업 형식 (토론·배틀·발표…)</span></div><div class="kpi r"><b>1곳</b><span>마지막 장 실전 연습장</span></div></div>''' + says([('doc', 'front', '안녕하세요, 이 교실의 선생님 박사입니다. 행렬이나 벡터를 몰라도 괜찮아요. 우리가 쓰는 건 「점」, 「모음」, 「붙어 있음」 세 가지뿐이에요.'),
                                                                                                                                                    ('moa', 'cheer', '저희 수강생 6명이 먼저 헤매 볼게요. 같이 가요!')]) + '</div></header>')
    o.append('''<div class="wrap"><div class="three" id="three"><h2>처음 오신 분께 — 이 시리즈를 3줄로</h2><ol>
<li><b>무엇을:</b> 길이·각도 없이 「이웃」만으로 모양을 다루는 위상수학의 핵심 개념을, 세 기둥(공간을 나누는 법 · 무리가 공간을 움직이는 법 · 끝에서 보는 법)으로 배웁니다.</li>
<li><b>왜 중요한가:</b> 사진 속 물체 세기, 타일·결정 무늬, 지도와 길 찾기, 데이터의 모양 분석(위상 데이터 분석)이 모두 이 개념들 위에 서 있어요.</li>
<li><b>생활·현장에서는:</b> 「이 픽셀들은 한 덩어리인가?」, 「이 무늬는 어떤 타일 하나로 만들어졌나?」 같은 질문에 답하는 도구가 됩니다.</li></ol>
<p class="note">각 장은 독립적으로 읽을 수 있지만 순서대로 읽으면 가장 편해요. 장마다 20~30분이면 충분합니다.</p></div></div>''')
    castl = ''.join('<div>%s<div><span class="role">%s</span><b>%s</b><span>%s</span></div></div>' % (img(w, B.PEOPLE[w][2], cls=''), esc(B.PEOPLE[w][1]), esc(B.PEOPLE[w][0]), esc(B.PEOPLE[w][3]))
                    for w in ['doc', 'fly', 'robo', 'sia', 'moa', 'asst', 'x1', 'x2', 'x3'])
    g1 = ''.join(img(w, 'e13', cls='') for w in ['sia', 'asst', 'x1'])
    g2 = ''.join(img(w, 'e13', cls='') for w in ['moa', 'x2', 'x3'])
    o.append(f'''<section class="level" id="cast"><div class="wrap"><h2>등장인물 — 선생님 1명, 조교 2명, 수강생 6명</h2><div class="cast">{castl}</div>
<div class="groups"><div>{g1} <b>1조 「도넛조」</b> 시아 · 하루 · X1</div><div>{g2} <b>2조 「머그조」</b> 모아 · X2 · X3</div></div>
<p class="note">조 이름은 위상수학의 오래된 농담에서 왔어요. 도넛과 손잡이 달린 머그컵은 고무찰흙처럼 늘이면 서로 바꿀 수 있는 같은 모양입니다.</p></div></section>''')
    pill = []
    for p in (1, 2, 3):
        items = ''.join('<li><a href="%s.html">%02d %s</a></li>' % (c['slug'], c['no'], esc(c['title'])) for c in chs if c.get('pillar') == p)
        pill.append('<div><b>기둥 %d · %s</b><ul>%s</ul></div>' % (p, TOPICS[p], items))
    o.append('''<section class="level" id="pillars"><div class="wrap"><h2>세 기둥 — 이 시리즈의 큰 그림</h2>
<p>모든 장은 「이산 위상(점마다 혼자 떨어진 공간)」이라는 한 가지 생각에서 갈라져 나와요. 원자료 인포그래픽이 이것을 세 기둥으로 정리했어요.</p>
<div class="steps">''' + ''.join(pill) + '''</div>
<details><summary>원자료 인포그래픽 보기 (영어 그림)</summary><img loading="lazy" src="img/source/src16.webp" width="1280" height="714" alt="이산 위상의 구조 — 세 기둥 개요 인포그래픽"></details>
<div class="panel"><div class="ptitle">세 기둥 카드 — 눌러서 한 줄 요약 보기</div><div data-w="cards" data-o="''' + esc(json.dumps({'cards': [
        ['기둥 1 · 공간을 나누는 법', '<p>열린 집합으로 「이웃」을 정하고(01), 가장 촘촘한 이산 위상과 가장 엉성한 밀착 위상을 비교한 뒤(02), 연결(03)과 콤팩트(04)를 배워요. 픽셀 세상(05)과 순서로 만든 공간(06)은 컴퓨터 그림과 바로 이어집니다.</p>'],
        ['기둥 2 · 무리가 공간을 움직이는 법', '<p>「도장 찍기」 같은 움직임의 무리(군)가 공간에 작용하는 법(07), 얌전한 작용의 등급(08), 타일과 격자(09), 덮개 공간(10)과 갈루아 대응(11)을 배워요.</p>'],
        ['기둥 3 · 끝에서 보는 법', '<p>번역기 같은 함자(12), 무한 끝에 점을 붙이는 울트라필터와 스톤-체흐(13), 아주 끊긴 공간과 2진 정수(14)를 배우고, 15장에서 종합 쪽지시험을 봐요.</p>']]}, ensure_ascii=False)) + '''"></div></div>
</div></section>''')
    cards = ''.join('<a href="%s.html"><span class="n">%02d · %s</span><b>%s</b><span>%s</span><span class="fmt">%s</span></a>' % (
        c['slug'], c['no'], (('기둥 %d' % c['pillar']) if c.get('pillar') else '종합') + ' · ' + B.STARS[B.LEVEL[c['no']]].split(' ')[0] + ' · 약 %d분' % B.MINUTES[c['no']], esc(c['title']), esc(c['q']), esc(c['format'][0])) for c in chs)
    cards += '<a href="practice/index.html"><span class="n">마지막 장</span><b>실전 연습장 — 위상수학 사업장 시뮬레이터</b><span>픽셀 사진관, 타일 공장, 빙글빙글 주차장, 우산 대여점을 직접 운영해 보며 배운 것을 써 봐요.</span><span class="fmt">시뮬레이터</span></a>'
    o.append(f'<section class="level" id="toc"><div class="wrap"><h2>목차 — 15장 + 실전 연습장</h2><div class="toc">{cards}</div></div></section>')
    rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (esc(k), esc(v), ', '.join('%02d' % c['no'] for c in chs if c['format'][0].startswith(k.split(' ')[0]))) for k, v in FORMAT_NOTE.items())
    o.append(f'''<section class="level" id="how"><div class="wrap"><h2>수업 방식 — 장마다 다른 수업</h2>
<div class="tw"><table class="tb"><thead><tr><th>형식</th><th>어떻게 하나</th><th>나오는 장</th></tr></thead><tbody>{rows}</tbody></table></div>
<h3>한 장의 흐름</h3><div class="steps"><div><b class="n">1</b><b>3줄 요약과 수업 소개</b><p>무엇을·왜·어디에 쓰는지 먼저 봐요.</p></div><div><b class="n">2</b><b>단계 2~3개</b><p>박사의 상황 질문 → 왜 이 방법 / 하루의 수식 질문 → 그림 실험 → 풀이 → 퀴즈.</p></div><div><b class="n">3</b><b>AI 판단 · 조교 대결 · 정리</b><p>AI 답의 오류 찾기, 계산으로 가리는 조교 대결, 한눈에 보는 정리표.</p></div></div>
{says([('fly', 'magnify', '원자료 그림에서 틀린 곳을 찾으면 「바꾼다」 상자로 표시해 뒀어. 원자료도 의심하면서 읽자고.'), ('robo', 'coin', '계산은 저한테 맡기세요! …물론 조교 대결에서 가끔 틀리지만요.')])}</div></section>''')
    o.append(B.footer_html(None, (chs[0]['slug'] + '.html', '01 ' + chs[0]['title']) if chs else None,
                           '<p class="note">원자료: 사용자가 제공한 위상수학 인포그래픽 20장(작성자 확인 필요). 이 시리즈의 숫자 예시는 모두 설명용 예시값입니다.</p>'))
    o.append(B.foot_scripts(kg=False))
    open(os.path.join(B.ROOT, 'index.html'), 'w', encoding='utf-8').write('\n'.join(o))
    print('built index')
