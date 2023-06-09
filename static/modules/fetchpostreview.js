import { nameInput, commentInput, pwInput } from './input.js';

export async function fetchPostReview(validation, para) {
  if (validation) {
    let movieId = para;
    let author = nameInput.value;
    let content = commentInput.value;
    let userPw = pwInput.value;

    let formData = new FormData();
    formData.append('movie_give', movieId);
    formData.append('author_give', author);
    formData.append('content_give', content);
    formData.append('pw_give', userPw);

    const response = await fetch('/reviews/upload', {
      method: 'POST',
      body: formData,
    });
    const msg = await response.json();
    alert(msg['msg']);
    location.reload();
  } else {
    return false;
  }
}
