const commentArea = document.querySelector('.comment-list ul');

export function makeMongoList(matchReview) {
  matchReview.forEach(item => {
    let { content, author, _id } = item;
    const li = document.createElement('li');
    const outerDiv = document.createElement('div');
    const innerDiv = document.createElement('div');
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const p = document.createElement('p');

    span.innerText = author;
    btn1.innerText = '수정';
    btn2.innerText = '삭제';
    p.innerText = content;
    li.setAttribute('id', _id);
    btn1.setAttribute('class', 'edit-btn');
    btn2.setAttribute('class', 'del-btn');
    span.setAttribute('class', 'user-name');
    innerDiv.append(btn1, btn2);

    outerDiv.append(span, innerDiv);
    li.append(outerDiv, p);
    commentArea.append(li);
  });
}
