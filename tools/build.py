#!/usr/bin/env python3
"""위상수학 교실 조립 스크립트.
content/chNN.py(챕터 데이터) → NN_slug.html, content/index_data.py → index.html
사용: python3 tools/build.py [--sprites PATH_TO_character_pack]
"""
import importlib.util, json, re, os, sys, html, glob, subprocess, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'content'))
from common import REFS, AUTHOR, SITE, SERIES, CHAPTERS, PEOPLE  # noqa

TODAY = '2026-11-23'
PXFIX = open(os.path.join(ROOT, 'tools', 'pxfix.html'), encoding='utf-8').read().strip()
USED = set()  # (who, mood)


def esc(s):
    return html.escape(str(s), quote=True)


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(ROOT, 'content', name + '.py'))
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


GLOSS = {}


def rich(s):
    """[[용어]] → 용어 말풍선, 그 외 HTML은 그대로"""
    def rep(m):
        t = m.group(1)
        key, _, shown = t.partition('|')
        shown = shown or key
        d = GLOSS.get(key)
        if not d:
            return shown
        return '<span class="jt" data-t="%s" data-d="%s">%s</span>' % (esc(key), esc(d), shown)
    return re.sub(r'\[\[(.+?)\]\]', rep, str(s))


def img(who, mood, cls='who', extra=''):
    USED.add((who, mood))
    return '<img class="%s" data-who="%s" data-mood="%s" alt="" aria-hidden="true"%s>' % (cls, who, mood, extra)


def say(who, mood, text, name=None):
    nm = name or PEOPLE[who][0]
    return '<div class="say" data-who="%s">%s<div><b class="name">%s</b><p>%s</p></div></div>' % (
        who, img(who, mood), esc(nm), rich(text))


def says(lst):
    return ''.join(say(*x) for x in lst)


def head(title, desc, depth=0, og=None):
    up = '../' * depth
    og = og or (up + 'img/og/og_index.webp')
    return f'''<!DOCTYPE html><html lang="ko"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:image" content="{esc(og)}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{up}assets/lab.css">
{PXFIX}
</head><body>'''


def foot_scripts(depth=0, kg=True):
    up = '../' * depth
    s = f'<script src="{up}assets/sprites.js"></script><script src="{up}assets/widgets.js"></script><script src="{up}assets/lab.js"></script>'
    if kg:
        s += f'<script src="{up}assets/js/kgx.js"></script>'
    return s + '</body></html>'


def footer_html(prev, nxt, extra=''):
    p = '<a href="%s">← %s</a>' % (prev[0], esc(prev[1])) if prev else '<span></span>'
    n = '<a href="%s">%s →</a>' % (nxt[0], esc(nxt[1])) if nxt else '<span></span>'
    return f'''<footer><div class="wrap">{extra}
<div class="nextprev">{p}{n}</div>
<p>글 · {AUTHOR['name']} (<a href="{AUTHOR['site']}">{AUTHOR['site']}</a>) · {AUTHOR['org']}</p>
<p class="note">시리즈 「{SERIES}」 · 캐릭터 그림은 연구실 캐릭터 팩(adminmrobo/fruitfly-lab-expressions)을 쓰며 허락 없이 다시 쓸 수 없습니다.</p>
</div></footer>'''


# ───────────────────────── 지식 그래프 자동 생성 ─────────────────────────
def build_kg(ch):
    page = ch['slug']
    nodes, edges = [], []
    topic = 'lab:topic/' + ch['kgid']
    nodes.append({'id': topic, 'type': 'Topic', 'label': {'ko': ch['title'], 'en': ch['en']}, 'page': page, 'anchor': '#top',
                  'status': 'known', 'confidence': 'high', 'domain': ['math'], 'family': 'topology',
                  'definition': {'ko': ch['q']}})
    prev = None
    for i, st in enumerate(ch['stages'], 1):
        k = st['kg']
        cid = 'lab:concept/' + k['id']
        nodes.append({'id': cid, 'type': k.get('type', 'Concept'), 'label': {'ko': k['ko'], 'en': k['en']},
                      'definition': {'ko': k['def']}, 'page': page, 'anchor': '#lv%d' % i, 'level': min(5, 1 + ch['no'] // 4),
                      'status': 'known', 'confidence': 'high', 'domain': ['math'], 'family': 'topology',
                      'evidence': k.get('ev', []), 'source': [{'cite': r} for r in k.get('refs', [])], 'match': [],
                      'tags': [ch['title']]})
        edges.append({'s': cid, 'p': 'lab:partOf', 'o': topic})
        if prev:
            edges.append({'s': prev, 'p': 'lab:prerequisiteOf', 'o': cid})
        prev = cid
        an = 'lab:analogy/' + k['id'] + '-daily'
        nodes.append({'id': an, 'type': 'Analogy', 'label': {'ko': st['pair'][2] if len(st['pair']) > 2 else '일상 비유', 'en': 'analogy'},
                      'definition': {'ko': re.sub('<.*?>|\\[\\[|\\]\\]', '', st['pair'][0])[:140]}, 'page': page, 'anchor': '#lv%d' % i,
                      'status': 'known', 'confidence': 'mid', 'domain': ['math'], 'match': []})
        edges.append({'s': an, 'p': 'lab:analogyOf', 'o': cid})
        lim = 'lab:limitation/' + k['id']
        nodes.append({'id': lim, 'type': 'Limitation', 'label': {'ko': '한계: ' + k['ko'], 'en': 'limitation of ' + k['en']},
                      'definition': {'ko': re.sub('<.*?>|\\[\\[|\\]\\]', '', st['limit'])[:160]}, 'page': page, 'anchor': '#lv%d' % i,
                      'status': 'known', 'confidence': 'mid', 'domain': ['math'], 'match': []})
        edges.append({'s': cid, 'p': 'lab:hasLimitation', 'o': lim})
    for j, fx in enumerate(ch.get('fixes', []), 1):
        cl = 'lab:claim/%s-fix%d' % (ch['kgid'], j)
        nodes.append({'id': cl, 'type': 'Claim', 'label': {'ko': '원자료 바로잡기 %d' % j, 'en': 'correction %d' % j},
                      'definition': {'ko': re.sub('<.*?>', '', fx['text'])}, 'page': page, 'anchor': fx['anchor'],
                      'status': 'known', 'confidence': 'high', 'domain': ['math'],
                      'source': [{'cite': r, 'loc': fx.get('loc', '')} for r in fx['refs']], 'match': []})
        for r in fx['refs']:
            edges.append({'s': cl, 'p': 'lab:assertedIn', 'o': 'lab:work/' + r})
    q = 'lab:question/' + ch['kgid']
    nodes.append({'id': q, 'type': 'Question', 'label': {'ko': ch['q'], 'en': 'core question'}, 'page': page, 'anchor': '#top',
                  'status': 'known', 'confidence': 'high', 'domain': ['math'], 'match': []})
    edges.append({'s': topic, 'p': 'lab:raises', 'o': q})
    for pre in ch.get('pre', []):
        edges.append({'s': 'lab:concept/' + pre, 'p': 'lab:prerequisiteOf', 'o': 'lab:concept/' + ch['stages'][0]['kg']['id']})
    for r in ch['refs']:
        nodes.append({'id': 'lab:work/' + r, 'type': 'Work', 'label': {'ko': REFS[r]['title'], 'en': REFS[r]['title']},
                      'page': page, 'anchor': '#export', 'status': 'known', 'confidence': 'high', 'domain': ['math'], 'match': []})
    for st, k in [(s, s['kg']) for s in ch['stages']]:
        for r in k.get('refs', []):
            edges.append({'s': 'lab:concept/' + k['id'], 'p': 'lab:assertedIn', 'o': 'lab:work/' + r})
    ids = {x['id'] for x in nodes}
    edges = [e for e in edges if e['s'] in ids and e['o'] in ids]
    return {'version': '1.0', 'page': page, 'nodes': nodes, 'edges': edges}


def json_ld(kg, meta):
    ctx = {'@vocab': 'urn:lab:', 'lab': 'urn:lab:', 'skos': 'http://www.w3.org/2004/02/skos/core#', 'schema': 'https://schema.org/'}
    g = [{'@id': 'urn:lab:page/' + meta['number'], '@type': ['schema:LearningResource', 'schema:WebPage'], 'schema:name': meta['title'],
          'schema:inLanguage': 'ko', 'schema:educationalLevel': meta['educationalLevel'], 'schema:author': AUTHOR['name']}]
    for n in kg['nodes']:
        o = {'@id': n['id'], '@type': ['lab:' + n['type']], 'skos:prefLabel': [{'@value': n['label']['ko'], '@language': 'ko'}]}
        if n.get('definition'):
            o['skos:definition'] = [{'@value': n['definition']['ko'], '@language': 'ko'}]
        g.append(o)
    return {'@context': ctx, '@graph': g}


def refs_csl(ids):
    out = []
    for r in ids:
        R = REFS[r]
        out.append({'id': r, 'type': R['type'], 'title': R['title'], 'author': R['author'],
                    'issued': {'date-parts': [[R['year']]]} if R.get('year') else {},
                    'publisher': R.get('publisher', ''), 'container-title': R.get('container', ''),
                    'volume': R.get('volume', ''), 'page': R.get('pages', ''),
                    'lab': {'work': 'lab:work/' + r, 'role': R.get('role', 'background'), 'supports': [], 'locs': [],
                            'verified': R['verified']}})
    return out


def page_meta(ch):
    return {'title': ch['title'], 'number': '%02d' % ch['no'], 'series': SERIES, 'about': ['lab:topic/' + ch['kgid']],
            'basedOn': ch['refs'], 'educationalLevel': '입문 (중학생 이상)', 'creator': [{'name': AUTHOR['name'], 'role': 'author'}],
            'contributor': [{'name': 'AI 보조 제작', 'role': 'assistant'}], 'date': TODAY, 'version': '1.0', 'language': ['ko'],
            'license': '', 'url': SITE + ch['slug'] + '.html', 'registry': 'KG_00_registry 0.2',
            'learningResourceType': 'interactive explainer', 'seeAlso': '',
            'suggestedCitation': '%s (2026). %s. %s %02d, v1.0.' % (AUTHOR['name'], ch['title'], SERIES, ch['no'])}


def jscript(id_, obj, typ='application/json'):
    s = json.dumps(obj, ensure_ascii=False).replace('</', '<\\/')
    return '<script type="%s" id="%s">%s</script>' % (typ, id_, s)


# ───────────────────────── 챕터 페이지 ─────────────────────────
LEVEL = {1: 1, 2: 1, 3: 1, 4: 1, 5: 2, 6: 2, 7: 2, 8: 3, 9: 3, 10: 2, 11: 3, 12: 3, 13: 3, 14: 3, 15: 2}
MINUTES = {1: 25, 2: 20, 3: 25, 4: 25, 5: 25, 6: 25, 7: 25, 8: 30, 9: 30, 10: 25, 11: 30, 12: 30, 13: 30, 14: 30, 15: 25}
STARS = {1: '★☆☆ (입문)', 2: '★★☆ (보통)', 3: '★★★ (도전)'}
HARD = {(8, 3), (9, 3), (11, 3), (12, 3), (13, 3)}


def chapter(ch, prevc, nextc):
    global GLOSS
    GLOSS = dict(ch.get('gloss', {}))
    n = ch['no']
    stg = ch['stages']
    navl = ''.join('<a href="#lv%d">%d단계</a>' % (i, i) for i in range(1, len(stg) + 1))
    o = [head('%02d %s — %s' % (n, ch['title'], SERIES), ch['q'], og='img/og/og_%02d.webp' % n)]
    o.append(f'<nav class="top" aria-label="이 페이지 목차"><a class="logo" href="index.html">위상수학 교실</a><a href="#three">3줄 요약</a><a href="#class">수업</a><a href="#map">큰 그림</a>{navl}<a href="#ai">AI 판단</a><a href="#duel">대결</a><a href="#sum">정리</a><a href="#kg">색인</a><a href="#export">꾸러미</a></nav><div id="prog"></div>')
    # 표지 (대체 표지)
    cc = ['doc', 'fly', 'robo', ch['star'][0]]
    cm = ['front', 'magnify', 'smile', ch['star'][1]]
    chars = ''.join(img(w, m, cls='', extra=(' class="flipx"' if False else '')) for w, m in zip(cc, cm))
    o.append(f'''<div class="cover" id="top" role="img" aria-label="{esc(ch['title'])} 표지 — 박사, 초파리 연구원, 주판봇, {PEOPLE[ch['star'][0]][0]}">
<canvas class="bgpx" data-seed="{n*7+3}" data-motif="{n}" aria-hidden="true"></canvas>
<span class="badge">대체 표지 · 그림 대기 (IMG 명세서 cover_{n:02d})</span>
<div class="ctext"><span class="no">{ch['pillar_name']} · {n:02d}장</span><h1>{esc(ch['title'])}</h1><p>{esc(ch['sub'])}</p></div>
<div class="cchars">{chars}</div></div>''')
    # 히어로
    kp = ''.join('<div class="kpi %s"><b>%s</b><span>%s</span></div>' % (c, esc(v), rich(t)) for c, v, t in ch['kpis'])
    o.append(f'''<header class="hero"><div class="wrap">
<div class="kicker">{esc(ch['pillar_name'])} · {n:02d}장 · 오늘의 수업: {esc(ch['format'][0])} · 난이도 {STARS[LEVEL.get(n, 2)]} · 약 {MINUTES.get(n, 25)}분</div>
<h1>{esc(ch['title'])}</h1>
<p class="q">핵심 질문 — {esc(ch['q'])}</p>
<p>{rich(ch['intro'])}</p>
<div class="kpis">{kp}</div>
<p class="note">숫자 요약은 이 장의 예시 계산에서 나온 값입니다(실제 데이터가 아닌 설명용 값).</p>
{says(ch['hero_say'])}
</div></header>''')
    # 3줄
    ab = ''.join('<li><b>%s</b> — %s</li>' % (esc(a), esc(b)) for a, b in ch.get('abbr', []))
    o.append(f'''<div class="wrap"><div class="three" id="three"><h2>처음 오신 분께 — 이 페이지를 3줄로</h2><ol>
<li><b>무엇을:</b> {rich(ch['three'][0])}</li><li><b>왜 중요한가:</b> {rich(ch['three'][1])}</li><li><b>생활·현장에서는:</b> {rich(ch['three'][2])}</li></ol>
<p class="note">행렬·벡터, 복잡한 공식을 몰라도 됩니다. 그림을 움직여 보고, 밑줄 친 말을 누르면 뜻이 나옵니다.</p>
{('<details><summary>영어 기호·약어 풀이 (펼치기)</summary><ul>'+ab+'</ul></details>') if ab else ''}
</div></div>''')
    # 등장인물
    castl = ''.join('<div>%s<div><span class="role">%s</span><b>%s</b><span>%s</span></div></div>' % (
        img(w, PEOPLE[w][2], cls=''), esc(PEOPLE[w][1]), esc(PEOPLE[w][0]), esc(ch.get('castnote', {}).get(w, PEOPLE[w][3]))) for w in
        ['doc', 'fly', 'robo', 'sia', 'moa', 'asst', 'x1', 'x2', 'x3'])
    prevlink = '<a href="%s">%s</a>' % (prevc[0], esc(prevc[1])) if prevc else '없음 (첫 장)'
    o.append(f'''<section class="level" id="cast"><div class="wrap"><h2>등장인물 — 선생님 1명, 조교 2명, 수강생 6명</h2>
<div class="cast">{castl}</div>
<p class="note">이 페이지 사용법: 밑줄 친 말을 누르면 뜻이 나옵니다(Esc로 닫기). 단계마다 그림을 직접 움직여 보고, 끝의 확인 퀴즈로 점검하세요. 앞 장: {prevlink}</p>
</div></section>''')
    # 수업 형식
    k = ch['klass']
    groups = ''
    if k.get('groups', True):
        g1 = ''.join(img(w, 'e13', cls='') for w in ['sia', 'asst', 'x1'])
        g2 = ''.join(img(w, 'e13', cls='') for w in ['moa', 'x2', 'x3'])
        groups = f'<div class="groups"><div>{g1} <b>1조 「도넛조」</b> 시아 · 하루 · X1</div><div>{g2} <b>2조 「머그조」</b> 모아 · X2 · X3</div></div>'
    flow = ''.join('<li>%s</li>' % rich(x) for x in k['flow'])
    o.append(f'''<section class="level" id="class"><div class="wrap"><h2>오늘의 수업 — {esc(ch['format'][0])}</h2>
<div class="klass"><span class="fmt">{esc(ch['format'][0])}</span><p>{rich(ch['format'][1])}</p>{groups}<ol>{flow}</ol></div>
<div class="talk">{says(k['talk'])}</div></div></section>''')
    # 왜
    wy = ''.join('<div><b class="n">%d</b><b>%s</b><p>%s</p></div>' % (i + 1, esc(a), rich(b)) for i, (a, b) in enumerate(ch['why']))
    o.append(f'<section class="level" id="why"><div class="wrap"><h2>왜 이 주제를 배우나</h2><div class="steps">{wy}</div></div></section>')
    # 큰 그림
    m = ch['map']
    rc = ''.join('<div class="recap"><b>30초 복습 — %s</b><br>%s</div>' % (esc(a), rich(b)) for a, b in ch.get('recap', []))
    o.append(f'''<section class="level" id="map"><div class="wrap"><h2>큰 그림 — 지금 어디쯤 있나</h2>
<div class="map3"><div><small>앞에서 배운 것</small>{rich(m[0])}</div><i aria-hidden="true">→</i><div class="now"><small>이번 장</small>{rich(m[1])}</div><i aria-hidden="true">→</i><div><small>다음에 쓰는 곳</small>{rich(m[2])}</div></div>
{rc}<p>{rich(m[3])}</p></div></section>''')
    # 단계
    for i, st in enumerate(stg, 1):
        o.append(stage_html(ch, i, st))
    # AI 판단 코너
    a = ch['ai']
    o.append(f'''<section class="level" id="ai"><div class="wrap"><div class="aic"><h3>AI 판단 코너 — AI가 낸 답, 그대로 믿어도 될까?</h3>
<p>{rich(a['setup'])}</p><div class="aiout">{esc(a['out'])}</div>
<div class="quiz" data-quiz="ai"></div>
{say('doc', 'board', a['doc'])}</div></div></section>''')
    # 대결
    d = ch['duel']
    o.append(f'''<section class="level" id="duel"><div class="wrap"><h2>조교 대결 — {esc(d['title'])}</h2>
<p>{rich(d['setup'])}</p>
<div class="duel"><div class="vs"><div class="side fly">{img('fly', 'point', cls='')}<b style="color:var(--c-fly)">초파리 연구원</b><p>「{rich(d['fly'])}」</p></div>
<div class="vsm" aria-hidden="true">VS</div>
<div class="side robo">{img('robo', 'calc', cls='')}<b style="color:var(--c-robo)">주판봇</b><p>「{rich(d['robo'])}」</p></div></div>
<div class="ctrl" style="justify-content:center"><button class="bt primary duel-run" type="button">계산으로 판정하기</button></div>
<div class="verdict" aria-live="polite"><p class="note">누가 맞을지 먼저 예상해 보고 단추를 누르세요. 판정은 계산 결과로만 합니다.</p></div></div>
{('<div class="panel"><div class="ptitle">판정 계산 들여다보기</div><div data-w="%s" data-o="%s"></div></div>' % (d['w'], esc(json.dumps(d.get('o', {}), ensure_ascii=False)))) if d.get('w') else ''}
</div></section>''')
    USED.update({('fly', 'e16'), ('fly', 'cry'), ('robo', 'happy'), ('robo', 'cry'), ('asst', 'report'), ('doc', 'verdict')})
    # 정리
    rows = ''.join('<tr><td><b>%s</b></td><td>%s</td><td>%s</td><td>%s</td></tr>' % (rich(a), rich(b), rich(c), rich(e)) for a, b, c, e in ch['sum'])
    chain = ' → '.join('<span class="tag nn">%s</span>' % esc(s['kg']['ko']) for s in stg)
    o.append(f'''<section class="level" id="sum"><div class="wrap"><h2>정리 — 개념정리 한눈에</h2>
<p>개념정리 흐름: {chain}</p>
<div class="tw"><table class="tb"><thead><tr><th>개념</th><th>한 줄 뜻</th><th>일상 비유</th><th>비유의 한계</th></tr></thead><tbody>{rows}</tbody></table></div>
</div></section>''')
    # 아웃트로
    o.append(f'''<section class="level" id="outro"><div class="wrap"><h2>수업을 마치며</h2><div class="outro">{says(ch['outro'])}</div>
<p class="note">다음 장 예고: {rich(ch['next_hint'])}</p></div></section>''')
    # 지식 색인 + 꾸러미
    o.append('<section class="level" id="kg"><div class="wrap"><h2>지식 색인 — 이 페이지에서 찾아보기</h2><div id="kg-mount"></div></div></section>')
    o.append('<section class="level" id="export"><div class="wrap"><h2>온톨로지·서지 꾸러미 — 이 페이지의 지식을 가져가기</h2><div id="export-mount"></div></div></section>')
    # 바닥글
    srcrows = ''.join('<tr><td>%s</td><td>%s</td></tr>' % (esc(REFS[r]['short']), esc(REFS[r]['use'])) for r in ch['refs'])
    examples = ''.join('<li>%s</li>' % rich(x) for x in ch['examples'])
    extra = f'''<h3>출처</h3><div class="tw"><table class="tb"><thead><tr><th>자료</th><th>이 페이지에서 쓴 곳</th></tr></thead><tbody>{srcrows}</tbody></table></div>
<h3>예시값·설명용 모형인 것</h3><ul>{examples}</ul>'''
    o.append(footer_html(prevc, nextc, extra))
    kg = build_kg(ch)
    meta = page_meta(ch)
    quiz = {('q%d' % i): s['quiz'] for i, s in enumerate(stg, 1)}
    quiz['ai'] = a['quiz']
    o.append(jscript('page-data', {'quiz': quiz, 'duel': {'run': d['run'], 'lesson': d['lesson']}}))
    o.append(jscript('kg-raw', kg))
    o.append(jscript('kg-ld', json_ld(kg, meta), 'application/ld+json'))
    o.append(jscript('refs-csl', refs_csl(ch['refs'])))
    o.append(jscript('page-meta', meta))
    o.append(foot_scripts())
    return '\n'.join(o)


def stage_html(ch, i, st):
    o = ['<section class="level" id="lv%d"><div class="wrap">' % i]
    tags = ''.join('<span class="tag %s">%s</span>' % (('fly' if t.startswith('일상') else 'nn'), esc(t)) for t in st['tags'])
    o.append('<div class="lvhead"><div class="hex" aria-hidden="true">%d</div><div><h2>%d단계 · %s</h2>%s</div></div>' % (i, i, esc(st['title']), tags))
    if (ch['no'], i) in HARD:
        o.append('<div class="rest"><b>도전 단계</b> — 이 장에서 가장 어려운 단계예요. 처음 읽을 때는 그림 실험과 「박사의 해석」만 보고 넘어가도 다음 장을 읽는 데 문제없어요.</div>')
    o.append(say('doc', 'board', '<b>상황 질문</b> — ' + st['situ']))
    if st.get('recap'):
        o.append('<div class="recap"><b>30초 복습 — %s</b><br>%s</div>' % (esc(st['recap'][0]), rich(st['recap'][1])))
    w, f = st.get('why'), st.get('math')
    if w or f:
        o.append('<div class="twobox">')
        if w:
            o.append('<div class="whybox"><h3>왜 이 방법을 쓰나</h3><ol><li><b>문제 상황:</b> %s</li><li><b>앞 방법의 한계:</b> %s</li><li><b>해법:</b> %s</li></ol><div class="easy"><b>쉽게 말하면</b> — %s</div></div>' % (
                rich(w[0]), rich(w[1]), rich(w[2]), rich(w[3])))
        if f:
            rows = ''.join('<tr><td>%s</td><td>%s</td><td>%s</td></tr>' % (a, esc(b), rich(c)) for a, b, c in f['parts'])
            tryit = ''.join('<p>%s</p>' % rich(x) for x in f['try'])
            o.append('<div class="mathbox"><h3>수학 수식을 어려워하는 조수가 대신 물어봅니다</h3>%s<p><b>학교 수학으로 보면:</b> %s</p>'
                     '<table class="sym"><thead><tr><th>식 조각</th><th>읽는 법</th><th>뜻</th></tr></thead><tbody>%s</tbody></table>'
                     '<div class="tryit"><b>숫자로 한 번 해 보기</b>%s</div>%s</div>' % (
                         say('asst', 'shock', f['q'], name='조수 하루 (수강생)'), rich(f['school']), rows, tryit,
                         say('asst', 'spark', f['comment'], name='조수 하루 (수강생)')))
        o.append('</div>')
    p = st['pair']
    o.append('<div class="pair"><div><span class="tag fly">일상으로 치면</span><p>%s</p></div><div><span class="tag nn">위상수학에서는</span><p>%s</p></div></div>' % (rich(p[0]), rich(p[1])))
    o.append('<div class="talk">%s</div>' % says(st['talk']))
    o.append('<div class="panel"><div class="ptitle">%s</div><div data-w="%s" data-o="%s"></div></div>' % (
        esc(st['panel']), st['w'], esc(json.dumps(st.get('o', {}), ensure_ascii=False))))
    ex = ''.join('<li>%s</li>' % rich(x) for x in st['explain'])
    o.append('<div class="explain"><h3>풀이 — 한 걸음씩</h3><ol>%s</ol><div class="lim"><b>이 단계의 한계</b> — %s</div><div class="interp"><b>박사의 해석</b> — %s</div></div>' % (
        ex, rich(st['limit']), rich(st['interp'])))
    if st.get('rest'):
        o.append('<div class="rest">%s</div>' % rich(st['rest']))
    if st.get('src'):
        s = st['src']
        fixes = ''.join('<div class="fix">%s</div>' % rich(x) for x in s.get('fix', []))
        o.append('<details><summary>원자료 인포그래픽 보기 (영어 그림)</summary><p class="note">%s</p>%s<img loading="lazy" src="img/source/src%02d.webp" width="1280" height="714" alt="%s"></details>' % (
            rich(s['cap']), fixes, s['n'], esc(s['alt'])))
    if st.get('expert'):
        o.append('<details><summary>더 알고 싶은 분께 — 정확한 정의 (몰라도 됩니다)</summary>%s</details>' % rich(st['expert']))
    o.append('<div class="quiz" data-quiz="q%d"></div>' % i)
    o.append('</div></section>')
    return ''.join(o)


GENERIC = {'think': 'e09', 'firm': 'e12', 'explain': 'e07', 'guide': 'e08', 'proud': 'e16', 'smile': 'e13', 'cheer': 'e12', 'sparkle': 'e19', 'shock': 'e24', 'cry': 'e21', 'report': 'e07', 'spark': 'e01', 'sigh': 'e02', 'doze': 'e17', 'tea': 'e01', 'ok': 'e10', 'point': 'e08', 'board': 'e07', 'calc': 'e09', 'happy': 'e12', 'wow': 'e04', 'meh': 'e18', 'blush': 'e14', 'chart': 'e07', 'coin': 'e16', 'clip': 'e10', 'arms': 'e16', 'magnify': 'e07', 'front': 'e08', 'judge': 'e10', 'verdict': 'e18'}


def sprites(packdir):
    keys = set()
    amap = json.load(open(os.path.join(packdir, 'expression_map.json'), encoding='utf-8'))
    alias = {}
    for who, mood in USED:
        k = who + '_' + mood
        if re.match(r'^e\d\d$', mood):
            keys.add(k)
        elif k in amap:
            keys.add(amap[k]['key']); alias[k] = amap[k]['key']
        elif mood in GENERIC:
            keys.add(who + '_' + GENERIC[mood]); alias[k] = who + '_' + GENERIC[mood]
        else:
            raise SystemExit('알 수 없는 표정: ' + k)
    for w, b in [('doc', 'e08'), ('asst', 'e13'), ('fly', 'e10'), ('robo', 'e13'), ('sia', 'e13'), ('moa', 'e13'), ('x1', 'e13'), ('x2', 'e13'), ('x3', 'e13')]:
        keys.add(w + '_' + b)
    out = subprocess.run([sys.executable, os.path.join(packdir, 'build_character_pack.py'), '--pack', packdir, '--pick', ','.join(sorted(keys)), '--size', '96'],
                         capture_output=True, text=True, check=True).stdout
    js = out + '\nvar SPRITE_ALIAS=' + json.dumps(alias, ensure_ascii=False) + ';\n'
    open(os.path.join(ROOT, 'assets', 'sprites.js'), 'w', encoding='utf-8').write(js)
    print('sprites', len(keys), 'keys', len(js) // 1024, 'KB')


def main():
    ws = ''.join(open(os.path.join(ROOT, 'assets', 'src', f), encoding='utf-8').read() + '\n' for f in ['w1.js', 'w2.js', 'w3.js'])
    open(os.path.join(ROOT, 'assets', 'widgets.js'), 'w', encoding='utf-8').write(ws)
    pack = None
    if '--sprites' in sys.argv:
        pack = sys.argv[sys.argv.index('--sprites') + 1]
    chs = []
    for c in CHAPTERS:
        if os.path.exists(os.path.join(ROOT, 'content', c[0] + '.py')):
            chs.append(load(c[0]).CH)
    for i, ch in enumerate(chs):
        prevc = (chs[i - 1]['slug'] + '.html', '%02d %s' % (chs[i - 1]['no'], chs[i - 1]['title'])) if i else ('index.html', '오리엔테이션')
        nextc = (chs[i + 1]['slug'] + '.html', '%02d %s' % (chs[i + 1]['no'], chs[i + 1]['title'])) if i + 1 < len(chs) else ('practice/index.html', '마지막 장 · 실전 연습장')
        open(os.path.join(ROOT, ch['slug'] + '.html'), 'w', encoding='utf-8').write(chapter(ch, prevc, nextc))
        print('built', ch['slug'])
    import index_page, practice_page
    index_page.build(sys.modules[__name__], chs)
    practice_page.build(sys.modules[__name__], chs)
    import shutil
    shutil.copy(os.path.join(ROOT, 'assets', 'src', 'practice.js'), os.path.join(ROOT, 'assets', 'practice.js'))
    if pack:
        sprites(pack)


if __name__ == '__main__':
    main()
