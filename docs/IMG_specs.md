# 위상수학 교실 — 이미지 제작 명세서 (IMG_00 시리즈 공용 + 장별 표지)

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
| cover_00 | index.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 모아 + 수강생 실루엣 |
| cover_01 | 01_open_sets.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 조수 하루 |
| cover_02 | 02_discrete_indiscrete.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_03 | 03_connectedness.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 미공개 X1 |
| cover_04 | 04_compactness.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 주판봇 |
| cover_05 | 05_digital_topology.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_06 | 06_alexandroff_posets.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_07 | 07_group_actions.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_08 | 08_proper_actions.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 미공개 X1 |
| cover_09 | 09_tiles_lattices.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_10 | 10_covering_spaces.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_11 | 11_galois_correspondence.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 미공개 X3 |
| cover_12 | 12_functors_adjunction.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 미공개 X2 |
| cover_13 | 13_ultrafilters_stone_cech.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 모아 |
| cover_14 | 14_extremal_profinite.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 조수 하루 |
| cover_15 | 15_final_review.html | 새로 그림 (지금은 대체 표지) | 박사, 초파리, 주판봇, 인턴 시아 |
| cover_practice | practice/index.html | 새로 그림 | 네 사업장 간판 앞의 박사와 수강생 6명 |
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
