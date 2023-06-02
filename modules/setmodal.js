export function setModal(clickMovie) {
  const { title, vote_average, poster_path, overview, original_language } =
    clickMovie;
  
  const $modalTitle = document.querySelector(".modal-body h3");
  const $modalAverage = document.querySelector(".modal-average");
  const $modalLanguage = document.querySelector(".language");
  const $modalImg = document.querySelector(".modal-content img");
  const $modalOverview = document.querySelector(".modal-content p");

  $modalTitle.innerText = title;
  $modalAverage.innerText = vote_average;
  $modalLanguage.innerText = original_language;
  $modalImg.setAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/${poster_path}`
  );
  $modalImg.setAttribute("alt", title);
  $modalOverview.innerText = overview;  
}