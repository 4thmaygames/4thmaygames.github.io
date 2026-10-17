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

  /* ---------- 한국어 / English 전환 ----------
     번역 대상은 data-ko / data-en 속성을 가진 요소입니다.
     문구를 고치려면 games.json 과 base.njk 의 해당 속성만 바꾸면 됩니다. */
  var langBtns = document.querySelectorAll(".lang-switch [data-lang]");
  if (langBtns.length) {
    var LANGS = ["ko", "en"];
    var STORE_KEY = "4mg-lang";

    function applyLang(lang) {
      if (LANGS.indexOf(lang) < 0) lang = "ko";

      document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
        var v = el.getAttribute("data-" + lang);
        if (v !== null) el.textContent = v;
      });

      document.querySelectorAll(".modal-close").forEach(function (b) {
        var v = b.getAttribute("data-" + lang + "-label");
        if (v) b.setAttribute("aria-label", v);
      });

      langBtns.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang));
      });

      document.documentElement.lang = lang;
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
      try { history.replaceState(null, "", lang === "ko" ? location.pathname : "#en"); } catch (e) {}
    }

    /* 우선순위: 주소의 #en/#ko → 지난번 선택 → 브라우저 언어 */
    var initial = (location.hash || "").replace("#", "");
    if (LANGS.indexOf(initial) < 0) {
      try { initial = localStorage.getItem(STORE_KEY) || ""; } catch (e) { initial = ""; }
    }
    if (LANGS.indexOf(initial) < 0) {
      initial = (navigator.language || "en").toLowerCase().indexOf("ko") === 0 ? "ko" : "en";
    }
    applyLang(initial);

    langBtns.forEach(function (b) {
      b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });
  }
})();
