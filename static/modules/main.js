import { URL, URLPOPULAR } from './fetchurl.js';
import { OPTIONS, OPTIONSPOPULAR } from './options.js';
import { makeCard } from './makecard.js';

//  Fetch
async function fetchMovie() {
  const response = await fetch(URL, OPTIONS);
  const data = await response.json();
  const movies = data.results;
  return movies;
}
async function fetchMoviePop() {
  const popResponse = await fetch(URLPOPULAR, OPTIONSPOPULAR);
  const popData = await popResponse.json();
  const moviesPopular = popData.results;
  return moviesPopular;
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
  // // location.href = `/detail.html?contentId=${contentId}`;
  location.href = '/detail.html?contentId' + contentId;
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

//  Select Sorting
const toggleBtn = document.querySelector('.dropdown-toggle');
const menu = document.querySelector('.dropdown-menu');
const options = document.querySelectorAll('.dropdown-option');

toggleBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});
toggleBtn.addEventListener('blur', () => {
  menu.classList.remove('show');
});

options.forEach(function (item) {
  item.addEventListener('click', function (e) {
    const optionValue = e.currentTarget.innerText;
    toggleBtn.innerText = optionValue;
    toggleBtn.classList.add('selected');
  });
});

const popularSort = document.querySelector('.sorting-pop');
const sortingName = document.querySelector('.sorting-name');
const sortingAvg = document.querySelector('.sorting-avg');
const sortingRelease = document.querySelector('.sorting-release');

const $box = document.getElementById('flex-box');

// 인기순 정렬
popularSort.addEventListener('click', async function () {
  const moviesPopular = await fetchMoviePop();
  console.log('moviesPopular', moviesPopular);
  $box.innerHTML = '';
  makeCard(moviesPopular);
});
