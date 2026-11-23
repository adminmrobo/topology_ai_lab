# 시리즈 공용 데이터
SERIES = '위상수학 교실 — 고무찰흙 세상의 수학'
SITE = 'https://adminmrobo.github.io/topology_ai_lab/'
AUTHOR = {'name': '안상선', 'en': 'Ahn Sangsun', 'site': 'https://adminmrobo.github.io/who_am_i/who_am_i.html', 'org': '(주)M-Robo 대표'}

# who: (이름, 이 시리즈의 자리, 기본 표정, 한 줄 소개)
PEOPLE = {
    'doc': ('박사', '선생님', 'front', '목소리는 크지만 판단은 계산대로. 막히는 곳에서 꼭 멈춰 줍니다.'),
    'fly': ('초파리 연구원', '조교 (의심 담당)', 'magnify', '작지만 날카롭다. "정말 그래?" 하고 반례를 찾아옵니다.'),
    'robo': ('주판봇', '조교 (확신 담당)', 'calc', '큰 숫자와 빠른 계산을 좋아한다. 가끔 너무 빨리 확신합니다.'),
    'sia': ('인턴 시아', '수강생 · 1조', 'e13', '조용하고 꼼꼼한 정리 담당. 집중이 끊기면 존다는 소문.'),
    'moa': ('인턴 모아', '수강생 · 2조', 'e13', '상냥하고 잘 웃는다. 발표와 응원 목소리가 제일 크다.'),
    'asst': ('조수 하루', '수강생 · 1조', 'e13', '수식이 나오면 손을 번쩍 드는 질문 담당. 처음 오신 분의 눈높이.'),
    'x1': ('미공개 X1', '수강생 · 1조', 'e13', '정체는 비밀. 짧고 엉뚱한 질문을 던진다.'),
    'x2': ('미공개 X2', '수강생 · 2조', 'e13', '정체는 비밀. 조용히 그림을 그려 온다.'),
    'x3': ('미공개 X3', '수강생 · 2조', 'e13', '정체는 비밀. 숫자 세기를 좋아한다.'),
}

# (콘텐츠 파일, 슬러그)
CHAPTERS = [('ch%02d' % i, None) for i in range(1, 16)]

_V = {'title': True, 'author': True, 'year': True, 'doi': False, 'pages': False}
REFS = {
    'src_infographics': {'type': 'graphic', 'title': '위상수학·이산 위상 인포그래픽 20장 (The Architecture of Discrete Topology 외)', 'author': [{'literal': '작성자 미상 (사용자 제공 자료)'}],
                         'year': 2026, 'role': 'primary', 'verified': {'title': True, 'author': False, 'year': False},
                         'short': '원자료 인포그래픽 20장 (사용자 제공, 출처 확인 필요)', 'use': '각 단계의 개념 목록과 그림 구성의 출발점'},
    'munkres2000': {'type': 'book', 'title': 'Topology (2nd ed.)', 'author': [{'family': 'Munkres', 'given': 'James R.'}], 'year': 2000, 'publisher': 'Prentice Hall',
                    'role': 'background', 'verified': dict(_V), 'short': 'Munkres (2000) Topology', 'use': '열린 집합·기저·연결·콤팩트의 표준 정의 확인'},
    'hatcher2002': {'type': 'book', 'title': 'Algebraic Topology', 'author': [{'family': 'Hatcher', 'given': 'Allen'}], 'year': 2002, 'publisher': 'Cambridge University Press',
                    'role': 'background', 'verified': dict(_V), 'short': 'Hatcher (2002) Algebraic Topology', 'use': '덮개 공간·길 들어올리기·갈루아 대응'},
    'drutu2018': {'type': 'book', 'title': 'Geometric Group Theory', 'author': [{'family': 'Druțu', 'given': 'Cornelia'}, {'family': 'Kapovich', 'given': 'Michael'}], 'year': 2018,
                  'publisher': 'American Mathematical Society', 'role': 'background', 'verified': dict(_V), 'short': 'Druțu & Kapovich (2018) Geometric Group Theory',
                  'use': '군의 작용, 운반자 집합, 고유 불연속 작용의 등급, 카포비치 반례, 디리클레 영역'},
    'khalimsky1990': {'type': 'article-journal', 'title': 'Computer graphics and connected topologies on finite ordered sets', 'author': [{'family': 'Khalimsky', 'given': 'Efim'}, {'family': 'Kopperman', 'given': 'Ralph'}, {'family': 'Meyer', 'given': 'Paul R.'}],
                      'year': 1990, 'container': 'Topology and its Applications', 'volume': '36', 'pages': '1-17', 'role': 'background', 'verified': dict(_V),
                      'short': 'Khalimsky, Kopperman & Meyer (1990)', 'use': '칼림스키 직선·평면'},
    'rosenfeld1979': {'type': 'article-journal', 'title': 'Digital topology', 'author': [{'family': 'Rosenfeld', 'given': 'Azriel'}], 'year': 1979, 'container': 'American Mathematical Monthly',
                      'volume': '86', 'pages': '621-630', 'role': 'background', 'verified': dict(_V), 'short': 'Rosenfeld (1979) Digital topology', 'use': '4-이웃·8-이웃과 연결 역설'},
    'alexandroff1937': {'type': 'article-journal', 'title': 'Diskrete Räume', 'author': [{'family': 'Alexandroff', 'given': 'Pavel'}], 'year': 1937, 'container': 'Matematicheskii Sbornik',
                        'role': 'background', 'verified': dict(_V), 'short': 'Alexandroff (1937) Diskrete Räume', 'use': '알렉산드로프 공간과 순서의 대응'},
    'gleason1958': {'type': 'article-journal', 'title': 'Projective topological spaces', 'author': [{'family': 'Gleason', 'given': 'Andrew M.'}], 'year': 1958, 'container': 'Illinois Journal of Mathematics',
                    'volume': '2', 'role': 'background', 'verified': dict(_V), 'short': 'Gleason (1958) Projective topological spaces', 'use': '글리슨 정리 (아주 끊긴 콤팩트 공간)'},
    'walker1974': {'type': 'book', 'title': 'The Stone-Čech Compactification', 'author': [{'family': 'Walker', 'given': 'Russell C.'}], 'year': 1974, 'publisher': 'Springer',
                   'role': 'background', 'verified': dict(_V), 'short': 'Walker (1974) The Stone-Čech Compactification', 'use': '스톤-체흐 콤팩트화와 울트라필터'},
    'ribes2010': {'type': 'book', 'title': 'Profinite Groups (2nd ed.)', 'author': [{'family': 'Ribes', 'given': 'Luis'}, {'family': 'Zalesskii', 'given': 'Pavel'}], 'year': 2010, 'publisher': 'Springer',
                  'role': 'background', 'verified': dict(_V), 'short': 'Ribes & Zalesskii (2010) Profinite Groups', 'use': '프로유한 공간·역극한·p진 정수'},
    'maclane1998': {'type': 'book', 'title': 'Categories for the Working Mathematician (2nd ed.)', 'author': [{'family': 'Mac Lane', 'given': 'Saunders'}], 'year': 1998, 'publisher': 'Springer',
                    'role': 'background', 'verified': dict(_V), 'short': 'Mac Lane (1998) Categories for the Working Mathematician', 'use': '함자와 수반(짝) 관계'},
    'katok1992': {'type': 'book', 'title': 'Fuchsian Groups', 'author': [{'family': 'Katok', 'given': 'Svetlana'}], 'year': 1992, 'publisher': 'University of Chicago Press',
                  'role': 'background', 'verified': dict(_V), 'short': 'Katok (1992) Fuchsian Groups', 'use': '모듈러 군의 기본 영역과 쌍곡 넓이 π/3'},
}
