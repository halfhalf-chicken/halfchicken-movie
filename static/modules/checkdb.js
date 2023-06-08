import { nameInput, commentInput } from './input.js';
import { getMongoReviews } from './getmongoreviews.js';

export async function checkDB(_id, target) {
  if(_id === null) {
    let tmdbAuthor = target.previousSibling.innerText;
    let tmdbContent = target.parentNode.nextSibling.innerText;
    nameInput.value = tmdbAuthor;
    commentInput.value = tmdbContent;
  } else {
    const reviews = await getMongoReviews();
    let matchMovie = reviews.find(item => item._id === _id);
    let { author, content } = matchMovie;
    nameInput.value = author;
    commentInput.value = content;
  }
}