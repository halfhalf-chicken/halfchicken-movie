import { URL } from './fetchurl.js';
import { OPTIONS } from './options.js';
import { makeCard } from './makecard.js';

//  Fetch
async function fetchMovie() {
  const response = await fetch(URL, OPTIONS);
  const data = await response.json();
  const movies = data.results;
  return movies;
}

//  List card
async function listMovieCard(arr) {
  if (arr) {
    const $box = document.getElementById('flex-box');
    $box.innerHTML = '';
    makeCard(arr);
  } else {
    const movies = await fetchMovie();
    makeCard(movies);
  }
}
listMovieCard();

//  Search movie
const $frm = document.search;
$frm.addEventListener('submit', findMovie);
async function findMovie(e) {
  e.preventDefault();
  const movies = await fetchMovie();

  const userInput = $frm.searchInput.value.toLowerCase();
  const userMovieTitle = userInput.replace(/(\s*)/g, '');
  const matchMovies = movies.filter(item => {
    let titles = item.title.toLowerCase().replace(/(\s*)/g, '');
    return titles.includes(userMovieTitle);
  });

  if (matchMovies.length === 0) {
    const $box = document.getElementById('flex-box');
    $box.innerText = '찾으시는 영화가 없습니다. 검색어를 확인해 주세요.';
  } else {
    listMovieCard(matchMovies);
  }
}

//  Click logo
const $h1 = document.querySelector('.header h1');
$h1.addEventListener('click', () => {
  window.location.reload();
});

//  Click content
const $flexBox = document.getElementById('flex-box');
$flexBox.addEventListener('click', e => {
  if (e.target.getAttribute('id') === 'flex-box') {
    return false;
  }

  let content = e.target.parentNode;
  if (content.className !== 'content') {
    content = content.parentNode;
  }
  const contentId = content.getAttribute('id');
  alert(`id : ${contentId}`);
  // location.assign("/detail");
  location.href = '/detail';
});

//  Top btn
const $topBtn = document.querySelector('aside nav button');
$topBtn.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

//  Focus input
const $searchBtn = document.querySelector('.submitBtn');
$searchBtn.addEventListener('focus', () => {
  $searchBtn.classList.toggle('btn-focus');
});
$searchBtn.addEventListener('blur', () => {
  $searchBtn.classList.toggle('btn-focus');
});
$topBtn.addEventListener('focus', () => {
  $topBtn.classList.toggle('btn-focus');
});
$topBtn.addEventListener('blur', () => {
  $topBtn.classList.toggle('btn-focus');
});
