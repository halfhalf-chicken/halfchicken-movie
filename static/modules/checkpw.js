import { fetchMongoReviews } from "./fetchmongoreviews.js";

export async function checkPw(_id, userPw) {
  const reviews = await fetchMongoReviews();
  let matchMovie = reviews.find(item => item._id === _id);
  let originPw = matchMovie.pw;

  if (originPw === userPw) {
    return true;
  } else {
    return false;
  }
}
