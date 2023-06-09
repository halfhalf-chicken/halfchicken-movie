import { nameInput, commentInput } from './input.js';
import { fetchMongoReviews } from './fetchmongoreviews.js';

export async function checkDB(_id, target) {
  if (_id === null) {
    let tmdbAuthor = target.parentNode.previousSibling.innerText;
    let tmdbContent = target.parentNode.parentNode.nextSibling.innerText;
    nameInput.value = tmdbAuthor;
    commentInput.value = tmdbContent;
  } else {
    const reviews = await fetchMongoReviews();
    let matchMovie = reviews.find(item => item._id === _id);
    let { author, content } = matchMovie;
    nameInput.value = author;
    commentInput.value = content;
  }
}
