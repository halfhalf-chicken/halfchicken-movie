import { OPTIONSDETAIL } from './options.js';
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
  document.querySelectorAll('.avg > span')[1].innerText = vote_average.toFixed(1);
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
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const pwInput = document.getElementById('pw-input');

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  postReview();
  location.reload();
});

async function postReview() {
  let movieId = para;
  let userName = nameInput.value;
  let userComment = commentInput.value;
  let userPw = pwInput.value;

  let formData = new FormData();
  formData.append('movie_give', movieId);
  formData.append('name_give', userName);
  formData.append('comment_give', userComment);
  formData.append('pw_give', userPw);

  const response = await fetch('/reviews/upload', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  console.log(data['msg']);
}

async function getMongoReviews() {
  const response = await fetch('/reviews/read');
  const data = await response.json();
  const reviews = data.result;
  return reviews;
}

const commentArea = document.querySelector('.comment-list ul');
async function listingMongoReviews() {
  const reviews = await getMongoReviews();
  const matchReview = reviews.filter(item => {
    return item.movie === para;
  });

  matchReview.forEach(item => {
    let { comment, name, _id } = item;
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const p = document.createElement('p');

    span.innerText = name;
    btn1.innerText = '수정';
    btn2.innerText = '삭제';
    p.innerText = comment;
    li.setAttribute('id', _id);
    btn1.setAttribute('class', 'edit-btn');
    btn2.setAttribute('class', 'del-btn');
    span.setAttribute('class', 'user-name');

    div.append(span, btn1, btn2);
    li.append(div, p);
    commentArea.append(li);
  });
}

listingMongoReviews();

commentArea.addEventListener('click', deleteReview);
async function deleteReview(e) {
  if (e.target.className !== 'del-btn') return false;
  let _id = e.target.closest('li').getAttribute('id');

  let userPw = prompt('비밀번호를 입력해 주세요');
  let checkPwResult = await checkPw(_id, userPw);

  if (!checkPwResult) {
    alert('비밀번호를 확인해 주세요');
    return false;
  } else {
    if (confirm('정말 삭제하시겠습니까?')) {
      let formData = new FormData();
      formData.append('_id_give', _id);
      const response = await fetch('/reviews/delete', { method: 'DELETE', body: formData });
      const msg = await response.json();
      alert(msg['msg']);
      location.reload();
    } else {
      return false;
    }
  }
}

async function checkPw(_id, userPw) {
  const reviews = await getMongoReviews();
  let matchMovie = reviews.find(item => item._id === _id);
  let originPw = matchMovie.pw;

  if (originPw === userPw) {
    return true;
  } else {
    return false;
  }
}

let editReviewId = null;
commentArea.addEventListener('click', clickEditBtn);
async function clickEditBtn(e) {
  if (e.target.className !== 'edit-btn') return false;
  let _id = e.target.closest('li').getAttribute('id');
  toggleBtn('edit-btn');
  editReviewId = _id;
  const reviews = await getMongoReviews();
  let matchMovie = reviews.find(item => item._id === _id);
  let { name, comment, pw } = matchMovie;
  nameInput.value = name;
  commentInput.value = comment;
  // nameInput.setAttribute('disabled', true);
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
  if (!checkPwResult) {
    alert('비밀번호를 확인해 주세요');
    pwInput.focus();
    return false;
  } else {
    if (confirm('정말 삭제하시겠습니까?')) {
      let formData = new FormData();
      formData.append('_id_give', editReviewId);
      const response = await fetch('/reviews/delete', { method: 'DELETE', body: formData });
      const msg = await response.json();
      alert(msg['msg']);
      location.reload();
    } else {
      return false;
    }
  }
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
  if (!checkPwResult) {
    alert('비밀번호를 확인해 주세요');
    pwInput.focus();
    return false;
  } else {
    let userComment = commentInput.value;
    let _id = editReviewId;
    let formData = new FormData();
    formData.append('_id_give', _id);
    formData.append('comment_give', userComment);

    const response = await fetch('/reviews/update', { method: 'PUT', body: formData });
    const msg = await response.json();
    alert(msg['msg']);
    location.reload();
  }
}

const editCancleBtn = document.querySelector('.edit-cancle-btn');
editCancleBtn.addEventListener('click', () => {
  toggleBtn();
  nameInput.setAttribute('disabled', false);
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

document.querySelector('.story-more-btn').addEventListener('click', () => {
  document.querySelector('.story-second >p').classList.remove('movie-story-close');
  document.querySelector('.story-more-btn').style.display = 'none';
});
