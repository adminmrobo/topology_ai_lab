# 위상수학 교실 — 이미지 제작 명세서 (IMG_00 시리즈 공용 + 장별 표지)

> **상태 (2026-11-24): 47장 모두 반영 완료** — 표지 17장 `img/cover/`, 장면 30장 `img/scene/` (4배 NEAREST, 무손실 WebP). 아래 지시문은 다시 그릴 때 쓰는 원본이에요.

> 그림체: **16비트 RPG 픽셀아트**(SNES 시대 느낌), **흰 배경(#ffffff) 위 낮의 연구실**. 그림 안에 글자·숫자·기호를 넣지 않는다(글자는 HTML로). 캐릭터 외형은 캐릭터 팩 `CHAR_lab4` 설정샷(k02~k04, 주판봇 v2 기본 표정 9종)을 따른다. 키 비율: 박사 1.00 · 조수 하루 0.90 · 시아 0.88 · 미공개 X1 0.85 · 모아 0.84 · 주판봇 0.72 · X3 0.60 · X2 0.95 · 초파리 0.41.

## 1. 공용 규칙

- 판 L(글 표지): 16:9, 생성 원본 1920×1080(픽셀 격자 480×270을 4배) → 무손실 WebP, `NEAREST` 정수배만. 오른쪽 46%는 제목이 올라갈 빈 여백으로 둔다(글자가 그림에 붙지 않게).
- 미공개 X1~X3은 정체를 밝히지 않는 검은 실루엣(눈만 보임)으로 그린다.
- 금지: 무기·담배·술·피, 실존 인물·기업 로고, 저작권 캐릭터, 결과 전 승패를 암시하는 표정.
- 생성 순서: ① cover_00(목차) 먼저 받아 그림체 확인 → ② 이것을 참고 그림으로 함께 올려 cover_01~15, cover_practice 생성.
- 반영: `img/cover/cover_NN.webp`(1920×1080 무손실) → 페이지의 「대체 표지」 상자를 `<img>`로 교체, og는 같은 그림을 1200×630으로 잘라 `img/og/og_NN.webp`.

## 2. 필요한 그림 전체

| 키 | 페이지 | 상태 | 등장 |
|---|---|---|---|
| cover_00 | index.html | 반영 완료 | 박사, 초파리, 주판봇, 모아 + 수강생 실루엣 |
| cover_01 | 01_open_sets.html | 반영 완료 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_02 | 02_discrete_indiscrete.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_03 | 03_connectedness.html | 반영 완료 | 박사, 초파리, 주판봇, 미공개 X1 |
| cover_04 | 04_compactness.html | 반영 완료 | 박사, 초파리, 주판봇, 주판봇 |
| cover_05 | 05_digital_topology.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_06 | 06_alexandroff_posets.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_07 | 07_group_actions.html | 반영 완료 | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_08 | 08_proper_actions.html | 반영 완료 | 박사, 초파리, 주판봇, 미공개 X1 |
| cover_09 | 09_tiles_lattices.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_10 | 10_covering_spaces.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_11 | 11_galois_correspondence.html | 반영 완료 | 박사, 초파리, 주판봇, 미공개 X3 |
| cover_12 | 12_functors_adjunction.html | 반영 완료 | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_13 | 13_ultrafilters_stone_cech.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_14 | 14_extremal_profinite.html | 반영 완료 | 박사, 초파리, 주판봇, 조수 하루 |
| cover_15 | 15_final_review.html | 반영 완료 | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_practice | practice/index.html | 반영 완료 | 네 사업장 간판 앞의 박사와 수강생 6명 |
| 캐릭터 얼굴 | 모든 페이지 | 캐릭터 팩 재사용 (`assets/sprites.js`, 96px) | — |

## 3. 표지 지시문 (Genspark 등 이미지 생성 도구용)

### cover_00 — 오리엔테이션
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 흰 벽의 밝은 강의실, 칠판 대신 큰 흰 보드에 도넛과 손잡이 달린 머그컵이 서로 변하는 그림(글자 없음).
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful), intern Sia (side-swept bangs, calm), assistant Haru (long pink hair in two buns with navy streak, jeans), secret student X1 (silhouette), secret student X2 (silhouette), secret student X3 (small silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_01 — 열린 집합 — 이웃을 정하는 규칙
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 수직선 모양의 긴 운동장, 울타리 안쪽에 선 하루가 한 발짝 내딛는 장면.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_02 — 이산 위상과 밀착 위상 — 모두 혼자 vs 모두 한 덩어리
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 1인 1실 기숙사 문들과 단체 티셔츠를 입은 무리를 나란히 비교하는 교실, 시아와 모아가 마주 보고 토론.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_03 — 연결과 끊김 — 한 덩어리인가, 둘로 갈라지나
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 구멍(물웅덩이)이 많은 운동장에서 X1이 꺾은선 길을 따라 걷는 장면, 두 섬 사이 바다 그림 보드.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X1 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_04 — 콤팩트 — 유한한 우산으로 다 덮기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 비 오는 운동장 위에 크기가 다른 우산이 줄지어 펼쳐진 장면, 주판봇이 우산을 세는 중.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), Jupanbot (abacus robot, v2 design).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_05 — 픽셀 세상의 연결 — 디지털 위상
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 바닥이 거대한 픽셀 격자로 된 교실, 마름모 모양 검은 타일 고리 안을 모아가 들여다봄.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_06 — 순서로 만든 공간 — 알렉산드로프 공간
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 위아래로 이어진 지그재그 계단식 발표 무대(점과 선의 순서 그림), 모아가 발표.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_07 — 군과 작용 — 도장 찍기 규칙
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 바닥에 찍힌 발자국 도장과 90도씩 도는 회전문, X2가 도장을 들고 서 있음.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X2 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_08 — 얌전한 작용의 등급 — 도장이 말썽을 부릴 때
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 가로로 늘고 세로로 줄어드는 사진 액자들이 쌍곡선 길을 따라 놓인 복도, X1이 놀란 표정.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X1 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_09 — 타일과 격자 — 한 조각으로 바닥 전체를 덮기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 벌집 모양 육각형 타일이 깔린 바닥과, 위로 끝없이 좁아지는 탑 모양 타일 벽, 시아가 설명.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_10 — 덮개 공간과 길 — 빙글빙글 주차장
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 나선형 주차장(빙글빙글 경사로) 단면, 아래 원형 바닥과 위층 나선, 시아가 안내.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_11 — 갈루아 대응 — 덮개와 부분군의 짝짓기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 회전 초밥 벨트처럼 도는 원형 층들과 약수 표를 닮은 계단식 선반(글자 없음), X3가 뿌듯한 표정.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X3 (small silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_12 — 함자와 짝 — 옷 입히기와 옷 벗기기
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 옷걸이에 걸린 「모든 단추가 열린 옷」과 옷을 벗긴 마네킹, 두 세계를 잇는 다리, X2.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), secret student X2 (silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_13 — 무한 끝의 점 — 울트라필터와 스톤-체흐
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 무한히 뻗은 마라톤 코스가 짝수 길과 홀수 길로 갈라지는 갈림길, 모아가 반짝이는 눈.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Moa (white ribbon and check ribbon above ears, cheerful).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_14 — 아주 끊긴 공간과 프로유한 — 먼지 같은 공간들
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 가운데를 끝없이 잘라 낸 리본 조각(먼지처럼 흩어진 빛 조각)과 층층이 쌓인 나머지 시계, 하루가 뿌듯.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), assistant Haru (long pink hair in two buns with navy streak, jeans).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_15 — 종합 — 기말 쪽지시험과 졸업 발표
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: 졸업식 단상, 세 기둥(공간·움직임·끝) 모양의 장식 기둥, 수강생 6명이 학사모를 던짐.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), fruit-fly researcher (small, red compound eyes, white coat over black vest, black gloves), Jupanbot (abacus robot, v2 design), intern Sia (side-swept bangs, calm).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

### cover_practice — 마지막 장 · 실전 연습장
```
16-bit SNES-era RPG pixel art, clean pixel grid (480x270 base, scaled x4 to 1920x1080 with nearest neighbor), bright white daytime lab classroom background (#ffffff walls), soft pastel accents, no text, no letters, no numbers, no logos.
Scene: four small shop fronts in a row (pixel photo studio, tile factory, spiral parking garage, umbrella rental), no signboard text.
Characters (keep fixed designs from reference sheets): Professor (teal square glasses, short ponytail with white streak, white lab coat), intern Sia (side-swept bangs, calm), intern Moa (white ribbon and check ribbon above ears, cheerful), assistant Haru (long pink hair in two buns with navy streak, jeans), secret student X1 (silhouette), secret student X2 (silhouette), secret student X3 (small silhouette).
Composition: characters and props on the LEFT 54% of the frame; keep the RIGHT 46% as calm empty white space for an HTML title overlay.
Height ratio: professor 1.00, assistant Haru 0.90, Sia 0.88, Moa 0.84, Jupanbot 0.72, fruit-fly researcher 0.41. Secret students X1-X3 are black silhouettes with only eyes visible.
Mood: friendly study session, no winner/loser expressions.
```

## 4. 일관성 지침

- 장마다 주인공 수강생 한 명(표 2열)을 박사·조교 둘과 함께 넣는다.
- 표정은 수업 장면에 맞는 기본·설명·생각·응원 계열만 쓴다(조교 대결 결과를 암시하지 않음).

## 5. 체크리스트

- [ ] 그림 속 글자 0
- [ ] 오른쪽 46% 여백
- [ ] 480×270 격자의 정수배(×4)
- [ ] 캐릭터 외형이 설정샷과 일치
- [ ] 미공개 X1~X3 실루엣 유지

## 6. 비유 장면 그림 — 장마다 2장 (인포그래픽 ②)

> 단계의 「일상으로 치면」 카드에 넣을 장면 그림이에요. 판 **1200×800**(픽셀 격자 300×200을 4배, `NEAREST` 정수배, 무손실 WebP), 저장 이름 `img/scene/scene_NN_lvK.webp`. 그림 안에 글자·숫자·기호 금지, 흰 배경의 낮의 연구실 톤, 16비트 RPG 픽셀아트. 받으면 해당 카드 안에 `<img>`로 넣고 비유 문장은 그대로 둡니다.

| 키 | 장 · 단계 | 비유 |
|---|---|---|
| scene_01_lv1 | 01장 1단계 · 경계선 없는 동네 — 열린 구간 | 운동장 비유 |
| scene_01_lv2 | 01장 2단계 · 열린 집합의 세 규칙 — 위상 | 동아리 목록 비유 |
| scene_02_lv1 | 02장 1단계 · 모두 혼자인 교실 — 이산 위상 | 1인실 비유 |
| scene_02_lv2 | 02장 2단계 · 모두 한 덩어리 — 밀착 위상과 구별 게임 | 단체 티셔츠 비유 |
| scene_03_lv1 | 03장 1단계 · 자르는 선 하나 — 분리와 연결 | 두 섬 비유 |
| scene_03_lv2 | 03장 2단계 · 점마다 혼자 — 완전히 끊긴 공간 | 징검돌 비유 |
| scene_04_lv1 | 04장 1단계 · 우산 모음과 유한 개 고르기 — (0, 1)은 왜 안 되나 | 우산 비유 |
| scene_04_lv2 | 04장 2단계 · 점마다 우산 하나 — 무한 이산 공간 | 1인용 우산 비유 |
| scene_05_lv1 | 05장 1단계 · 4-이웃과 8-이웃의 역설 | 페인트통 비유 |
| scene_05_lv2 | 05장 2단계 · 칼림스키 직선 — 열린 점과 닫힌 점 | 다리와 징검돌 비유 |
| scene_06_lv1 | 06장 1단계 · 가장 작은 이웃 — 무한히 겹쳐도 열린 공간 | 단톡방 비유 |
| scene_06_lv2 | 06장 2단계 · 위아래 순서 그림 = 위상 — 위로 닫힌 집합 | 선수 과목표 비유 |
| scene_07_lv1 | 07장 1단계 · 도장 찍기 — 작용과 궤도 | 발자국 도장 비유 |
| scene_07_lv2 | 07장 2단계 · 움직이지 않는 점 — 안정자와 자유 작용 | 회전문 비유 |
| scene_08_lv1 | 08장 1단계 · 겹치게 하는 도장 세기 — 운반자 집합 | 상자 밀기 비유 |
| scene_08_lv2 | 08장 2단계 · 얌전함의 네 층 — 등급 탑 | 안전 등급 비유 |
| scene_09_lv1 | 09장 1단계 · 궤도마다 대표 하나 — 기본 영역 | 욕실 타일 비유 |
| scene_09_lv2 | 09장 2단계 · 가장 가까운 자리 — 디리클레 영역 | 기지국 비유 |
| scene_10_lv1 | 10장 1단계 · 나선형 주차장 — 덮개 공간과 올 | 나선형 주차장 비유 |
| scene_10_lv2 | 10장 2단계 · 출발 층을 정하면 길은 하나 — 길 들어올리기 | 주차장 운전 비유 |
| scene_11_lv1 | 11장 1단계 · 모든 덮개의 꼭대기 — 보편 덮개 | 끝없는 나선 계단 비유 |
| scene_11_lv2 | 11장 2단계 · 덮개 ↔ 부분군 — 짝짓기 표 | 약수 표 비유 |
| scene_12_lv1 | 12장 1단계 · 두 세계를 잇는 번역기 — 함자 | 옷 입히기 비유 |
| scene_12_lv2 | 12장 2단계 · 이산 공간에서 나가는 함수는 늘 연속 | 열린 문 비유 |
| scene_13_lv1 | 13장 1단계 · 「큰 집합」 투표 규칙 — 필터와 울트라필터 | 학급 투표 비유 |
| scene_13_lv2 | 13장 2단계 · 무한으로 가는 길마다 점 하나 | 마라톤 갈림길 비유 |
| scene_14_lv1 | 14장 1단계 · 닫힘이 늘 열려 있나 — 캔터 집합 시험 | 잘라 낸 리본 비유 |
| scene_14_lv2 | 14장 2단계 · 나머지 층 쌓기 — 역극한 | 시계 여러 개 비유 |
| scene_15_lv1 | 15장 1단계 · 세 기둥 지도 — 졸업 발표 | 졸업 앨범 비유 |
| scene_15_lv2 | 15장 2단계 · 반례 박물관 — 성립하지 않을 때를 기억하기 | 사고 사례집 비유 |

### scene_01_lv1 — 열린 집합 · 운동장 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 운동장 안쪽에 서 있으면 어느 쪽으로든 한 발짝은 갈 수 있어요. 하지만 울타리 바로 위에 서 있으면 바깥쪽으로는 한 발짝도 못 가요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, assistant Haru. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_01_lv2 — 열린 집합 · 동아리 목록 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 동아리 목록 규칙: ① 「아무도 없는 모임」과 「반 전체」는 늘 목록에 ② 목록의 모임을 합친 큰 모임도 목록에 ③ 두 모임에 다 속한 사람들의 모임도 목록에.
Characters (fixed designs from reference sheets): Jupanbot, Professor, assistant Haru. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_02_lv1 — 이산 위상과 밀착 위상 · 1인실 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 1인 1실 기숙사에서는 어떤 학생 무리든 방 몇 개를 합쳐 만들 수 있고, 남은 학생들도 방을 합쳐 만들 수 있어요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_02_lv2 — 이산 위상과 밀착 위상 · 단체 티셔츠 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 단체 티셔츠를 입은 반을 멀리서 찍으면, 사진 틀에 늘 「아무도 없음」이나 「반 전체」만 들어와요. 누가 누군지 구별할 수 없어요.
Characters (fixed designs from reference sheets): intern Moa, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_03_lv1 — 연결과 끊김 · 두 섬 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 두 섬 사이 바다에 줄을 그으면 섬을 깔끔하게 나눌 수 있어요. 한 섬의 한가운데를 가르면 줄 위의 땅은 어느 쪽에도 깔끔하게 속하지 않아요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X1 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_03_lv2 — 연결과 끊김 · 징검돌 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 징검다리 없이 띄엄띄엄 놓인 돌들은 어느 두 돌 사이에도 물이 흘러요. 함께 이어진 무리는 돌 한 개씩뿐이에요.
Characters (fixed designs from reference sheets): intern Moa, Professor, secret student X1 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_04_lv1 — 콤팩트 · 우산 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 우산이 무한히 많은데 하나하나는 0 쪽으로 조금씩만 길어져요. 몇 개를 골라도 0 바로 옆 땅은 늘 젖어요.
Characters (fixed designs from reference sheets): Jupanbot, Professor. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_04_lv2 — 콤팩트 · 1인용 우산 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 1인용 우산은 딱 한 사람만 가려 줘요. 사람이 끝없이 많으면 우산도 끝없이 많이 필요해요.
Characters (fixed designs from reference sheets): Jupanbot, Professor. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_05_lv1 — 픽셀 세상의 연결 · 페인트통 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 그림판에서 대각선 동그라미를 그리고 안쪽을 칠하면, 색이 대각선 틈으로 새어 나가기도 해요. 반대로 선이 끊겼다고 보면 안쪽이 따로 있어도 이상해요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Moa. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_05_lv2 — 픽셀 세상의 연결 · 다리와 징검돌 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 징검돌(짝수) 사이에 다리(홀수)를 놓으면, 돌 위에 선 사람의 「주변」엔 늘 양옆 다리가 들어와요. 다리 위 사람의 주변은 그 다리뿐이에요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Moa. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_06_lv1 — 순서로 만든 공간 · 단톡방 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 나를 포함한 단톡방(반 전체방, 동아리방, 단짝방)을 모두 겹치면, 그 모든 방에 다 있는 「가장 작은 모임」이 남아요.
Characters (fixed designs from reference sheets): intern Moa, Professor. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_06_lv2 — 순서로 만든 공간 · 선수 과목표 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 선수 과목표에서 「수학 1을 듣는 사람은 그다음 과목들로 이어질 수 있다」처럼, 아래 과목에서 위 과목으로 화살표가 이어져요.
Characters (fixed designs from reference sheets): secret student X2 (silhouette), Professor, intern Moa. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_07_lv1 — 군과 작용 · 발자국 도장 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 발자국 도장을 「앞으로 한 걸음」, 「뒤로 한 걸음」 계속 찍으면, 발자국은 일정한 간격으로만 찍혀요. 그 발자국들이 한 점의 궤도예요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X2 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_07_lv2 — 군과 작용 · 회전문 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 회전문을 몇 번 돌려도 문의 축(한가운데)은 제자리예요. 문 끝에 있는 손잡이는 돌릴 때마다 다른 자리로 가요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X2 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_08_lv1 — 얌전한 작용의 등급 · 상자 밀기 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 창고에서 상자를 「1미터씩」만 밀 수 있다면, 상자가 구역 B에 닿는 밀기 횟수는 몇 가지 안 돼요. 상자와 구역이 유한한 크기니까요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X1 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_08_lv2 — 얌전한 작용의 등급 · 안전 등급 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 안전 등급이 가장 높은 놀이기구는 낮은 등급 검사도 함께 통과해요. 하지만 낮은 등급을 통과했다고 높은 등급을 받는 건 아니에요.
Characters (fixed designs from reference sheets): assistant Haru, Professor, secret student X1 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_09_lv1 — 타일과 격자 · 욕실 타일 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 욕실 벽은 같은 정사각형 타일을 가로세로 한 장씩 옮겨 붙인 것이에요. 타일 한 장의 모든 점이 벽 위 「같은 위치」 무리의 대표예요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_09_lv2 — 타일과 격자 · 기지국 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 기지국이 마을에 고르게 퍼져 있으면, 각 기지국의 「가장 가까운 구역」은 서로 맞닿는 다각형이 되어 지도를 빈틈없이 나눠요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_10_lv1 — 덮개 공간과 길 · 나선형 주차장 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 나선형 주차장에서 바닥 원의 한 자리 바로 위에는 층마다 한 곳씩 주차 자리가 있어요. 바닥의 짧은 구간 위에는 층마다 따로 떨어진 짧은 구간이 놓여 있어요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_10_lv2 — 덮개 공간과 길 · 주차장 운전 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 경사로가 빙글빙글 이어진 주차장에서, 「지금 2층에서 출발해 한 바퀴 반 돌아라」라고 하면 도착 위치가 딱 정해져요. 출발 층이 다르면 도착 층도 그만큼 달라요.
Characters (fixed designs from reference sheets): assistant Haru, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_11_lv1 — 갈루아 대응 · 끝없는 나선 계단 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 끝없는 나선 계단에서는 한 바퀴 돌 때마다 다른 층에 도착해서, 제자리로 돌아오는 원형 길이 없어요(0바퀴 길 빼고).
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X3 (small silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_11_lv2 — 갈루아 대응 · 약수 표 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 약수 표를 보면 12를 나누는 수가 1, 2, 3, 4, 6, 12로 딱 정해져요. 덮개도 이 수만큼, 이 순서대로 포개져요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X3 (small silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_12_lv1 — 함자와 짝 · 옷 입히기 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 인형에게 옷을 입히는 가장 단순한 규칙은 「모든 단추를 다 연 옷」이에요. 옷을 벗기면 인형 자체만 남아요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X2 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_12_lv2 — 함자와 짝 · 열린 문 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 모든 문이 열린 집에서는 어느 방으로 가는 길도 막히지 않아요. 문이 거의 다 잠긴 집(밀착)에서는 대부분의 길이 막혀요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, secret student X2 (silhouette). Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_13_lv1 — 무한 끝의 점 · 학급 투표 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 학급 투표에서 「반장(점 2)이 찬성하는 안건은 통과」라는 규칙은 모든 안건에 결론을 내고 모순도 없어요. 「반장과 부반장이 모두 찬성해야 통과」는 둘의 의견이 갈리면 결론이 안 나요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Moa. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_13_lv2 — 무한 끝의 점 · 마라톤 갈림길 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 마라톤 코스의 짝수 표지판만 따라가는 사람과 홀수 표지판만 따라가는 사람은 끝까지 한 번도 같은 표지판을 밟지 않아요. 둘의 「끝」은 다른 곳이에요.
Characters (fixed designs from reference sheets): Jupanbot, Professor, intern Moa. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_14_lv1 — 아주 끊긴 공간과 프로유한 · 잘라 낸 리본 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 가운데를 끝없이 잘라 낸 리본은 먼지처럼 흩어져 있지만, 그 먼지들은 0 같은 점 근처로 빽빽하게 몰려 있어요. 몰린 곳에서 「고른 먼지」와 「안 고른 먼지」가 뒤섞여요.
Characters (fixed designs from reference sheets): assistant Haru, Professor. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_14_lv2 — 아주 끊긴 공간과 프로유한 · 시계 여러 개 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 「2로 나눈 나머지 시계」, 「4로 나눈 나머지 시계」, 「8로 나눈 나머지 시계」를 함께 쓰려면, 큰 시계의 눈금을 다시 나눴을 때 작은 시계 눈금이 나와야 해요.
Characters (fixed designs from reference sheets): secret student X3 (small silhouette), Professor, assistant Haru. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_15_lv1 — 종합 · 졸업 앨범 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 졸업 앨범은 반별·동아리별로 묶여 있어요. 묶음을 알면 사진 한 장이 어디쯤인지 바로 찾을 수 있어요.
Characters (fixed designs from reference sheets): intern Sia, Professor. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```

### scene_15_lv2 — 종합 · 사고 사례집 비유
```
16-bit SNES-era RPG pixel art, 300x200 pixel grid scaled x4 to 1200x800 (nearest neighbor), bright white daytime background, no text, no letters, no numbers, no symbols.
Everyday scene (Korean source idea): 사고 사례집을 보면 규칙이 왜 있는지 바로 이해돼요. 「이 조건을 빼면 이런 일이 생긴다」를 몸으로 기억해요.
Characters (fixed designs from reference sheets): fruit-fly researcher, Professor, intern Sia. Friendly classroom mood, no winner/loser expressions.
Keep the key object of the analogy large and centered so the idea reads at a glance.
```
