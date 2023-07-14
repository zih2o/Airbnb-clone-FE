<div align="center">
  
<img width="400" src="https://github.com/nomadcoders/airbnb-clone-frontend/assets/85221728/2d8f0210-c703-4cd6-9145-0deb34b68fee">
<h3> 글로벌 숙박 제공 서비스 에어비앤비 클론 코딩</h3>
<br>
<br>
</div>

## 1. TECH STACK

<br>



<div align="center">
<h3>🛠 FrontEnd 🛠</h3>

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
<img src="https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=React_Query&logoColor=white">
<br>
<img src="https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white">
<img src="https://img.shields.io/badge/-react--hook--form-%23EC5990?style=for-the-badge">
<br>
<br>
<p>react-query useInfiniteQuery를 이용한 Infinite scroll 구현</p>
<p>Like 기능에 react-query을 이용한 optimistic update 구현</p>
<p>React Query로 캐싱 처리, 최소한의 요청 처리, 성능 최적화</p>
<p>React-Calendar를 이용한 예약 기능 구현</p>
<p>Kakao/GitHub 로그인 구현</p>
<p>Custom Hook를 이용한 상태 관리로 불필요한 리렌더링 방지, 중복 코드 최소화</p>
<p>Axios instance 사용을 통한 중복 코드 최소화</p>
<p>Chakra를 이용한 Dark Mode/Modal/Toast 구현</p>
<p>skeleton screen 적용</p>
<p>Component화를 통한 재사용성, 중복 방지에 대한 고민</p>
<p>SPA를 통한 불필요한 리렌더링 제거, 사용자 경험 고려</p>
<p>TypeScript 사용을 통한 잠재적 에러발생 감소와 생산성 높은 코드 작성</p>
</p>
<p></p>

</div>


<br>
<br>

<div align="center">
<h3>🛠 BackEnd 🛠</h3>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<br>

<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white">
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white">
<img src="https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white">
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
<img src="https://img.shields.io/badge/zod-000000?style=for-the-badge&logo=zod&logoColor=white">

<br>
<br>
<p>Layered Architecture를 사용하여 도메인 로직을 분리</p>
<p>Dockerfile과 GCP를 사용한 CI/CD 자동화</p>
<p>MongoDB Atlas를 사용하여 애플리케이션과 데이터베이스 분리
페이지네이션으로 올 쿼리 요청 최적화</p>
<p>Zod library로 request validation을 통한 데이터 2차 검증</p>
<p>TypeScript의 Pick, Omit, Union 타입을 이용하여 재사용성 극대화</p>
<p>tiny-invariant 외부 라이브러리를 커스텀하여 type guard 해주는 유틸 함수 구현</p>
<p>Express의 request 타입을 확장하여 미들웨어에서 공유 가능한 context 생성</p>
<p>S3 bucket으로 이미지 파일 저장소 분리</p>
</div>

## 2. SERVICE SCREEN
<div align="center">
  <h3>Home</h3>
  <img width="700" alt="Screenshot 2023-07-13 at 7 29 38 PM" src="https://github.com/nomadcoders/airbnb-clone-frontend/assets/85221728/014bea66-b95d-40b5-ba9c-c18c448b2b9e">
  <img width="700" alt="Screenshot 2023-07-13 at 7 28 27 PM" src="https://github.com/nomadcoders/airbnb-clone-frontend/assets/85221728/86fb2a54-58e2-4ad7-b34a-c46732d0abdc">


  
</div>
## 3. ARCHITECTURE

- 서비스 구조도 그림 <img src="./stack.png">
- ERD <br><img src="./DoGreen ERD.png">
- 와이어프레임  
  <t> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">  
  <t>https://www.figma.com/file/tXtlbgXtKAsmPOo2scuaUn/team2-team-library?node-id=0%3A1&t=gwOCbP2MqN0caJlU-1

- API 명세 https://www.notion.so/b607690ea13744f3bc04a890a50a49ba?p=1a8eaa08dcc142d18cecd0b1b7387680&pm=s

## 4. 프로젝트 팀원 역할 분담

| 이름   | 포지션  | 담당업무                                                     |
| ------ | ------- | ------------------------------------------------------------ |
| 박지수 | 팀장/FE | 뉴스, 코멘트, 카테고리 구현 및 환경설정/라우팅               |
| 이예나 | FE      | 메인페이지, 카테고리, 마이페이지, 모달 구현                  |
| 이지현 | FE      | 로그인, 모달, 유저 관련 기능 구현                            |
| 지시안 | FE      | 어드민, 헤더/네비게이터/푸터 구현                            |
| 서윤지 | BE      | 유저, JWT, 구독 기능, 이미지 업로드, 배포, 에러처리 미들웨어 |
| 손형석 | BE      | 카테고리, 뉴스레터, 좋아요, 댓글 기능 구현                   |

## 5. 실행 방법

- BE
  ```
  1. docker 실행
  2. yarn dev
  ```
- FE
  ```
  1. npm i
  2. npm run dev
  ```

## 6. 버전

- 0.0.0

## 7. FAQ
