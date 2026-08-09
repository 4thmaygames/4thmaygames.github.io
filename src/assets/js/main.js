(function () {
  "use strict";

  /* 이미지 없을 때 자리표시자 */
  document.querySelectorAll(".media img").forEach(function (img) {
    var fail = function () {
      var box = img.closest(".media");
      if (box) box.classList.add("is-missing");
      img.remove();
    };
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* 스크롤 등장 애니메이션 */
  var targets = document.querySelectorAll("[data-reveal]");
  if (targets.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
