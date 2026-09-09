const trialContent = document.querySelector(".trial-content");
const quickWrap = document.querySelector(".quick-wrap");

const sections = document.querySelectorAll(".trial-content > .experience");

const quickItems = document.querySelectorAll(".quick-menu__item");

const topButtons = document.querySelectorAll(".quick-top");

const signupBanner = document.querySelector(".signup-banner");

const firstExperience = sections[0];

// 마지막 CTA
const ctaSection = document.querySelector(".cta-section");

const motionCards = document.querySelectorAll(".level__item");

// ------------------------------
// Smooth Scroll
// ------------------------------

function smoothScrollTo(target, duration = 900) {
  const targetY = target.getBoundingClientRect().top + window.pageYOffset;

  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * eased);

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
    item.classList.toggle("is-active", item.dataset.target === id);
  });
};

// ------------------------------
// Quick Menu Show / Hide
// ------------------------------

const updateQuickMenu = () => {
  if (!firstExperience || !quickWrap) return;

  const firstRect = firstExperience.getBoundingClientRect();
  const ctaRect = ctaSection?.getBoundingClientRect();

  const showPoint = window.innerHeight * 0.6;

  const isCtaInView = ctaRect && ctaRect.top < window.innerHeight * 0.4;

  // 퀵메뉴만 CTA에서 숨김
  if (firstRect.top <= showPoint && !isCtaInView) {
    quickWrap.classList.add("is-visible");
  } else {
    quickWrap.classList.remove("is-visible");
  }

  // TOP 버튼 + 가입 배너는 계속 유지
  if (firstRect.top <= showPoint) {
    topButtons.forEach((button) => {
      button.classList.add("is-visible");
    });

    signupBanner?.classList.add("is-visible");
  } else {
    topButtons.forEach((button) => {
      button.classList.remove("is-visible");
    });

    signupBanner?.classList.remove("is-visible");
  }
};

// ------------------------------
// Quick Menu
// ------------------------------

if (trialContent && quickWrap) {
  window.addEventListener("scroll", updateQuickMenu, { passive: true });

  window.addEventListener("resize", updateQuickMenu);

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
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // ------------------------------
  // Quick Menu Click
  // ------------------------------

  quickItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const targetId = item.dataset.target;

      const target = document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      setActiveMenu(targetId);

      smoothScrollTo(target, 900);
    });
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

const previewButton = document.querySelector(".hero__cta");

previewButton?.addEventListener("click", (event) => {
  event.preventDefault();

  const target = document.querySelector("#level");

  if (!target) return;

  smoothScrollTo(target, 900);
});

// ------------------------------
// Level Card Buttons
// ------------------------------

const levelCards = document.querySelectorAll(".level-card");

levelCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    const targetId = card.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

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
    window.open(link.href, "_blank", "noopener,noreferrer");
  });
});

motionCards.forEach((card) => {
  const motion = card.querySelector(".level-card__motion");

  if (!motion) return;

  motion.addEventListener("load", () => {
    const svg = motion.contentDocument?.querySelector("svg");
    const player = svg?.svgatorPlayer;

    console.log(motion.getAttribute("data"), player);

    if (!player) return;

    player.pause();

    card.addEventListener("mouseenter", () => {
      player.play();
    });

    card.addEventListener("mouseleave", () => {
      player.stop();
    });
  });
});


document.querySelectorAll(".learning-card").forEach((card) => {
  const image = card.querySelector(".learning-card__image");

  card.addEventListener("mouseenter", () => {
    image.src = image.dataset.gif;
  });

  card.addEventListener("mouseleave", () => {
    image.src = image.dataset.static;
  });
});


// ------------------------------
// 레일팝업
// ------------------------------

const railImages = document.querySelectorAll(
  ".experience__rail-set img"
);

const railPreview = document.querySelector(".rail-preview");
const railPreviewImage = document.querySelector(".rail-preview__image");
const railPreviewClose = document.querySelector(".rail-preview__close");

const railTracks = document.querySelectorAll(
  ".experience__rail-track"
);


// 팝업 열기
railImages.forEach((image) => {
  image.addEventListener("click", () => {
    const gif = image.dataset.gif;

    if (!gif || !railPreview || !railPreviewImage) return;

    railPreviewImage.src = gif;

    railPreview.classList.add("is-open");
    railPreview.setAttribute("aria-hidden", "false");

    // 레일 정지
    railTracks.forEach((track) => {
      track.style.animationPlayState = "paused";
    });
  });
});


// 팝업 닫기 함수
const closeRailPreview = () => {
  if (!railPreview || !railPreviewImage) return;

  railPreview.classList.remove("is-open");
  railPreview.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    
    railPreviewImage.src = "";
  }, 300);

  // 레일 다시 재생
  railTracks.forEach((track) => {
    track.style.animationPlayState = "running";
  });
  
};


// 닫기 버튼
railPreviewClose?.addEventListener("click", closeRailPreview);


// 팝업 배경 클릭
railPreview?.addEventListener("click", (event) => {
  if (event.target !== railPreview) return;

  closeRailPreview();
});



const rails = document.querySelectorAll(".experience__rail");

rails.forEach((rail) => {
  const track = rail.querySelector(".experience__rail-track");

  if (!track) return;

  rail.addEventListener("pointerenter", () => {
    track.style.animationPlayState = "paused";
  });

  rail.addEventListener("pointerleave", () => {
    // 팝업이 열려있으면 계속 정지
    const isModalOpen =
      document.querySelector(".rail-preview")?.classList.contains("is-open");

    if (!isModalOpen) {
      track.style.animationPlayState = "running";
    }
  });
});

// ------------------------------
// 직접 해보기 팝업
// ------------------------------

function openExperience(url) {
  const experienceModal =
    document.querySelector("#experience-modal");

  const experienceContainer =
    document.querySelector("#experience-container");

  experienceContainer.innerHTML = `
    <iframe
      src="${url}"
      class="experience-frame"
      allow="fullscreen; autoplay; pointer-lock"
      allowfullscreen
    ></iframe>
  `;

  experienceModal.classList.add("open");

  // 직접 해보기 팝업이 열리면 rail 정지
  railTracks.forEach((track) => {
    track.style.animationPlayState = "paused";
  });
}


function closeExperience() {
  const experienceModal =
    document.querySelector("#experience-modal");

  const experienceContainer =
    document.querySelector("#experience-container");

  experienceModal.classList.remove("open");

  experienceContainer.innerHTML = "";

  // 팝업을 닫으면 rail 다시 재생
  railTracks.forEach((track) => {
    track.style.animationPlayState = "running";
  });
}

