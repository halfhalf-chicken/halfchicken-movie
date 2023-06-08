export async function getMongoReviews() {
  const response = await fetch('/reviews/read');
  const data = await response.json();
  const reviews = data.result;
  return reviews;
}