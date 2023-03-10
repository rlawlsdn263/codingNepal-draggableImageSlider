const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;
// 스크롤값 최대치 얻기

const showHideIcons = () => {
  //carousel.scrollLeft과 0이면 좌 아이콘 display: none;
  // if (carousel.scrollLeft == 0) {
  //   arrowIcons[0].style.display = "none";
  // } else {
  //   arrowIcons[0].style.display = "block";
  // }
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    let firstImgWidth = firstImg.clientWidth + 14; //getting first img width & adding 14 margin value
    //좌아이콘 클릭시, 이미지 크기만큼 감소 아니라면 증가
    // carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    if (icon.id == "left") {
      carousel.scrollLeft -= firstImgWidth;
    } else {
      carousel.scrollLeft += firstImgWidth;
    }
  });
});

const autoSlide = () => {
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  let valDifference = firstImgWidth - positionDiff;

  if (carousel.scrollLeft > prevScrollLeft) {
    // if (positionDiff > firstImgWidth / 3) {
    //   carousel.scrollLeft += valDifference;
    // } else {
    //   carousel.scrollLeft -= positionDiff;
    // }
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  console.log("좌클");
};

const dragStart = (e) => {
  //updating global variables value on mouse down event
  isDragStart = true;
  // e.pagX는 데스크탑, e.touched[0].pageX는 터치 디바이스
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  //이미지 포인터 기준으로 왼쪽으로 이동하기
  if (!isDragStart) return;
  e.preventDefault();
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

//pageX

//마우스클릭 VS 마우스 다운
//https://kimgeuntae.tistory.com/16
