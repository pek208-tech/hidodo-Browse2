const trialContent = document.querySelector(".trial-content");
const quickWrap = document.querySelector(".quick-wrap");

const sections = document.querySelectorAll(
  ".trial-content > .experience"
);

const quickItems = document.querySelectorAll(
  ".quick-menu__item"
);

const topButtons = document.querySelectorAll(".quick-top");

const mobileTopButton = document.querySelector(".quick-top.mo-only");

const firstExperience = sections[0];

// 마지막 CTA
const ctaSection = document.querySelector(".cta-section");


// ------------------------------
// Smooth Scroll
// ------------------------------

function smoothScrollTo(target, duration = 900) {
  const targetY =
    target.getBoundingClientRect().top +
    window.pageYOffset;

  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(
      elapsed / duration,
      1
    );

    const eased = easeInOutCubic(progress);

    window.scrollTo(
      0,
      startY + distance * eased
    );

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}


// ------------------------------
// Active Menu
// ------------------------------

const setActiveMenu = (id) => {
  quickItems.forEach((item) => {
    item.classList.toggle(
      "is-active",
      item.dataset.target === id
    );
  });
};


// ------------------------------
// Quick Menu Show / Hide
// ------------------------------

const updateQuickMenu = () => {
  if (!firstExperience || !quickWrap) return;

  const firstRect = firstExperience.getBoundingClientRect();
  const ctaRect = ctaSection?.getBoundingClientRect();

  const isCtaInView =
    ctaRect &&
    ctaRect.top < window.innerHeight * 0.4;

  // CTA 구간에서는 둘 다 숨김
  if (isCtaInView) {
    quickWrap.classList.remove("is-visible");
    mobileTopButton?.classList.remove("is-visible");
    return;
  }

  const showPoint = window.innerHeight * 0.6;

  if (firstRect.top <= showPoint) {
    quickWrap.classList.add("is-visible");
    mobileTopButton?.classList.add("is-visible");
  } else {
    quickWrap.classList.remove("is-visible");
    mobileTopButton?.classList.remove("is-visible");
  }
};


// ------------------------------
// Quick Menu
// ------------------------------

if (trialContent && quickWrap) {

  window.addEventListener(
    "scroll",
    updateQuickMenu,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateQuickMenu
  );

  updateQuickMenu();


  // ------------------------------
  // Scroll Active
  // ------------------------------

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setActiveMenu(
            entry.target.id
          );
        });
      },
      {
        rootMargin:
          "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  // ------------------------------
  // Quick Menu Click
  // ------------------------------

  quickItems.forEach((item) => {

    item.addEventListener(
      "click",
      (event) => {

        const targetId =
          item.dataset.target;

        const target =
          document.getElementById(
            targetId
          );

        if (!target) return;

        event.preventDefault();

        setActiveMenu(targetId);

        smoothScrollTo(
          target,
          900
        );
      }
    );

  });


  // ------------------------------
  // Top
  // ------------------------------

 topButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

}


// ------------------------------
// Main Preview Button
// ------------------------------

const previewButton =
  document.querySelector(
    ".hero__cta"
  );

previewButton?.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    const target =
      document.querySelector(
        "#level"
      );

    if (!target) return;

    smoothScrollTo(
      target,
      900
    );

  }
);


// ------------------------------
// Level Card Buttons
// ------------------------------

const levelButtons =
  document.querySelectorAll(
    ".level-card__link"
  );

levelButtons.forEach((button) => {

  button.addEventListener(
    "click",
    (event) => {

      const targetId =
        button.getAttribute("href");

      const target =
        document.querySelector(
          targetId
        );

      if (!target) return;

      event.preventDefault();

      smoothScrollTo(
        target,
        900
      );

    }
  );

});



const levelCards = document.querySelectorAll(".level__item");

levelCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    if (window.innerWidth > 768) return;

    // 기존 링크 클릭이면 카드 이벤트는 실행하지 않음
    if (event.target.closest("a")) return;

    const targetId = card.dataset.target;
    const target = document.getElementById(targetId);

    if (!target) return;

    smoothScrollTo(target, 900);
  });
});



const learningCards = document.querySelectorAll(".learning-card");

learningCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    // 모바일에서만 실행
    if (window.innerWidth > 768) return;

    // 카드 안의 실제 링크
    const link = card.querySelector("a");

    if (!link) return;

    // 원래 링크 자체를 누른 경우 중복 실행 방지
    if (event.target.closest("a")) return;

    // 기존 링크가 새 창으로 열리도록 되어 있다면
    window.open(
      link.href,
      "_blank",
      "noopener,noreferrer"
    );
  });
});