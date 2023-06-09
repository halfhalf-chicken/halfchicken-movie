import { editDeleteBtn, editFinishBtn, editCancleBtn } from './formtag.js';
const submitBtn = document.querySelector('.submit-btn');

export function toggleBtn(btn) {
  if (btn) {
    editFinishBtn.classList.add('btn-active');
    editDeleteBtn.classList.add('btn-active');
    editCancleBtn.classList.add('btn-active');
    submitBtn.classList.remove('btn-active');
  } else {
    editFinishBtn.classList.remove('btn-active');
    editDeleteBtn.classList.remove('btn-active');
    editCancleBtn.classList.remove('btn-active');
    submitBtn.classList.add('btn-active');
  }
}