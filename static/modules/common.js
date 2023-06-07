//  Top btn
export function scrollTop() {
  const $topBtn = document.querySelector('aside nav button');
  $topBtn.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
