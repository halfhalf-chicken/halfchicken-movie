import { nameInput, commentInput, pwInput } from './input.js';

export function validationCheck() {
  let name = nameInput.value;
  let pw = pwInput.value;
  let comment = commentInput.value;
  const checkSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const checkSpace = /\s/g;

  if (name === '' || name === null) {
    alert('닉네임을 입력해 주세요');
    nameInput.focus();
    return false;
  } else if (pw === '' || pw === null) {
    alert('비밀번호를 입력해 주세요');
    pwInput.focus();
    return false;
  } else if (comment === '' || comment === null) {
    alert('한줄평을 입력해 주세요');
    commentInput.focus();
    return false;
  } else if (checkSpecial.test(name)) {
    alert('닉네임에 특수문자를 사용할 수 없습니다');
    nameInput.focus();
    return false;
  } else if (name.search(checkSpace) !== -1) {
    alert('닉네임에 공백을 사용할 수 없습니다');
    nameInput.focus();
    return false;
  } else {
    return true;
  }
}