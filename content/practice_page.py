"""마지막 장 · 실전 연습장 조립"""
import os


def build(B, chs):
    B.USED.update({('doc', 'judge'), ('doc', 'think'), ('asst', 'report'), ('fly', 'magnify'), ('robo', 'calc')})
    o = [B.head('마지막 장 · 실전 연습장 — ' + B.SERIES, '픽셀 사진관, 타일 공장, 빙글빙글 주차장, 우산 대여점을 운영하며 위상수학 개념을 써 보는 시뮬레이터.', depth=1, og='../img/og/og_practice.webp')]
    o.append('<nav class="top" aria-label="실전 연습장 목차"><a class="logo" href="../index.html">위상수학 교실</a><a href="#sim">사업장</a><a href="#wrap">마무리</a><a href="../15_final_review.html">15장 종합</a></nav><div id="prog"></div>')
    o.append('<header class="hero"><div class="wrap"><div class="kicker">마지막 장 · 실전 연습장</div><h1>위상수학 사업장 시뮬레이터</h1>'
             '<p class="q">핵심 질문 — 배운 개념으로 「가상 사업장」의 결정을 내리면, 숫자가 어떻게 달라질까?</p>'
             '<p>사업장 네 곳을 탭으로 골라 운영해 보세요. 초록 상자는 시장 환경(내가 못 바꾸는 조건), 파란 상자는 내 결정이에요. 성적표·그래프·캐릭터 대사가 바로 바뀌고, 미션 3개는 조작한 뒤에 자동으로 판정돼요. 주소 끝에 #pixel, #tile, #park, #umb를 붙이면 그 사업장이 바로 열려요.</p>'
             + B.says([('doc', 'front', '마지막 장은 실습입니다. 정답은 계산이 판정해요. 미션 세 개씩, 모두 열두 개!'), ('moa', 'cheer', '사업장 네 곳 다 운영해 볼래요!')]) + '</div></header>')
    o.append('<section class="level" id="sim" style="padding-top:24px"><div class="wrap"></div></section>')
    o.append('''<section class="level" id="wrap"><div class="wrap"><h2>마무리 — 네 사업장이 함께 묻는 질문</h2>
<p>네 사업장은 모두 「규칙(위상·작용)을 무엇으로 정하느냐가 숫자를 바꾼다」는 같은 질문을 던져요. 픽셀 사진관에서는 이웃 규칙이 물체 수를, 타일 공장에서는 격자 모양이 줄눈 비용을, 주차장에서는 감은 수가 도착 층을, 우산 대여점에서는 끝점 하나가 「유한 개로 충분한가」를 바꿨어요. 결과 숫자를 믿기 전에 그 숫자를 만든 규칙을 먼저 확인하는 것 — 이것이 이 시리즈가 말하는 「AI 결과를 판단하는 힘」이에요.</p>
<div class="lim"><b>모형의 한계</b> — 사업장의 숫자(단가, 우산 범위, 사진 크기)는 모두 교육용 예시값이에요. 실제 영상 처리·건축 자재·주차장 설계에는 훨씬 많은 조건이 붙어요. 이 페이지의 결과는 경영·투자 권고가 아닙니다.</div>
</div></section>''')
    o.append(B.footer_html(('../15_final_review.html', '15 종합 — 기말 쪽지시험과 졸업 발표'), ('../index.html', '오리엔테이션으로'), '').replace('href="15', 'href="../15'))
    o.append('<script src="../assets/sprites.js"></script><script src="../assets/widgets.js"></script><script src="../assets/lab.js"></script><script src="../assets/practice.js"></script></body></html>')
    html = '\n'.join(o).replace('<section class="level" id="sim" style="padding-top:24px"><div class="wrap"></div></section>', '<section class="level" style="padding-top:24px"><div class="wrap" id="sim"></div></section>')
    open(os.path.join(B.ROOT, 'practice', 'index.html'), 'w', encoding='utf-8').write(html)
    print('built practice')
