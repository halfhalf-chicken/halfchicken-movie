import { OPTIONSDETAIL } from './options.js';
import { fetchDelete } from './fetchdelete.js';
import { getMongoReviews } from './getmongoreviews.js';
import { fetchPostReview } from './fetchpostreview.js';
import { fetchEditReview } from './fetcheditreview.js';
import { makeMongoList } from './makemongolist.js';
import { checkPw } from './checkpw.js';
import { validationCheck } from './validationcheck.js';
import { checkDB } from './checkdb.js';
import { nameInput, commentInput, pwInput } from './input.js';
import { moveToEditForm } from './movetoeditform.js';
import { scrollTop } from './common.js';
import { URL } from './fetchurl.js';

//  Top btn
const $topBtn = document.querySelector('aside nav button');
$topBtn.addEventListener('click', scrollTop);




// jieun
async function fetchDetail(movieId) {
  // get detail data
  const mostResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`, OPTIONSDETAIL);
  const mostData = await mostResponse.json();

  // get English movie title
  const enTitleResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, OPTIONSDETAIL);
  const forEnData = await enTitleResponse.json();
  const enTitle = forEnData['title'];

  // add English movie title to detail data
  mostData['enTitle'] = enTitle;

  return mostData;
}

async function listDetailMovie() {
  const movie = await fetchDetail(para);
  const enTitle = movie['enTitle'];
  const poster_path = `https://image.tmdb.org/t/p/w500/${movie['poster_path']}`;
  const release_date = movie['release_date'].replace(/-/g, '.');
  const runtime = movie['runtime'];
  const title = movie['title'];
  const vote_average = movie['vote_average'];
  const movieYear = movie['release_date'].substr(0, 4);

  let overview = ``;
  if (movie['overview'] === '') {
    overview = `줄거리 정보가 없습니다.`;
  } else {
    overview = movie['overview'];
  }
  let genres = ``;
  if (movie['genres'].length >= 2) {
    genres = `${movie['genres'][0]['name']}/${movie['genres'][1]['name']}`;
  } else {
    genres = `${movie['genres'][0]['name']}`;
  }
  let production_countries = '';
  if (movie['production_countries'].length === 0) {
    production_countries = '국가정보 미확인';
  } else {
    const nationCode = movie['production_countries'][0]['iso_3166_1'];
    switch (nationCode) {
      case '':
        production_countries = '국가정보 미확인';
        break;
      case 'KR':
        production_countries = '한국';
        break;
      case 'US':
        production_countries = '미국';
        break;
      case 'CN':
        production_countries = '중국';
        break;
      case 'JP':
        production_countries = '일본';
        break;
      case 'GB':
        production_countries = '영국';
        break;
      case 'FR':
        production_countries = '프랑스';
        break;
      case 'IN':
        production_countries = '인도';
        break;
      case 'DE':
        production_countries = '독일';
        break;
      case 'MX':
        production_countries = '멕시코';
        break;
      case 'RU':
        production_countries = '러시아';
        break;
      case 'KP':
        production_countries = '북한';
        break;
      case 'NZ':
        production_countries = '뉴질랜드';
        break;
      default:
        production_countries = '국가정보 미확인';
        break;
    }
  }

  // console.log(enTitle, genres, overview, poster_path, production_countries, release_date, runtime, title, vote_average, movieYear);

  // TODO querySelector로는 왜 안되는지 알기. (뭘빠뜨렸는지 확인)
  // document.querySelector('.movieTitle').innerText = title;
  document.getElementsByClassName('movieTitle')[0].innerText = title;
  document.getElementsByClassName('movieTitle')[1].innerText = title;
  document.querySelectorAll('.movie-year')[0].innerText = `, ${movieYear}`;
  document.querySelectorAll('.movie-year')[1].innerText = `, ${movieYear}`;
  document.querySelectorAll('.enTitle')[0].innerText = enTitle;
  document.querySelectorAll('.enTitle')[1].innerText = enTitle;
  document.querySelector('.release > span:nth-Child(2)').innerText = release_date;
  document.querySelector('.genres > span:nth-Child(2)').innerText = genres;
  document.querySelector('.runtime > span:nth-Child(2)').innerText = `${runtime}분`;
  document.querySelector('.nation > span:nth-Child(2)').innerText = production_countries;
  document.querySelectorAll('.movie-story > p')[0].innerText = overview;
  document.querySelectorAll('.movie-story > p')[1].innerText = overview;
  document.querySelector('.movie-poster > img').setAttribute('src', poster_path);
  document.querySelectorAll('.avg > span')[1].append(` ${vote_average.toFixed(1)}`);
}

async function fetchMovie() {
  const response = await fetch(URL, OPTIONSDETAIL);
  const data = await response.json();
  const movies = data.results;
  return movies;
}

// 장르 추천(song)
async function listGenreMovie() {
  const movies = await fetchMovie();
  const movie = await fetchDetail(para);
  const movieId = movie.id;
  // 배열 안 객체 중 key(id)값을 가진 것을 다시 배열로!
  const movieGenre = [];
  for (var a of movie['genres']) {
    movieGenre.push(a.id);
  }
  // console.log('영화 장르id->' + movieGenre);

  let result2 = [];

  movies.forEach(movies => {
    const { id, genre_ids, title, poster_path } = movies;
    const contentId = `${id}`;
    const genreSection = document.querySelector('.items');
    const card = document.createElement('li');

    card.className = 'genre-card';
    card.innerHTML = `
                     <img class=card-image src="https://image.tmdb.org/t/p/w500/${poster_path}" alt="${title}" />
                      <p class="card-title">${title}</p>           
    `;

    // card클릭 시 해당영화 페이지로
    card.addEventListener('click', () => {
      location.href = '/detail.html?contentId' + contentId;
    });

    // 장르 교집합 비교. 장르가 1개 이상 같을 경우
    const result = movieGenre.filter(x => genre_ids.includes(x));
    if (result.length >= 1 && movieId != contentId) {
      // console.log('비슷한 장르id->' + genre_ids);
      genreSection.appendChild(card);
      result2.push(result);
    }
  });
  slidShow(result2);
}

// take the movie id from this page
const para = document.location.href.split('contentId')[1];

fetchDetail(para);
listDetailMovie();
listGenreMovie();

// jin woo

async function slidShow(datas) {
  let movies = await datas;
  const slides = document.querySelector('.items'); //전체 슬라이드 컨테이너
  console.log(slides)
  const slideCount = movies.length; // 슬라이드 개수
  slides.style.width = 20 * slideCount + "%";
  slides.style.minWidth = "100%"
  
  let sW = slides.offsetWidth;
  
  const prev = document.querySelector('.prev'); //이전 버튼
  const next = document.querySelector('.next'); //다음 버튼
  let clickCount = 0; //  3개까지.

  prev.addEventListener('click', function () {
    if (clickCount === 0) {
      return false
    } else {
      clickCount--;
      let posX = clickCount * sW / slideCount;
      
      slides.style.transform = `translateX(-${posX}px)`;
    }

  });

  next.addEventListener('click', function () {
    if (clickCount < slideCount - 5) {
      clickCount++;
      let posX = clickCount * sW / slideCount;
      console.log(posX)
      slides.style.transform = `translateX(-${posX}px)`;
    } else {
      return false
    }

  });
}





//  jincheol
const reviewForm = document.review;

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  postReview();
});

async function postReview() {
  let validation = validationCheck();
  fetchPostReview(validation, para);
}

const commentArea = document.querySelector('.comment-list ul');
async function listingMongoReviews() {
  const reviews = await getMongoReviews();
  const matchReview = reviews.filter(item => {
    return item.movie === para;
  });
  makeMongoList(matchReview);
}

listingMongoReviews();

commentArea.addEventListener('click', deleteReview);
async function deleteReview(e) {
  if (e.target.className !== 'del-btn') return false;
  let _id = e.target.closest('li').getAttribute('id');
  let userPw = prompt('비밀번호를 입력해 주세요');
  let checkPwResult = await checkPw(_id, userPw);
  fetchDelete(checkPwResult, _id);
}

let editReviewId = null;
commentArea.addEventListener('click', clickEditBtn);
function clickEditBtn(e) {
  if (e.target.className !== 'edit-btn') return false;
  let _id = e.target.closest('li').getAttribute('id');
  editReviewId = _id;
  checkDB(_id, e.target);
  toggleBtn('edit-btn');
  moveToEditForm();
  nameInput.setAttribute('disabled', true);
  nameInput.style.filter = 'brightness(0.8)';
}

const editDeleteBtn = document.querySelector('.edit-delete-btn');
editDeleteBtn.addEventListener('click', clickDeleteBtn);
async function clickDeleteBtn() {
  let userPw = pwInput.value;
  if (!userPw) {
    alert('비밀번호를 입력해 주세요');
    return false;
  }
  let checkPwResult = await checkPw(editReviewId, userPw);
  fetchDelete(checkPwResult, editReviewId);
}

const editFinishBtn = document.querySelector('.edit-finish-btn');
editFinishBtn.addEventListener('click', editReview);
async function editReview() {
  if (!pwInput.value) {
    alert('비밀번호를 입력해 주세요');
    return false;
  } else if (!commentInput.value) {
    alert('한줄평을 입력해 주세요');
    return false;
  }
  let userpw = pwInput.value;
  let checkPwResult = await checkPw(editReviewId, userpw);
  fetchEditReview(checkPwResult, editReviewId);
}

const editCancleBtn = document.querySelector('.edit-cancle-btn');
editCancleBtn.addEventListener('click', () => {
  toggleBtn();
  nameInput.removeAttribute('disabled');
  nameInput.style.filter = 'brightness(1)';
});

function toggleBtn(btn) {
  const submitBtn = document.querySelector('.submit-btn');
  if (btn) {
    editFinishBtn.classList.add('btn-active');
    editDeleteBtn.classList.add('btn-active');
    editCancleBtn.classList.add('btn-active');
    submitBtn.classList.remove('btn-active');
  } else {
    editFinishBtn.classList.remove('btn-active');
    editDeleteBtn.classList.remove('btn-active');
    editCancleBtn.classList.remove('btn-active');
    submitBtn.classList.add('btn-active');
  }
}

// kitae
//  리뷰 데이터를 가공하고 웹 페이지에 표시
const listingTMDBReview = async payload => {
  let res = await payload;
  let reviews = res.results;
  reviews.forEach(item => {
    let { content, author } = item;
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const p = document.createElement('p');

    span.innerText = author;
    btn1.innerText = '수정';
    btn2.innerText = '삭제';
    p.innerText = content;
    btn1.setAttribute('class', 'edit-btn');
    btn2.setAttribute('class', 'del-btn');
    span.setAttribute('class', 'user-name');
    div.setAttribute('class', 'name-container');

    div.append(span, btn1, btn2);
    li.append(div, p);
    commentArea.append(li);
  });
};

// 리뷰 데이터를 TMDB로부터 가져 온 것.
const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5M2NjNDc1OTdlZTYxZjYzNGIyY2Q2M2IzMjU4OWU4NCIsInN1YiI6IjY0NzA4ODVmNzI2ZmIxMDE0NGU2MTFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zwtwBOelR-_HKiWkX99qxzRAQ9gkpp8PTRKAg8pIhy0',
  },
};
async function fetchReview() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${para}/reviews?language=en-US&page=1`, options2);
  const data = await response.json();
  return data;
}

let tmdbReviews = fetchReview();
listingTMDBReview(tmdbReviews);

// jieun +
document.querySelector('.story-more-btn').addEventListener('click', () => {
  document.querySelector('.story-second >p').classList.remove('movie-story-close');
  document.querySelector('.story-more-btn').style.display = 'none';
});

// 공유버튼 hover => class none toggle
document.querySelector('.show-shareBtn').addEventListener('mouseover', () => {
  document.querySelector('.share-box').classList.remove('none');
});
document.querySelector('.share-box').addEventListener('mouseover', () => {
  document.querySelector('.share-box').classList.remove('none');
});
document.querySelector('.show-shareBtn').addEventListener('mouseout', () => {
  document.querySelector('.share-box').classList.add('none');
});
document.querySelector('.share-box').addEventListener('mouseout', () => {
  document.querySelector('.share-box').classList.add('none');
});

const thisURL = document.location.href;
// copy thisURL to clipboard
const copyURL = async function () {
  try {
    await navigator.clipboard.writeText(thisURL);
    alert('현재 위치한 URL이 복사되었습니다!');
  } catch (error) {
    alert.error('Failed to copy: ', err);
  }
};
document.querySelector('.copythisURL > button').addEventListener('click', copyURL);

// sns share facebook
const shareFacebook = () => window.open('http://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
document.querySelector('.facebookImg').addEventListener('click', shareFacebook);

// sns share twitter
const shareTwitter = async () => {
  try {
    const movie = await fetchDetail(para);
    const thisTitle = movie['title'];
    window.open(`http://twitter.com/intent/tweet?text='영화 "${thisTitle}" 반드시 구경하러오세유'&url=${thisURL}`);
  } catch (error) {
    alert.error('Failed to share', err);
  }
};
// const shareTwitter = () => window.open(`http://twitter.com/intent/tweet?text='이것은 영화구먼유'&url=${thisURL}`);
document.querySelector('.twitterImg').addEventListener('click', shareTwitter);

// sns share NaverBlog
const shareNaver = async () => {
  try {
    const movie = await fetchDetail(para);
    const thisTitle = movie['title'];
    const naverShareAPI = encodeURI(`https://share.naver.com/web/shareView?url=${thisURL}&title=${thisTitle}`);
    window.open(naverShareAPI);
  } catch (error) {
    alert.error('Failed to share', err);
  }
};
document.querySelector('.NaverImg').addEventListener('click', shareNaver);

// kakao
// init 체크
if (!Kakao.isInitialized()) {
  Kakao.init('f6b9ec2f54f02b2bfb924e9beba10669');
}

var sendKakao = async function () {
  // 메시지 공유 함수
  const movie = await fetchDetail(para);
  const title = movie['title'];
  const poster = `https://image.tmdb.org/t/p/w500/${movie['poster_path']}`;

  Kakao.Link.sendDefault({
    objectType: 'feed', // 메시지 형식 : 피드 타입
    content: {
      title: `${title}`,
      description: `"${title}" 아직 안봤어? 꿀잼이라구! 들어와서 조금 더 살펴봐!`,
      imageUrl: `${poster}`, // 메인으로 보여질 이미지 주소
      link: {
        webUrl: thisURL,
        mobileWebUrl: thisURL,
      },
    },
  });
};

document.querySelector('.kakaoImg').addEventListener('click', sendKakao);
