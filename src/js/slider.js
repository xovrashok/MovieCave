const previewBtn = document.querySelector(".preview-btn");
const nexBtn = document.querySelector(".next-btn");
const galleryMask = document.querySelector(".gallery-mask");
const gallery = document.querySelector(".gallery");

let currentShift = 0;

nexBtn.addEventListener("click", () => {
  const maxWidthGallery = gallery.scrollWidth;
  const galleryClientWidth = galleryMask.clientWidth;
  const maxShift = maxWidthGallery - galleryClientWidth;

  if (currentShift + 200 > maxShift) {
    return;
  } else {
    currentShift += 200;
    gallery.style.transform = `translateX(-${currentShift}px)`;
  }
});

previewBtn.addEventListener("click", () => {
  if (currentShift <= 0) {
    return;
  } else {
    currentShift -= 200;
    gallery.style.transform = `translateX(-${currentShift}px)`;
  }
});

export function resetGalleryScroll() {
  currentShift = 0;
  gallery.style.transform = "translateX(0px)";
}
