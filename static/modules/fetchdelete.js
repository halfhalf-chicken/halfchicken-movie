import { pwInput } from './input.js';

export async function fetchDelete(checkPwResult, editReviewId) {
  if (!checkPwResult) {
    alert('비밀번호를 확인해 주세요');
    pwInput.focus();
    return false;
  } else {
    if (confirm('정말 삭제하시겠습니까?')) {
      let formData = new FormData();
      formData.append('_id_give', editReviewId);
      const response = await fetch('/reviews/delete', { method: 'DELETE', body: formData });
      const msg = await response.json();
      alert(msg['msg']);
      location.reload();
    } else {
      return false;
    }
  }
}