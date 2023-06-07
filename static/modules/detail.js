import { OPTIONSDETAIL } from './options.js';

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
    genres = `${movie['genres'][0]['name']}, ${movie['genres'][1]['name']}`;
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
      default:
        production_countries = '국가정보 미확인';
        break;
    }
  }

  // console.log(
  //   enTitle,
  //   genres,
  //   overview,
  //   poster_path,
  //   production_countries,
  //   release_date,
  //   runtime,
  //   title,
  //   vote_average,
  //   movieYear,
  // );

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
  document.querySelector('.movie-story > p').innerText = overview;
  document.querySelector('.movie-poster > img').setAttribute('src', poster_path);
}

// take the movie id from this page
const para = document.location.href.split('contentId')[1];

fetchDetail(para);
listDetailMovie();

//  jincheol
const reviewForm = document.review;
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const pwInput = document.getElementById('pw-input');
const submitBtn = document.getElementById('submit-btn');

reviewForm.addEventListener('submit', e => {
  e.preventDefault();
  postReview();
  // location.reload();
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

async function getAllReviews() {
  const response = await fetch('/reviews/read');
  const data = await response.json();
  const reviews = data.result;
  return reviews;
}

const commentArea = document.querySelector('.comment-list ul');
async function listReviews() {
  const reviews = await getAllReviews();
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
listReviews();

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
  const reviews = await getAllReviews();
  let matchMovie = reviews.find(item => item._id === _id);
  let originPw = matchMovie.pw;

  if (originPw === userPw) {
    return true;
  } else {
    return false;
  }
}

commentArea.addEventListener('click', editReview);
async function editReview(e) {
  if (e.target.className !== 'edit-btn') return false;
  let _id = e.target.closest('li').getAttribute('id');

  const reviews = await getAllReviews();
  let matchMovie = reviews.find(item => item._id === _id);
  let { name, comment, pw } = matchMovie;
  nameInput.value = name;
  commentInput.value = comment;
}
