const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false,
  prevPageX,
  prevScrollLeft;

let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    //좌아이콘 클릭시, 이미지 크기만큼 감소 아니라면 증가
    // carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    if (icon.id == "left") {
      carousel.scrollLeft -= firstImgWidth;
    } else {
      carousel.scrollLeft += firstImgWidth;
    }
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
