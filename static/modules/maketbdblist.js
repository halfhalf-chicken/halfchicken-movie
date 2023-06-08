const commentArea = document.querySelector('.comment-list ul');
export function makeTmdbList(reviews) {
  reviews.forEach(item => {
    let { content, author } = item;
    const li = document.createElement('li');
    const div = document.createElement('div');
    const span = document.createElement('span');
    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const p = document.createElement('p');

    span.innerText = author;
    btn1.innerText = '수정';
    btn2.innerText = '삭제';
    p.innerText = content;
    btn1.setAttribute('class', 'edit-btn');
    btn2.setAttribute('class', 'del-btn');
    span.setAttribute('class', 'user-name');
    div.setAttribute('class', 'name-container');

    div.append(span, btn1, btn2);
    li.append(div, p);
    commentArea.append(li);
  });
}