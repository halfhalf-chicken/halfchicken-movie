export function moveSlide(movies) {
  const slides = document.querySelector('.items');
  const slideCount = movies.length;
  let screenWidth = window.innerWidth;
  let sliderBtndoc = document.querySelector('.slider-btn');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let clickCount = 0;
  let sW = slides.offsetWidth;
  let posX = (clickCount * sW) / slideCount;

  if (slideCount <= 5) {
    sliderBtndoc.style.display = 'none';
  } else {
    sliderBtndoc.style.display = 'flex';
  }

  if (screenWidth < 768) {
    slides.style.width = 50 * slideCount + '%';
    sW = slides.offsetWidth;
    posX = (clickCount * sW) / slideCount;
    prev.addEventListener('click', function () {
      if (clickCount === 0) {
        return false;
      } else {
        clickCount--;
        posX = (clickCount * sW) / slideCount;
        slides.style.transform = `translateX(-${posX}px)`;
      }
    });
  
    next.addEventListener('click', function () {
      if (clickCount < slideCount - 4) {
        clickCount++;
        posX = (clickCount * sW) / slideCount;
        slides.style.transform = `translateX(-${posX}px)`;
      } else {
        return false;
      }
    });
  } else if (screenWidth < 1200) {
    slides.style.width = 33.333 * slideCount + '%';
    sW = slides.offsetWidth;
    posX = (clickCount * sW) / slideCount;
    prev.addEventListener('click', function () {
      if (clickCount === 0) {
        return false;
      } else {
        clickCount--;
        posX = (clickCount * sW) / slideCount;
        slides.style.transform = `translateX(-${posX}px)`;
      }
    });
  
    next.addEventListener('click', function () {
      if (clickCount < slideCount - 3) {
        clickCount++;
        posX = (clickCount * sW) / slideCount;
        slides.style.transform = `translateX(-${posX}px)`;
      } else {
        return false;
      }
    });
  } else {
    slides.style.width = 20 * slideCount + '%';
    sW = slides.offsetWidth;
    posX = (clickCount * sW) / slideCount;
    prev.addEventListener('click', function () {
      if (clickCount === 0) {
        return false;
      } else {
        clickCount--;
        posX = (clickCount * sW) / slideCount;
        slides.style.transform = `translateX(-${posX}px)`;
      }
    });
  
    next.addEventListener('click', function () {
      if (clickCount < slideCount - 5) {
        clickCount++;
        posX = (clickCount * sW) / slideCount;
        slides.style.transform = `translateX(-${posX}px)`;
      } else {
        return false;
      }
    });
  }

  slides.style.minWidth = '100%';
  // sW = slides.offsetWidth;
  // posX = (clickCount * sW) / slideCount;

  window.onresize = function (event) {
    let screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      slides.style.width = 50 * slideCount + '%';
      sW = slides.offsetWidth;
      posX = (clickCount * sW) / slideCount;
      slides.style.transform = `translateX(-${posX}px)`;
    } else if (screenWidth < 1200) {
      slides.style.width = 33.333 * slideCount + '%';
      sW = slides.offsetWidth;
      posX = (clickCount * sW) / slideCount;
      slides.style.transform = `translateX(-${posX}px)`;
    } else {
      slides.style.width = 20 * slideCount + '%';
      sW = slides.offsetWidth;
      posX = (clickCount * sW) / slideCount;
      slides.style.transform = `translateX(-${posX}px)`;
    }
  };

  // prev.addEventListener('click', function () {
  //   if (clickCount === 0) {
  //     return false;
  //   } else {
  //     clickCount--;
  //     posX = (clickCount * sW) / slideCount;
  //     slides.style.transform = `translateX(-${posX}px)`;
  //   }
  // });

  // next.addEventListener('click', function () {
  //   if (clickCount < slideCount - 5) {
  //     clickCount++;
  //     posX = (clickCount * sW) / slideCount;
  //     slides.style.transform = `translateX(-${posX}px)`;
  //   } else {
  //     return false;
  //   }
  // });
}
