Cafe ON 24 - GitHub Pages 안전 버전

가장 중요한 파일
- index.html
  GitHub Pages용 완전 독립형 파일입니다.
  CSS와 이미지가 모두 index.html 안에 들어 있어 경로 문제로 깨지지 않습니다.

GitHub에 올리는 방법
1. 이 ZIP을 압축 해제합니다.
2. 저장소 최상단(root)에 index.html 과 .nojekyll 파일을 올립니다.
3. GitHub 저장소 → Settings → Pages
4. Deploy from a branch
5. Branch: main
6. Folder: /(root)
7. Save

source 폴더
- 별도 편집용 HTML/CSS/이미지 버전입니다.
- source/index.html
- source/style.css
- source/assets/images/

반응형
- Desktop: 1200px 이상
- Tablet: 768px ~ 1199px
- Mobile: 320px ~ 767px
- 모바일 guide-section: 가로 스크롤
- 모바일 footer: 회사정보 / 이용안내 / 고객센터 / 다운로드 제목만 표시

주의
GitHub Pages에 올릴 때 ZIP 파일 자체를 올리지 말고 압축을 푼 뒤,
최상단의 index.html을 저장소 root에 두세요.
