const carousel = document.querySelector(".carousel");

let isDragStart = false;

const dragStart = () => {
  isDragStart = true;
};

const dragging = (e) => {
  if (!isDragStart) return;
  // e.preventDefault();
  carousel.scrollLeft = e.pageX;
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
// carousel.addEventListener("mouseup", dragStop);

//pageX

//마우스클릭 VS 마우스 다운
//https://kimgeuntae.tistory.com/16
