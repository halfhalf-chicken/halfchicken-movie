const options2 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjdkNzRhNTRiYzEzNTE4ZDgyMTc1MjAzNzM4MzliNSIsInN1YiI6IjY0NzA4OGI1NTQzN2Y1MDE0NzVmMDU0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaD0cXTgqDH5QUE4-ZoUBQJFr9fuQMr0VtpdOJEbTxE',
  },
};
async function fetchDetail(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
    options2,
  );
  const data = await response.json();
  console.log(data);
  console.log(data['overview']);
  const movieDetails = data.results;
  return movieDetails;
}

// movie's certification api
const options3 = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjdkNzRhNTRiYzEzNTE4ZDgyMTc1MjAzNzM4MzliNSIsInN1YiI6IjY0NzA4OGI1NTQzN2Y1MDE0NzVmMDU0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FaD0cXTgqDH5QUE4-ZoUBQJFr9fuQMr0VtpdOJEbTxE',
  },
};

async function getMovieCertifi(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/release_dates`,
    options3,
  );
  const data = await response.json();
  console.log(data);
  let movieCertifi = undefined;
  data['results'].forEach(Nation => {
    if (
      Nation['iso_3166_1'] === 'KR' &&
      Boolean(Nation['release_dates'][0]['certification']) === true
    ) {
      movieCertifi = Nation['release_dates'][0]['certification'];
      return;
    }
  });
  console.log(movieCertifi);
}
const para = document.location.href.split('=')[1];
console.log(para);
fetchDetail(para);
getMovieCertifi(para);
