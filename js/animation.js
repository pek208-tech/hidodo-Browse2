// ==============================
// Hero Animation
// ==============================
const heroAnimations = document.querySelectorAll(
  '.js-hero-animation'
);

heroAnimations.forEach((item) => {
  const animation =
    item.dataset.animation || 'animate__fadeInUp';

  const delay =
    Number(item.dataset.delay) || 0;

  setTimeout(() => {
    item.classList.add(
      'is-show',
      'animate__animated',
      animation
    );
  }, delay);
});

