export function makeCard(movies) {
  for (let i in movies) {
    let { id, title, poster_path, overview, vote_average } = movies[i];
    if (overview === '') {
      overview = '줄거리 정보가 없습니다';
    }
    const $box = document.getElementById('flex-box');
    const outerDiv = document.createElement('div');
    const innerDiv = document.createElement('div');
    const absolDiv = document.createElement('div');
    const img = document.createElement('img');
    const h3 = document.createElement('h3');
    const hr = document.createElement('hr');
    const p = document.createElement('p');

    outerDiv.setAttribute('class', 'content');
    outerDiv.setAttribute('id', id);
    img.setAttribute('src', `https://image.tmdb.org/t/p/w500/${poster_path}`);
    img.setAttribute('alt', title);
    absolDiv.setAttribute('class', 'average');
    innerDiv.setAttribute('class', 'content-text');
    absolDiv.innerText = vote_average;
    h3.innerText = title;
    p.innerText = overview;

    innerDiv.appendChild(h3);
    innerDiv.appendChild(hr);
    innerDiv.appendChild(p);
    outerDiv.appendChild(img);
    outerDiv.appendChild(absolDiv);
    outerDiv.appendChild(innerDiv);
    $box.appendChild(outerDiv);
  }
}
