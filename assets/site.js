(function () {
  var lang = "zh";
  var toggle = document.getElementById("langToggle");

  function applyLang(nextLang) {
    lang = nextLang;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";

    var nodes = document.querySelectorAll("[data-zh][data-en]");
    nodes.forEach(function (node) {
      node.textContent = lang === "zh" ? node.dataset.zh : node.dataset.en;
    });

    if (toggle) {
      toggle.textContent = lang === "zh" ? "EN" : "中文";
    }
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLang(lang === "zh" ? "en" : "zh");
    });
  }

  applyLang("zh");
})();
