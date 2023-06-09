# halfchicken-movie
내일배움캠프 B7조 팀프로젝트 23.06.02 - 23.06.09 반반치킨

## 팀원

| 팀원   | 스택         | 팀원구분 | 깃허브                                      | 블로그                                             |
| ------ | ------------ | -------- | ------------------------------------------- | -------------------------------------------------- |
| 송현섭 | `프론트엔드` | 팀원   | [songhsb](https://github.com/songhsb)     | [seul-bean](https://velog.io/@songhsb) |
| 이지은 | `프론트엔드`     | 팀원     | [JellyBear97](https://github.com/JellyBear97)     | [JellyBear97](https://iam-jelly-bear.com/)       |
| 김진우 | `프론트엔드` | 팀원     | [Kimjinwoo1](https://github.com/Kimjinwoo1)      | [Kimjinwoo1](https://velog.io/@wlsdn090909) |
| 노진철 | `프론트엔드`     | 팀원     | [jinoc-git](https://github.com/jinoc-git)     | [jinoc](https://jinoc.tistory.com/)       |
| 박기태 | `프론트엔드`     | 팀원     | [kitae0831](https://github.com/kitae0831)     | [kitae0831](https://velog.io/@gata)       |
| 유희정 | `프론트엔드` | 팀장     | [heejung-newheee](https://github.com/heejung-newheee) | [newheee](https://newheee.tistory.com/)               |


## 목차

-   [1. 프로젝트 소개](#1-프로젝트-소개)
-   [2. 프로젝트 Notion](#2-프로젝트-Notion)  
-   [3. 와이어프레임](#3-와이어프레임)
-   [4. 기술스택](#4-기술스택)
-   [5. APITable](#5-API-Table)
-   [6. 구현기능 및 화면](#6-구현기능-및-화면)

## 1. 프로젝트 소개
순수 바닐라 자바스크립트만으로 영화정보 오픈API인 TMDB(The Movie DB)를 사용한 영회리스트 조회 및 검색, 영화 상세정보 공유 등 반응형 UI 구현

## 2. 프로젝트 Notion
[반반치킨 Notion](https://www.notion.so/Team-938995f6f21843e89f2b1519a68ae352?pvs=4)

## 3. 와이어프레임
<img width="1000" alt="wire-frame" src="https://github.com/halfhalf-chicken/halfchicken-movie/assets/126348461/077527a0-1086-4355-bee3-fea0011a3839">

## 4. 기술스택
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">


## 5. API Table
| Number | Method         | URL | Description          | Request            | Response            |
| --- | ------------ | -------- | ---------------------------- | ---------------------------- | ---------------------------- |
| 1 | `GET`      | /reviews/read | 리뷰 조회 | | {"result": result} |
| 2 | `POST`      | /reviews/upload | 리뷰 작성 | {'movie', 'author', 'content', 'pw'}| {"msg": "리뷰 작성 완료!"} |
| 3 | `PUT`      | /reviews/update | 리뷰 수정 | {'reviewId', 'content'}| {"msg": "리뷰 수정 완료!"} |
| 4 | `DELETE`      | /reviews/delete | 리뷰 삭제 | {'reviewId'} | {"msg": "리뷰 삭제 완료!"} |



## 6. 구현기능 및 화면

- TMDB API이용 영화 목록 불러오기
- 최초 영화 목록 더보기 기능
- 인기순, 이름순 등으로 영화 목록 정렬
- 영화별 상세 정보
- 영화별 댓글 불러오기
- 영화별 댓글 등록, 수정, 삭제 (유효성 검사)
- 영화 상세페이지 하단, 같은 장르 영화 추천 리스트 (슬라이더)
- 영화 정보 공유 기능
- 상세페이지 홈화면 이동 가능 UI
- 반응형 홈페이지

### 1) 홈 화면
![image](https://github.com/remember0515/Re_Member/assets/126348461/4e908ae8-2f03-48d7-afd7-7a3c4874718d)

### 2) 영화 목록 정렬(이름순, 최신순, 인기순, 평점순)
![image](https://github.com/remember0515/Re_Member/assets/126348461/23dbfdaa-d3eb-44ae-bec8-d4e07a8a99f6)

### 3) 영화 상세 정보
![image](https://github.com/remember0515/Re_Member/assets/126348461/06235ab5-4f94-435b-b0d7-271d013ab803)

### 4) 영화별 댓글 불러오기
![image](https://github.com/remember0515/Re_Member/assets/126348461/698abcfe-b18f-4e7f-b8da-26a49dc586c1)

### 5) 영화별 댓글 등록, 수정, 삭제 가능 (유효성 검사)
![Movies-Chrome-2023-06-09-11-12-18](https://github.com/halfhalf-chicken/halfchicken-movie/assets/126348461/922716c5-1f49-4865-95b1-e88374e8f09a)

### 6) 영화 상세페이지 하단, 같은 장르 영화 추천 리스트(슬라이더)
![Movies-Chrome-2023-06-09-11-00-15](https://github.com/halfhalf-chicken/halfchicken-movie/assets/126348461/8b954c12-a80a-468b-9958-7cc88cbf6543)

### 7) 영화 정보 공유 기능
![Movies-Chrome-2023-06-09-11-07-17](https://github.com/halfhalf-chicken/halfchicken-movie/assets/126348461/05319e5b-37e3-40e0-b4e7-861d19a9230d)

### 8) 상세페이지 홈화면 이동 가능 UI
![Movies-Chrome-2023-06-09-11-08-11](https://github.com/halfhalf-chicken/halfchicken-movie/assets/126348461/bac77a52-a626-4d35-a637-09b7bf15372c)

### 9) 반응형 홈페이지

