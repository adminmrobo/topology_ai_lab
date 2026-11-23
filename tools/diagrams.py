"""인포그래픽용 작은 도식 (정적 SVG, 320×240). 색은 lab.css 토큰과 같다."""
import math

K, MU, RULE, G, M, R, A, B, ACC = '#16212b', '#5b6874', '#d5dbe2', '#13733a', '#9b3fb5', '#c9302c', '#a35c00', '#1e55c8', '#2f6f8f'


def T(x, y, s, c=K, size=13, w=400, anchor='start'):
    return f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{c}" font-weight="{w}" text-anchor="{anchor}">{s}</text>'


def wrap(body, label):
    return f'<svg viewBox="0 0 320 240" width="100%" role="img" aria-label="{label}" style="max-width:420px;font-family:inherit">{body}</svg>'


def interval():
    o = []
    for y, l, r, lab in [(70, 'o', 'o', '(0, 1) — 열림'), (170, 'c', 'c', '[0, 1] — 닫힘')]:
        o.append(f'<line x1="40" y1="{y}" x2="280" y2="{y}" stroke="{G}" stroke-width="8"/>')
        for x, k in [(40, l), (280, r)]:
            o.append(f'<circle cx="{x}" cy="{y}" r="9" fill="{"#fff" if k == "o" else G}" stroke="{G}" stroke-width="3"/>')
        o.append(T(160, y - 22, lab, K, 14, 700, 'middle'))
    o.append(f'<rect x="222" y="58" width="44" height="24" fill="rgba(19,115,58,.12)" stroke="{G}" stroke-dasharray="4 3"/>')
    o.append(f'<circle cx="244" cy="70" r="6" fill="{B}"/>' + T(244, 104, '여유 있음', G, 12, 400, 'middle'))
    o.append(f'<circle cx="280" cy="170" r="5" fill="{R}"/>' + T(280, 204, '여유 0', R, 12, 400, 'middle'))
    return wrap(''.join(o), '열린 구간과 닫힌 구간의 여유 비교')


def discrete():
    o = []
    pts = [(50, 80), (100, 80), (50, 150), (100, 150)]
    for x, y in pts:
        o.append(f'<circle cx="{x}" cy="{y}" r="20" fill="rgba(30,85,200,.08)" stroke="{B}" stroke-width="2"/><circle cx="{x}" cy="{y}" r="5" fill="{K}"/>')
    o.append(T(75, 210, '이산: 점마다 방 하나', B, 13, 700, 'middle'))
    o.append(f'<ellipse cx="235" cy="115" rx="65" ry="62" fill="rgba(155,63,181,.08)" stroke="{M}" stroke-width="2"/>')
    for x, y in [(210, 90), (260, 90), (210, 140), (260, 140)]:
        o.append(f'<circle cx="{x}" cy="{y}" r="5" fill="{K}"/>')
    o.append(T(235, 210, '밀착: 모두 한 방', M, 13, 700, 'middle'))
    o.append(f'<line x1="160" y1="30" x2="160" y2="200" stroke="{RULE}" stroke-dasharray="4 4"/>')
    return wrap(''.join(o), '이산 위상과 밀착 위상 비교 그림')


def islands():
    o = [f'<path d="M20 60 q30 -30 70 -5 q30 20 0 55 q-40 30 -70 -5z" fill="rgba(19,115,58,.18)" stroke="{G}" stroke-width="2"/>',
         f'<path d="M150 50 q40 -25 70 5 q20 35 -15 55 q-45 15 -55 -20z" fill="rgba(19,115,58,.18)" stroke="{G}" stroke-width="2"/>',
         f'<line x1="122" y1="20" x2="122" y2="130" stroke="{R}" stroke-width="2.5" stroke-dasharray="6 4"/>', T(122, 146, '바다에 줄 → 분리', R, 12, 700, 'middle')]
    import random
    rnd = random.Random(7)
    for _ in range(40):
        o.append(f'<circle cx="{rnd.uniform(20, 300):.1f}" cy="{rnd.uniform(165, 230):.1f}" r="2.2" fill="#fff" stroke="{MU}"/>')
    o.append(f'<polyline points="25,200 160,168 295,205" fill="none" stroke="{G}" stroke-width="3"/>')
    o.append(f'<circle cx="25" cy="200" r="5" fill="{B}"/><circle cx="295" cy="205" r="5" fill="{B}"/>')
    o.append(T(160, 238, '구멍을 피한 꺾은선', G, 12, 700, 'middle'))
    return wrap(''.join(o), '두 섬의 분리와 구멍을 피하는 길')


def umbrella():
    o = []
    for y, closed in [(95, False), (205, True)]:
        o.append(f'<line x1="40" y1="{y}" x2="280" y2="{y}" stroke="{K}" stroke-width="4"/>')
        o.append(f'<circle cx="40" cy="{y}" r="6" fill="{K if closed else "#fff"}" stroke="{K}" stroke-width="2"/>')
        for k in range(2, 7):
            x0 = 40 + 240 / k
            o.append(f'<path d="M{x0:.1f} {y - 6} Q{(x0 + 290) / 2:.1f} {y - 40 - k * 4} 290 {y - 6}" fill="none" stroke="{B}" stroke-width="2" opacity=".55"/>')
        if closed:
            o.append(f'<path d="M22 {y - 6} Q46 {y - 40} 70 {y - 6}" fill="none" stroke="{A}" stroke-width="3"/>')
            o.append(T(160, y + 26, '[0, 1]: 0을 덮는 우산 + 하나 = 2개', G, 12, 700, 'middle'))
        else:
            o.append(f'<rect x="40" y="{y - 8}" width="40" height="16" fill="rgba(201,48,44,.3)"/>')
            o.append(T(160, y + 26, '(0, 1): 0 옆이 늘 젖음', R, 12, 700, 'middle'))
    return wrap(''.join(o), '우산 덮개 비교')


def pixel():
    o = []
    N, c, k, s = 9, 4, 3, 22
    for y in range(N):
        for x in range(N):
            d = abs(x - c) + abs(y - c)
            f = K if d == k else ('rgba(30,85,200,.15)' if d < k else '#fff')
            o.append(f'<rect x="{60 + x * s}" y="{12 + y * s}" width="{s - 1}" height="{s - 1}" fill="{f}" stroke="{RULE}"/>')
    o.append(f'<path d="M{60 + 6 * s} {12 + 1 * s} l{s} {-s}" stroke="{R}" stroke-width="3"/>')
    o.append(T(160, 232, '대각선 틈: 안이 새는가, 막히는가?', R, 12, 700, 'middle'))
    return wrap(''.join(o), '픽셀 마름모 고리')


def zigzag():
    o = []
    xs = [40, 100, 160, 220, 280]
    ys = [70, 170, 70, 170, 70]
    for i in range(4):
        o.append(f'<line x1="{xs[i]}" y1="{ys[i]}" x2="{xs[i + 1]}" y2="{ys[i + 1]}" stroke="{MU}" stroke-width="2"/>')
    for i, (x, y) in enumerate(zip(xs, ys)):
        top = y == 70
        o.append(f'<circle cx="{x}" cy="{y}" r="16" fill="{"#fff" if top else K}" stroke="{K}" stroke-width="2"/>')
        o.append(T(x, y + 5, str(i - 1), K if top else '#fff', 12, 700, 'middle'))
    o.append(T(160, 35, '위: 홀수 = 열린 점', G, 13, 700, 'middle') + T(160, 215, '아래: 짝수 = 닫힌 점 (위 이웃을 데려옴)', MU, 12, 400, 'middle'))
    o.append(f'<path d="M100 150 L100 100" stroke="{G}" stroke-width="2" marker-end="url(#ar)"/>')
    return wrap('<defs><marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8z" fill="#13733a"/></marker></defs>' + ''.join(o), '칼림스키 조각의 위아래 순서')


def orbit():
    o = [f'<rect x="80" y="30" width="160" height="160" fill="#fff" stroke="{K}" stroke-width="2"/>', f'<circle cx="160" cy="110" r="7" fill="{R}"/>']
    dx, dy = 50, -30
    for r in range(4):
        a = r * math.pi / 2
        x = 160 + dx * math.cos(a) - dy * math.sin(a)
        y = 110 + dx * math.sin(a) + dy * math.cos(a)
        o.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="6" fill="{B}"/>')
    return wrap(''.join(o), '정사각형 회전의 궤도와 안정자')


def tower():
    o = []
    labs = ['④ 이산 작용', '③ 이산 궤도', '② 떠도는 작용', '① 고유 불연속']
    for i, lab in enumerate(labs):
        w = 140 + i * 45
        x = 160 - w / 2
        y = 25 + i * 50
        o.append(f'<rect x="{x}" y="{y}" width="{w}" height="40" rx="4" fill="{"rgba(19,115,58,.16)" if i == 3 else "#fff"}" stroke="{K}"/>')
        o.append(T(160, y + 25, lab, K, 13, 700 if i == 3 else 400, 'middle'))
    o.append(T(160, 236, '아래층 통과 ⇒ 위층도 통과', G, 12, 700, 'middle'))
    return wrap(''.join(o), '얌전한 작용의 네 층 탑')


def hexgrid():
    o = []
    r = 26
    h = r * math.sqrt(3)
    for row in range(-2, 3):
        for col in range(-3, 4):
            cx = 160 + col * 1.5 * r
            cy = 120 + row * h + (h / 2 if col % 2 else 0)
            pts = ' '.join(f'{cx + r * math.cos(math.pi / 3 * k):.1f},{cy + r * math.sin(math.pi / 3 * k):.1f}' for k in range(6))
            me = row == 0 and col == 0
            o.append(f'<polygon points="{pts}" fill="{"rgba(253,226,150,.9)" if me else "#f6f8fa"}" stroke="{A if me else RULE}" stroke-width="{2.5 if me else 1}"/>')
            o.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="3" fill="{R if me else K}"/>')
    return wrap(''.join(o), '벌집 격자와 정육각형 디리클레 영역')


def helix():
    o = [f'<ellipse cx="160" cy="190" rx="110" ry="24" fill="none" stroke="{K}" stroke-width="2.5"/>']
    pts = []
    t = -0.3
    while t <= 4 * math.pi + 0.3:
        pts.append(f'{160 + 110 * math.cos(t):.1f},{190 + 24 * math.sin(t) - (t / (2 * math.pi) + 1.4) * 42:.1f}')
        t += 0.08
    o.append(f'<polyline points="{" ".join(pts)}" fill="none" stroke="#7c8794" stroke-width="2.5"/>')
    th = 1.1
    bx, by = 160 + 110 * math.cos(th), 190 + 24 * math.sin(th)
    o.append(f'<circle cx="{bx:.1f}" cy="{by:.1f}" r="6" fill="{R}"/>')
    for k in range(2):
        y = by - (th / (2 * math.pi) + k + 1.4) * 42
        o.append(f'<line x1="{bx:.1f}" y1="{y:.1f}" x2="{bx:.1f}" y2="{by:.1f}" stroke="{RULE}" stroke-dasharray="3 3"/><circle cx="{bx:.1f}" cy="{y:.1f}" r="6" fill="{B}"/>')
    o.append(T(160, 236, '빨강 위의 파란 점들 = 올(층마다 하나)', MU, 12, 400, 'middle'))
    return wrap(''.join(o), '원 위의 나선형 덮개와 올')


def divisors():
    o = []
    for i, (n, lab) in enumerate([(12, '12겹 덮개 ↔ 12ℤ'), (4, '4겹 덮개 ↔ 4ℤ'), (1, '원 자신 ↔ ℤ')]):
        cy = 50 + i * 75
        for k in range(n):
            a = 2 * math.pi * k / n
            o.append(f'<circle cx="{70 + 32 * math.cos(a):.1f}" cy="{cy + 22 * math.sin(a):.1f}" r="{4 if n > 4 else 6}" fill="{B}"/>')
        o.append(f'<ellipse cx="70" cy="{cy}" rx="32" ry="22" fill="none" stroke="{RULE}"/>')
        o.append(T(120, cy + 5, lab, K, 13, 700))
        if i < 2:
            o.append(T(122, cy + 42, '↓ ' + ('3겹으로 얹힘' if i == 0 else '4겹으로 얹힘'), G, 12))
    return wrap(''.join(o), '덮개와 부분군의 짝, 포함 관계는 거꾸로')


def worlds():
    o = [f'<rect x="15" y="60" width="110" height="110" rx="14" fill="rgba(163,92,0,.08)" stroke="{A}" stroke-width="2"/>', T(70, 54, '집합의 세계', A, 13, 700, 'middle'),
         f'<rect x="195" y="60" width="110" height="110" rx="14" fill="rgba(155,63,181,.08)" stroke="{M}" stroke-width="2"/>', T(250, 54, '공간의 세계', M, 13, 700, 'middle')]
    for x, y in [(50, 100), (90, 120), (60, 140)]:
        o.append(f'<circle cx="{x}" cy="{y}" r="5" fill="{K}"/>')
    for x, y in [(230, 100), (270, 120), (240, 140)]:
        o.append(f'<circle cx="{x}" cy="{y}" r="12" fill="none" stroke="{B}"/><circle cx="{x}" cy="{y}" r="5" fill="{K}"/>')
    o.append(f'<path d="M130 90 Q160 40 190 90" fill="none" stroke="{G}" stroke-width="3"/>' + T(160, 22, '옷 입히기 Disc →', G, 12, 700, 'middle'))
    o.append(f'<path d="M190 150 Q160 170 130 150" fill="none" stroke="{R}" stroke-width="3"/>' + T(160, 188, '← 옷 벗기기 U', R, 12, 700, 'middle'))
    o.append(T(160, 226, '두 번역기는 「짝」 (반대는 아님)', MU, 12, 400, 'middle'))
    return wrap(''.join(o), '집합과 공간 세계를 오가는 두 번역기')


def branches():
    o = [f'<line x1="20" y1="120" x2="120" y2="120" stroke="{K}" stroke-width="3"/>']
    for i in range(1, 6):
        o.append(f'<circle cx="{20 + i * 18}" cy="120" r="4" fill="{K}"/>')
    o.append(f'<path d="M120 120 Q200 120 270 55" fill="none" stroke="{B}" stroke-width="3"/>' + T(275, 45, '짝수 끝', B, 13, 700, 'end'))
    o.append(f'<path d="M120 120 Q200 120 270 185" fill="none" stroke="{M}" stroke-width="3"/>' + T(275, 210, '홀수 끝', M, 13, 700, 'end'))
    o.append(f'<circle cx="275" cy="55" r="8" fill="#fff" stroke="{B}" stroke-width="3"/><circle cx="275" cy="185" r="8" fill="#fff" stroke="{M}" stroke-width="3"/>')
    o.append(T(70, 100, '1 2 3 4 5 …', MU, 12, 400, 'middle') + T(160, 236, '(−1)ⁿ의 끝값: 짝수 끝 +1, 홀수 끝 −1', K, 12, 400, 'middle'))
    return wrap(''.join(o), '무한으로 가는 두 길과 서로 다른 끝점')


def cantor():
    o = []
    segs = [(0.0, 1.0)]
    for L in range(5):
        for a, b in segs:
            o.append(f'<rect x="{20 + a * 280:.1f}" y="{20 + L * 22}" width="{max(1, (b - a) * 280):.1f}" height="10" fill="{MU}"/>')
        nxt = []
        for a, b in segs:
            t = (b - a) / 3
            nxt += [(a, a + t), (b - t, b)]
        segs = nxt
    for i, (m, r) in enumerate([(2, 1), (4, 3), (8, 7), (16, 15)]):
        x = 30 + i * 72
        o.append(f'<rect x="{x}" y="150" width="62" height="34" rx="6" fill="rgba(30,85,200,.1)" stroke="{B}"/>' + T(x + 31, 172, f'÷{m} → {r}', B, 12, 700, 'middle'))
    o.append(T(160, 214, '−1의 나머지 줄 → 2진수 …1111', K, 13, 700, 'middle'))
    return wrap(''.join(o), '캔터 집합과 −1의 나머지 줄')


def pillars():
    o = [f'<rect x="60" y="15" width="200" height="34" rx="6" fill="rgba(253,226,150,.8)" stroke="{A}"/>', T(160, 37, '이산 위상', K, 14, 700, 'middle')]
    for i, lab in enumerate(['공간 분류', '대수적 작용', '보편 대상']):
        x = 30 + i * 100
        o.append(f'<line x1="160" y1="49" x2="{x + 30}" y2="80" stroke="{MU}"/>')
        o.append(f'<rect x="{x}" y="80" width="60" height="120" rx="4" fill="#f6f8fa" stroke="{ACC}" stroke-width="2"/>')
        o.append(T(x + 30, 216, lab, ACC, 12, 700, 'middle') + T(x + 30, 145, f'기둥 {i + 1}', K, 12, 700, 'middle'))
    return wrap(''.join(o), '이산 위상에서 갈라진 세 기둥')


DIA = {'interval': interval, 'discrete': discrete, 'islands': islands, 'umbrella': umbrella, 'pixel': pixel, 'zigzag': zigzag, 'orbit': orbit,
       'tower': tower, 'hex': hexgrid, 'helix': helix, 'divisors': divisors, 'worlds': worlds, 'branches': branches, 'cantor': cantor, 'pillars': pillars}
