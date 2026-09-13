# 포스메이게임즈 홈페이지 (4th May Games)

GitHub Pages로 운영되는 정적 사이트입니다. 홈 한 페이지 + 개인정보처리방침으로 구성됩니다.

홈은 **게임 아이콘 3개**만 보여주고, 아이콘을 누르면 게임 설명 팝업이 열립니다. [Eleventy(11ty)](https://www.11ty.dev/)로 빌드합니다.

- 배포 주소: https://4thmaygames.github.io
- 최종 목표 주소: https://4thmaygames.com (아래 2-1 참고)

---

## 1. 로컬에서 실행하기

Node.js 20 이상이 필요합니다.

```bash
npm install      # 최초 1회
npm start        # http://localhost:8080 미리보기 (저장하면 자동 새로고침)
npm run build    # _site/ 에 결과물 생성
```

---

## 2. 배포

`main` 브랜치에 push 하면 GitHub Actions가 자동으로 빌드·배포합니다.

```bash
git add -A && git commit -m "수정 내용" && git push
```

1~2분 뒤 반영됩니다. 진행 상황은 저장소 **Actions** 탭에서 확인하세요.

---

## 2-1. 도메인 구성 (설정 완료됨)

사이트 기준 주소는 **www 없는 `4thmaygames.com`** 입니다. (`src/CNAME` 에 지정)
`www.4thmaygames.com` 으로 접속하면 GitHub 이 자동으로 apex 주소로 넘겨줍니다.

DNS 는 **메일플러그**(ns.mailplug.com) 에서 관리합니다. 현재 설정:

| 타입  | 호스트 | 값 |
|-------|--------|-----|
| CNAME | `www`  | `4thmaygames.github.io` (www 접속 시 apex 로 자동 이동) |
| A     | `@`    | `185.199.108.153` |
| A     | `@`    | `185.199.109.153` |
| A     | `@`    | `185.199.110.153` |
| A     | `@`    | `185.199.111.153` |

> ⚠️ MX(Google Workspace 메일) 와 TXT(SPF) 레코드는 절대 건드리지 마세요. 지우면 회사 메일이 끊깁니다.

저장소 **Settings → Pages** 의 Custom domain 은 `src/CNAME` 값을 따라 자동 갱신됩니다.
도메인을 바꾸면 HTTPS 인증서가 재발급되므로 **Enforce HTTPS** 를 다시 확인해 주세요.

---

## 3. 게임 정보 수정 — `src/_data/games.json`

이 파일 하나가 페이지 전체를 만듭니다. 게임을 추가·삭제·순서 변경하려면 여기만 고치면 됩니다.

```json
{
  "slug": "froghotel",
  "title": "개구리호텔",
  "titleEn": "Idle Frog Hotel",
  "tagline": "오늘도 개구리들과 힐링하세요!",
  "desc": "목록에 보이는 설명 문단입니다.",
  "award": "수상 이력 (없으면 이 줄 삭제)",
  "art": "/assets/images/games/froghotel.webp",
  "icon": "/assets/images/games/froghotel-icon.webp",
  "stores": {
    "appstore": "https://apps.apple.com/kr/app/id6747689639",
    "googleplay": "https://play.google.com/store/apps/details?id=com.fourthmay.froghotel"
  }
}
```

배열 순서가 그대로 아이콘 순서입니다. `stores` 에서 한쪽을 지우면 그 버튼만 사라집니다.
`icon` 은 홈에 보이는 정사각 아이콘, `art` 는 팝업 상단의 16:9 이미지입니다.

회사명·이메일 등은 `src/_data/site.json` 에 있습니다.

---

## 4. 이미지

| 파일 | 용도 | 비율 |
|------|------|------|
| `src/assets/images/games/{slug}-icon.webp` | 홈 화면 아이콘 | 512×512 (스토어 앱 아이콘) |
| `src/assets/images/games/{slug}.webp` | 팝업 상단 이미지 | 1024×500 (스토어 피처 그래픽) |
| `src/assets/images/common/logo.png` | 로고 (메인 타이틀 + 헤더) | 가로형, 좌우 22% 투명 여백 포함 |
| `src/assets/images/common/favicon.png` | 브라우저 탭 아이콘 (심볼, 눈 부분 투명) | 512×512 투명 |
| `src/assets/images/common/apple-touch-icon.png` | iOS 홈화면 아이콘 | 180×180 흰 배경 |
| `src/assets/images/common/og-image.jpg` | 카톡·SNS 공유 썸네일 | 1200×630 |
| `src/assets/images/common/badge-*.png` | App Store / Google Play 배지 | — |

이미지가 없으면 회색 자리표시자가 나오고, 사이트는 정상 동작합니다.

원본은 `image/` 폴더에 두고 git 에는 올리지 않습니다(용량). 웹용 변환본만 커밋됩니다.

---

## 5. 개인정보처리방침

`/privacy/` 주소로 살아 있지만 **푸터에 링크는 걸지 않았습니다.**
앱스토어·구글플레이에 등록된 링크로는 정상 접속되며, 내용 수정은 `src/privacy.njk` 에서 합니다.

---

## 6. 브랜드 컬러

로고에서 추출한 값을 `style.css` 의 `:root` 에 정의해 두었습니다.

| 변수 | 값 | 쓰임 |
|---|---|---|
| `--accent` | `#3FB5B5` | 청록 — 포커스 표시 등 |
| `--brand-navy` | `#5A5F86` | 남보라 — 게임명, 팝업 제목 |
| `--gap-block` | `clamp(44px, 6vw, 72px)` | 로고↔아이콘, 아이콘↔푸터 간격 |

---

## 7. 남은 작업 (TODO)

- [ ] Google Search Console 에 사이트 등록

---

## 8. app-ads.txt

`src/app-ads.txt` 를 그대로 사이트 루트(`https://4thmaygames.com/app-ads.txt`)로 복사합니다.
광고 네트워크가 추가·변경되면 이 파일만 교체하고 push 하면 됩니다.

- 스토어 등록정보의 **개발자 웹사이트가 `https://4thmaygames.com`** 이어야 크롤링됩니다
- 파일이 존재하는데 특정 네트워크가 빠져 있으면 해당 네트워크 수익이 차단되므로, 항상 **전체 목록**으로 교체하세요
- AdMob 반영 확인: AdMob → 앱 → app-ads.txt 탭 (크롤링에 하루 이틀 걸립니다)

---

## 폴더 구조

```
src/
├── _data/
│   ├── site.json       # 회사명, URL, 채용 링크
│   └── games.json      # ★ 게임 목록 — 여기만 고치면 됩니다
├── _includes/
│   ├── base.njk        # 공통 레이아웃 (head/헤더/푸터)
│   └── partials/
│       └── icons.njk   # 스토어 버튼
├── assets/             # CSS, JS, 이미지
├── index.njk           # ★ 홈
├── privacy.njk         # 개인정보처리방침 (/privacy/)
├── 404.njk
├── sitemap.njk
├── robots.txt
├── app-ads.txt         # 광고 네트워크 인증 파일
└── CNAME               # 커스텀 도메인 (4thmaygames.com)
```
