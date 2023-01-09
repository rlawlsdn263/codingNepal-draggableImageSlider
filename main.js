const carousel = document.querySelector(".carousel");
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  prevPageX,
  prevScrollLeft;

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    console.log(icon);
  });
});

const dragStart = (e) => {
  //updating global variables value on mouse down event
  isDragStart = true;
  prevPageX = e.pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  //이미지 포인터 기준으로 왼쪽으로 이동하기
  if (!isDragStart) return;
  e.preventDefault();
  let positionDiff = e.pageX - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
};

const dragStop = () => {
  isDragStart = false;
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);

//pageX

//마우스클릭 VS 마우스 다운
//https://kimgeuntae.tistory.com/16
