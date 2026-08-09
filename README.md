# 포스메이게임즈 홈페이지 (4th May Games)

GitHub Pages로 운영되는 정적 사이트입니다. 홈 한 페이지 + 개인정보처리방침으로 구성됩니다.

홈은 **게임 아이콘 3개**만 보여주고, 아이콘을 누르면 게임 설명 팝업이 열립니다. [Eleventy(11ty)](https://www.11ty.dev/)로 빌드합니다.

- 배포 주소: https://4thmaygames.github.io
- 최종 목표 주소: https://www.4thmaygames.com (아래 2-1 참고)

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

## 2-1. 실제 도메인으로 전환하기

미리보기에서 문제가 없을 때 진행하세요. **그 전까지 기존 4thmaygames.com 은 그대로 유지**됩니다.

```bash
mv src/CNAME.disabled src/CNAME
git add -A && git commit -m "커스텀 도메인 연결" && git push
```

그리고 도메인 등록업체(가비아·후이즈 등) DNS에서:

| 타입  | 호스트 | 값 |
|-------|--------|-----|
| CNAME | `www`  | `4thmaygames.github.io` |
| A     | `@`    | `185.199.108.153` |
| A     | `@`    | `185.199.109.153` |
| A     | `@`    | `185.199.110.153` |
| A     | `@`    | `185.199.111.153` |

마지막으로 저장소 **Settings → Pages → Custom domain** 에 `www.4thmaygames.com` 이 들어왔는지 확인하고 **Enforce HTTPS** 를 체크합니다.
(HTTPS 체크박스는 DNS 반영 후에 활성화됩니다. 최대 24시간)

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
| `src/assets/images/common/logo.png` | 헤더 로고 (개인정보처리방침 페이지용) | — |
| `src/assets/images/common/favicon.png` | 브라우저 탭 아이콘 | 1:1 |
| `src/assets/images/common/og-image.jpg` | 카톡·SNS 공유 썸네일 | 1200×630 |
| `src/assets/images/common/badge-*.png` | App Store / Google Play 배지 | — |

이미지가 없으면 회색 자리표시자가 나오고, 사이트는 정상 동작합니다.

원본은 `image/` 폴더에 두고 git 에는 올리지 않습니다(용량). 웹용 변환본만 커밋됩니다.

---

## 5. 남은 작업 (TODO)

- [ ] 로고 이미지 `src/assets/images/common/logo.png`
- [ ] Google Search Console 에 사이트 등록

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
└── CNAME.disabled      # 도메인 전환 시 CNAME 으로 이름 변경
```
