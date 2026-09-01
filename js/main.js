const trialContent = document.querySelector('.trial-content');
const quickWrap = document.querySelector('.quick-wrap');

const sections = document.querySelectorAll(
  '.trial-content > .experience'
);

const quickItems = document.querySelectorAll(
  '.quick-menu__item'
);

const topButton = document.querySelector('.quick-top');

const firstExperience = sections[0];

// 마지막 CTA
const ctaSection = document.querySelector('.cta-section');


// ------------------------------
// Active Menu
// ------------------------------

const setActiveMenu = (id) => {
  quickItems.forEach((item) => {
    item.classList.toggle(
      'is-active',
      item.dataset.target === id
    );
  });
};


// ------------------------------
// Quick Menu Show / Hide
// ------------------------------

const updateQuickMenu = () => {
  if (!firstExperience || !quickWrap) return;

  const firstRect =
    firstExperience.getBoundingClientRect();

  const ctaRect =
    ctaSection?.getBoundingClientRect();


  // CTA가 화면에 보이면 무조건 숨김
  const isCtaInView =
    ctaRect &&
    ctaRect.top < window.innerHeight &&
    ctaRect.bottom > 0;

  if (isCtaInView) {
    quickWrap.classList.remove('is-visible');
    return;
  }


  // 첫 번째 Experience 진입 후 표시
  const showPoint =
    window.innerHeight * 0.6;

  if (firstRect.top <= showPoint) {
    quickWrap.classList.add('is-visible');
  } else {
    quickWrap.classList.remove('is-visible');
  }
};


if (trialContent && quickWrap) {

  window.addEventListener(
    'scroll',
    updateQuickMenu,
    { passive: true }
  );

  window.addEventListener(
    'resize',
    updateQuickMenu
  );

  updateQuickMenu();


  // ------------------------------
  // Scroll Active
  // ------------------------------

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        setActiveMenu(entry.target.id);
      });
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  // ------------------------------
  // Quick Menu Click
  // ------------------------------

  quickItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      const targetId = item.dataset.target;

      const target =
        document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      setActiveMenu(targetId);

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });


  // ------------------------------
  // Top
  // ------------------------------

  topButton?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}