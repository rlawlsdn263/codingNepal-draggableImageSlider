const gallery = document.querySelector(".gallery");

const storage = ["img-1.jpg", "img-2.jpg", "img-3.jpg", "img-4.jpg"];
const IMG_TEMPLATE = (img) => `<img src=./images/${img} />`;

storage.forEach((item) => {
  gallery.insertAdjacentHTML("beforeend", IMG_TEMPLATE(item));
});

gallery.insertAdjacentHTML = `
  <img src="">
`;
