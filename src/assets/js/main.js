(function () {
  "use strict";

  /* ---------- 이미지 없을 때 자리표시자 ---------- */
  document.querySelectorAll(".media img, .icon-img img").forEach(function (img) {
    var fail = function () {
      var box = img.closest(".media") || img.closest(".icon-img");
      if (box) box.classList.add("is-missing");
      img.remove();
    };
    img.addEventListener("error", fail);
    if (img.complete && img.naturalWidth === 0) fail();
  });

  /* ---------- 게임 설명 모달 ---------- */
  var openModal = null;
  var lastTrigger = null;

  function open(id, trigger) {
    var m = document.getElementById(id);
    if (!m) return;
    close();
    m.hidden = false;
    document.body.style.overflow = "hidden";
    openModal = m;
    lastTrigger = trigger || null;
    var btn = m.querySelector(".modal-close");
    if (btn) btn.focus();
  }

  function close() {
    if (!openModal) return;
    openModal.hidden = true;
    openModal = null;
    document.body.style.overflow = "";
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }

  document.querySelectorAll("[data-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      open(btn.getAttribute("data-open"), btn);
    });
  });

  document.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
    /* 모달 안에서 포커스가 빠져나가지 않도록 */
    if (e.key === "Tab" && openModal) {
      var f = openModal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
})();
