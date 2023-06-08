import { commentInput, pwInput } from './input.js';

export async function fetchEditReview(checkPwResult, editReviewId) {
  if (!checkPwResult) {
    alert('비밀번호를 확인해 주세요');
    pwInput.focus();
    return false;
  } else {
    let content = commentInput.value;
    let _id = editReviewId;
    let formData = new FormData();
    formData.append('_id_give', _id);
    formData.append('content_give', content);

    const response = await fetch('/reviews/update', { method: 'PUT', body: formData });
    const msg = await response.json();
    alert(msg['msg']);
    location.reload();
  }
}