export function moveToEditForm() {
  let secComment = document.querySelector('.comment');
  let posY = secComment.offsetTop;
  let docPosY = window.scrollY || document.documentElement.scrollTop;
  if(docPosY > posY - 200) {
    window.scrollTo({
      top: posY - 200,
      behavior: 'smooth',
    });
  } else {
    return false;
  }
}