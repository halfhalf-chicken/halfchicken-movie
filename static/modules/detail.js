import { OPTIONSDETAIL } from './options.js';
import { URL } from './fetchurl.js';

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

async function fetchMovie() {
  const response = await fetch(URL, OPTIONSDETAIL);
  const data = await response.json();
  const movies = data.results;
  return movies;
}

// 장르 추천
async function listGenreMovie() {
  const movies = await fetchMovie();
  const movie = await fetchDetail(para);
  const movieId = movie.id;
  // 배열 안 객체 중 key(id)값을 가진 것을 다시 배열로!
  const movieGenre = [];
  for (var a of movie['genres']) {
    movieGenre.push(a.id);
  }
  console.log('영화 장르id->' + movieGenre);

  movies.forEach(movies => {
    const { id, genre_ids, title, poster_path } = movies;
    const contentId = `${id}`;
    const genreSection = document.querySelector('.genre-list');
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

    // 장르 교집합 비교 장르가 2개 이상 같을 경우
    const result = movieGenre.filter(x => genre_ids.includes(x));
    if (result.length > 1 && movieId != contentId) {
      console.log('비슷한 장르id->' + genre_ids);
      genreSection.appendChild(card);
    }
  });
}

// take the movie id from this page
const para = document.location.href.split('contentId')[1];

fetchDetail(para);
listDetailMovie();
listGenreMovie();

//  jincheol
const reviewForm = document.review;
const nameInput = document.getElementById('name-input');
const commentInput = document.getElementById('comment-input');
const pwInput = document.getElementById('pw-input');
const submitBtn = document.getElementById('submit-btn');

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

async function getAllReviews() {
  const response = await fetch('/reviews/read');
  const data = await response.json();
  const reviews = data.result;
  return reviews;
}

async function listReviews() {
  const reviews = await getAllReviews();
  const matchReview = reviews.filter(item => {
    return item.movie === para;
  });

  const commentArea = document.querySelector('.comment-list ul');
  matchReview.forEach(item => {
    let { comment, name } = item;
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

    div.append(span, btn1, btn2);
    li.append(div, p);
    commentArea.append(li);
  });

}
listReviews();
