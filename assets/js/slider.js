const slider = document.querySelector('.slider-container');
const track = slider.querySelector('.slider-track');
const slides = Array.from(track.children);

// 🔁 DUPLICA LE SLIDE (loop vero)
slides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
});

// posizione iniziale (metà)
requestAnimationFrame(() => {
    slider.scrollLeft = track.scrollWidth / 4;
});

let isDown = false;
let startX;
let scrollLeft;

// DRAG mouse
slider.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseup', () => isDown = false);
slider.addEventListener('mouseleave', () => isDown = false);

slider.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});

// Touch
slider.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
});

// 🔁 LOOP LOGIC
slider.addEventListener('scroll', () => {
    const half = track.scrollWidth / 2;

    if (slider.scrollLeft >= half) {
        slider.scrollLeft -= half;
    } else if (slider.scrollLeft <= 0) {
        slider.scrollLeft += half;
    }
});
