export async function appendGenre(movies, movieId, movieGenre) {
  let result2 = [];
  movies.forEach(movies => {
    const { id, genre_ids, title, poster_path } = movies;
    const contentId = `${id}`;
    const genreSection = document.querySelector('.items');
    const innerli = document.createElement('li');
    const img = document.createElement('img');
    const p = document.createElement('p');

    innerli.setAttribute('class', 'genre-card');
    img.setAttribute('class', 'card-image');
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${poster_path}`);
    img.setAttribute('alt', title);
    p.setAttribute('class', 'card-title');
    p.innerText = title;

    innerli.appendChild(img);
    innerli.appendChild(p);

    innerli.addEventListener('click', () => {
      location.href = '/detail.html?contentId' + contentId;
    });
    const result = movieGenre.filter(x => genre_ids.includes(x));
    if (result.length >= 1 && movieId != contentId) {
      genreSection.appendChild(innerli);
      result2.push(result);
    }
  });
  return result2;
}
