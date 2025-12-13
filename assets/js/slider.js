const slider = document.querySelector('.slider-container');
const track = slider.querySelector('.slider-track');

// MODAL SLIDER
const sliderModal = document.getElementById('sliderImgModal');
const sliderModalImg = document.getElementById('sliderModalImg');

// ===== LOOP =====
const slides = Array.from(track.children);
slides.forEach(slide => track.appendChild(slide.cloneNode(true)));

requestAnimationFrame(() => {
    slider.scrollLeft = track.scrollWidth / 4;
});

// ===== DRAG =====
let isDown = false;
let startX;
let scrollLeft;
let hasDragged = false;

slider.addEventListener('mousedown', e => {
    isDown = true;
    hasDragged = false;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    hasDragged = true;
    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
});

['mouseup', 'mouseleave'].forEach(evt =>
    slider.addEventListener(evt, () => isDown = false)
);

// Touch
slider.addEventListener('touchstart', e => {
    hasDragged = false;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', e => {
    hasDragged = true;
    const x = e.touches[0].pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 1.5;
});

// ===== LOOP LOGIC =====
slider.addEventListener('scroll', () => {
    const half = track.scrollWidth / 2;
    if (slider.scrollLeft >= half) slider.scrollLeft -= half;
    if (slider.scrollLeft <= 0) slider.scrollLeft += half;
});

// ===== CLICK → MODAL =====
track.addEventListener('click', e => {
    if (hasDragged) return;

    const img = e.target.closest('.slide')?.querySelector('img');
    if (!img) return;

    sliderModalImg.src = img.src;
    sliderModal.style.display = 'flex';
});

// ===== CLOSE MODAL =====
sliderModal.addEventListener('click', () => {
    sliderModal.style.display = 'none';
    sliderModalImg.src = '';
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        sliderModal.style.display = 'none';
        sliderModalImg.src = '';
    }
});
