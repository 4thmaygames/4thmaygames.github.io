(function () {
  "use strict";

  /* ---------- 모바일 메뉴 ---------- */
  var toggle = document.querySelector("[data-nav-toggle]");
  var mobileNav = document.querySelector("[data-mobile-nav]");

  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "메뉴 열기" : "메뉴 닫기");
      mobileNav.hidden = open;
      document.body.style.overflow = open ? "" : "hidden";
    });

    // 링크 클릭 시 닫기
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
        document.body.style.overflow = "";
      }
    });

    // ESC로 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mobileNav.hidden) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
        document.body.style.overflow = "";
        toggle.focus();
      }
    });

    // 데스크톱으로 넓어지면 닫기
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860 && !mobileNav.hidden) {
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- 헤더 스크롤 경계선 ---------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 이미지 없을 때 placeholder ---------- */
  document.querySelectorAll(".media img").forEach(function (img) {
    var fail = function () {
      var box = img.closest(".media");
      if (box) box.classList.add("is-missing");
      img.remove();
    };
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ---------- 스크롤 등장 애니메이션 ---------- */
  var targets = document.querySelectorAll("[data-reveal]");
  if (targets.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    targets.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + "ms";
      io.observe(el);
    });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
