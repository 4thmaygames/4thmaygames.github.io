# 포스메이게임즈 홈페이지 (4th May Games)

GitHub Pages로 운영되는 정적 웹사이트입니다. [Eleventy(11ty)](https://www.11ty.dev/)로 빌드합니다.

---

## 1. 로컬에서 실행하기

Node.js 20 이상이 필요합니다.

```bash
npm install      # 최초 1회
npm start        # http://localhost:8080 에서 미리보기 (파일 저장 시 자동 새로고침)
npm run build    # _site/ 폴더에 결과물 생성
```

---

## 2. 배포

`main` 브랜치에 push 하면 **GitHub Actions가 자동으로 빌드 후 배포**합니다.
(`.github/workflows/deploy.yml`)

```bash
git add .
git commit -m "뉴스 추가"
git push
```

1~2분 뒤 사이트에 반영됩니다. 진행 상황은 저장소의 **Actions** 탭에서 확인할 수 있습니다.

### 최초 1회 설정

1. 저장소 → **Settings → Pages → Build and deployment → Source** 를 **GitHub Actions** 로 변경
2. **Settings → Pages → Custom domain** 에 `www.4thmaygames.com` 입력
3. **Enforce HTTPS** 체크
4. 도메인 DNS 설정 (아래 참고)

### DNS 설정

도메인 등록업체(가비아, 후이즈 등) DNS 관리에서:

| 타입  | 호스트 | 값 |
|-------|--------|-----|
| CNAME | `www`  | `<github계정명>.github.io` |
| A     | `@`    | `185.199.108.153` |
| A     | `@`    | `185.199.109.153` |
| A     | `@`    | `185.199.110.153` |
| A     | `@`    | `185.199.111.153` |

> `A` 레코드 4개는 `4thmaygames.com`(www 없는 주소)을 `www`로 넘겨주기 위한 설정입니다.
> DNS 반영에는 최대 24시간이 걸릴 수 있고, HTTPS 인증서 발급은 그 이후 자동으로 진행됩니다.

---

## 3. 뉴스 글 올리기

`src/news/` 폴더에 마크다운 파일을 하나 추가하고 push 하면 끝입니다.
파일명은 `YYYY-MM-DD-영문슬러그.md` 형식을 권장합니다. (파일명이 곧 URL이 됩니다)

### (A) 우리가 직접 쓰는 소식 — 상세 페이지가 생깁니다

`src/news/2026-08-20-new-game.md`

```markdown
---
title: "신작 OOO 출시 안내"
date: 2026-08-20
image: /assets/images/news/2026-08-20-new-game.png   # 없으면 이 줄 삭제
excerpt: "목록에 보이는 한 줄 요약입니다."
---

본문을 마크다운으로 씁니다.

## 소제목

- 목록도 됩니다
- **굵게**, [링크](https://example.com) 모두 가능합니다

![이미지 설명](/assets/images/news/스크린샷.png)
```

→ `https://www.4thmaygames.com/news/2026-08-20-new-game/` 주소가 자동 생성됩니다.

### (B) 언론 보도(외부 기사) — 목록에서 원문으로 바로 이동합니다

```markdown
---
title: "OO신문, 포스메이게임즈 신작 소개"
date: 2026-08-20
source: OO신문
link: https://example.com/article/123
image: /assets/images/news/2026-08-20-article.jpg
excerpt: "한 줄 요약"
permalink: false      # ← 상세 페이지를 만들지 않고 원문으로 바로 연결
---
```

> `permalink: false` 가 있으면 상세 페이지 없이 목록에서 원문 링크로 연결됩니다.

**정렬은 `date` 기준으로 자동(최신순)** 이라 순서를 신경 쓸 필요 없습니다.

---

## 4. 게임 정보 수정

`src/_data/games.json` 파일 하나만 고치면 홈, 게임 목록, 헤더 메뉴, 푸터에 모두 반영됩니다.
게임 상세 페이지의 본문은 각각 `src/cathotel.njk`, `src/moonfrog.njk`, `src/ghosthotel.njk` 에 있습니다.

회사 정보(이메일, 채용 링크 등)는 `src/_data/site.json` 에 있습니다.

---

## 5. 이미지 넣기 ⚠️ 필요한 작업

현재 이미지 파일이 비어 있어 회색 자리표시자로 보입니다.
아래 경로에 **원본 이미지를 그대로 복사**하면 즉시 반영됩니다. (파일명 그대로)

### 공통 — `src/assets/images/common/`

| 파일명 | 용도 | 권장 크기 |
|--------|------|-----------|
| `logo.png` | 헤더 로고 (배경 투명) | 높이 56px 이상 |
| `favicon.png` | 브라우저 탭 아이콘 | 512×512 |
| `og-image.png` | 카톡·SNS 공유 썸네일 | 1200×630 |
| `hero.png` | 메인 상단 대표 이미지 | 1600×686 |
| `company-hero.png` | 회사 소개 상단 이미지 | 1280×720 |

### 게임 — `src/assets/images/games/`

각 게임(`cathotel`, `moonfrog`, `ghosthotel`)마다:

| 파일명 | 용도 | 권장 크기 |
|--------|------|-----------|
| `{게임}-thumb.png` | 목록 카드 썸네일 | 640×480 (4:3) |
| `{게임}-hero.png` | 상세 페이지 대표 이미지 | 1280×720 (16:9) |
| `{게임}-shot-1.png` ~ `-shot-3.png` | 스크린샷 | 600×600 (1:1) |

예) `cathotel-thumb.png`, `cathotel-hero.png`, `cathotel-shot-1.png` …

### 뉴스 — `src/assets/images/news/`

각 뉴스 마크다운의 `image:` 에 적힌 파일명과 똑같이 넣어주세요.
(예: `2024-09-23-tgs2024-seoul-pavilion.jpg`)

> 이미지가 없어도 사이트는 정상 작동합니다. 자리표시자만 보입니다.

---

## 6. 아직 채워야 할 것 (TODO)

- [ ] 위 이미지 파일들 넣기
- [ ] `src/news/*.md` 안의 `link: ""` 에 원문 기사 URL 입력 (기존 Notion 페이지에서 복사)
- [ ] `src/_data/site.json` 의 `email` 입력
- [ ] `src/_includes/partials/footer.njk` 의 사업자 정보(상호/사업자번호/주소) 입력
- [ ] Google Search Console에 `sitemap.xml` 등록

---

## 폴더 구조

```
src/
├── _data/
│   ├── site.json          # 사이트 전역 설정 (회사명, URL, 채용 링크…)
│   └── games.json         # 게임 목록 데이터
├── _includes/
│   ├── base.njk           # 공통 레이아웃 (head, 헤더, 푸터)
│   ├── news.njk           # 뉴스 상세 페이지 레이아웃
│   └── partials/          # 헤더 / 푸터 / 아이콘
├── assets/                # CSS, JS, 이미지
├── news/                  # 뉴스 글 (마크다운) ★ 여기에 글 추가
├── index.njk              # 홈
├── games.njk              # 게임 목록
├── cathotel.njk           # 고양이호텔
├── moonfrog.njk           # 달빛 개구리여관
├── ghosthotel.njk         # 유령호텔 타이쿤
├── about.njk              # About
├── company.njk            # 회사 소개
├── value.njk              # 핵심 가치
├── 404.njk
├── sitemap.njk
└── CNAME                  # 커스텀 도메인
```

기존 사이트와 **URL 주소를 동일하게 유지**했기 때문에 검색 순위나 외부 링크가 깨지지 않습니다.
