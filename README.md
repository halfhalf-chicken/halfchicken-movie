# halfchicken-movie

![메인헤더](https://github.com/remember0515/Re_Member/assets/108923582/b855eb98-cba8-45d9-810f-eecb4f707540)

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
-   [3. 기술스택](#3-기술스택)
-   [4. API Table](#4-API Table)
-   [5. 구현기능 및 화면](#5-구현기능 및 화면)

## 1. 프로젝트 소개
순수 바닐라 자바스크립트만으로 영화정보 오픈API인 TMDB(The Movie DB)를 사용한 영회리스트 조회 및 검색, 영화 상세정보 공유 등 반응형 UI 구현

## 2. 프로젝트 Notion
[반반치킨 Notion](https://www.notion.so/Team-938995f6f21843e89f2b1519a68ae352?pvs=4)

## 3. 기술스택
  <img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white"> 
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/fontawesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white">


## 4. API Table
| Number   | Method         | URL | Description          | Request            | Response            |
| ------ | ------------ | -------- | ---------------------------- | ---------------------------- | ---------------------------- |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |
| 1       | `POST`      | /api/llist   | 리스팅                 | {id : 영화id, title: 영화제목, }|                       |


## 5. 구현기능 및 화면

- TMDB API이용 영화 목록 불러오기
- 인기순, 이름순 등으로 영화 목록 정렬(메인 영화 목록 더보기 기능)
- 영화별 상세 정보
- 영화별 댓글 불러오기
- 영화별 댓글 등록, 수정, 삭제 (유효성 검사)
- 영화 상세페이지 하단, 같은 장르 영화 추천 리스트
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

### 5) 영화별 댓글 등록, 수정, 삭제 가능 (유효성 검사)

### 6) 영화 상세페이지 하단, 같은 장르 영화 추천 리스트

### 7) 영화 정보 공유 기능

### 8) 상세페이지 홈화면 이동 가능 UI

### 9) 반응형 홈페이지

