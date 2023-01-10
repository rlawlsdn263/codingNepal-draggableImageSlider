const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

const showHideIcons = () => {
  //carousel.scrollLeft의 값에 따라 버튼 보여주고 숨기기
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

//아이콘 담긴 배열 가져와 클릭 이벤트 부여하기
arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    //1번 이미지 + margin: 14px값
    let firstImgWidth = firstImg.clientWidth + 14;

    //icon.id가 left면 carousel.scrollLeft -= firstImgWidth, 아니면 += firstImgWidth
    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    setTimeout(() => showHideIcons(), 60);
  });
});

//이미지 좌우에 딱 붙이기
const autoSlide = () => {
  //이미지 더 없으면
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;

  //positionDiff값 +로 만들기
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;
  //캐러셀 중앙 배치를 위한 값
  let valDifference = firstImgWidth - positionDiff;

  //어느 방향으로 스크롤 하고 있는지 알아보기
  if (carousel.scrollLeft > prevScrollLeft) {
    //유저의 positionDiff가 33%보다 크다면 다른 값을 추가하라?
    //우스크롤이면 우로 붙임
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  //좌스크롤 중이면 좌로 붙임
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

//마우스 누르면 드래그 OK
const dragStart = (e) => {
  isDragStart = true;

  //prePageX와 prevScrollLeft 변수값 재할당
  prevPageX = e.pageX || e.touches[0].pageX;

  //scrollLeft는 요소의 현 scroll 위치를 반환
  //pageX는 마우스 좌표의 X좌표값
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  //마우스 누르지 않으면 스크롤X
  if (!isDragStart) return;

  //이미지 누르면 드래그하는 거 멈춤
  e.preventDefault();

  //자동 이동 버그 해결
  isDragging = true;

  carousel.classList.add("dragging");

  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;

  //마우스포인터가 이동한 만큼 좌측 스크롤
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  showHideIcons();
};

//마우스 떼면 드래그 X
const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");

  if (!isDragging) return;
  isDragging = false;
  //마우스 떼면 자동으로 슬라이드 붙기
  autoSlide();
};

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);

//mousemove
//pageX
//scrollLeft
//mousedown
//mouseup
//clientWidth;
//scroll-behavior: smooth;
//scroll-behavior: auto;
//scrollWidth
//clientWidth
//mouseleave
