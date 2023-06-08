export function moveSlide(movies) {
  const slides = document.querySelector('.items');
  const slideCount = movies.length;
  let screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    slides.style.width = 50 * slideCount + '%';
  } else if (screenWidth < 1200) {
    slides.style.width = 33.333 * slideCount + '%';
  } else {
    slides.style.width = 20 * slideCount + '%';
  }
  slides.style.minWidth = '100%';
  let sW = slides.offsetWidth;
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let clickCount = 0;

  if (slideCount <= 5) {
    document.querySelector('.slider-btn').style.display = 'none';
  } else {
    document.querySelector('.slider-btn').style.display = 'flex';
  }

  prev.addEventListener('click', function () {
    if (clickCount === 0) {
      return false;
    } else {
      clickCount--;
      let posX = (clickCount * sW) / slideCount;
      slides.style.transform = `translateX(-${posX}px)`;
    }
  });

  next.addEventListener('click', function () {
    if (clickCount < slideCount - 5) {
      clickCount++;
      let posX = (clickCount * sW) / slideCount;
      slides.style.transform = `translateX(-${posX}px)`;
    } else {
      return false;
    }
  });
}
