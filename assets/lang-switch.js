(function () {
  function toEnPath(pathname) {
    if (pathname === "/") return "/en/";
    if (pathname.startsWith("/en/")) return pathname;
    return "/en" + pathname;
  }

  function toZhPath(pathname) {
    if (!pathname.startsWith("/en/")) return pathname;
    var zh = pathname.slice(3);
    if (!zh || zh === "/") return "/";
    return zh;
  }

  var pathname = window.location.pathname || "/";
  var switches = document.querySelectorAll("[data-lang-target]");
  var hasMounted = false;

  switches.forEach(function (node) {
    var target = node.getAttribute("data-lang-target");
    if (target === "en") {
      node.setAttribute("href", toEnPath(pathname));
      hasMounted = true;
    } else if (target === "zh") {
      node.setAttribute("href", toZhPath(pathname));
      hasMounted = true;
    }
  });

  if (!hasMounted) {
    var floating = document.createElement("a");
    var isEn = pathname.startsWith("/en/");
    floating.className = "floating-lang-switch";
    floating.setAttribute("data-lang-target", isEn ? "zh" : "en");
    floating.textContent = isEn ? "中文" : "EN";
    floating.href = isEn ? toZhPath(pathname) : toEnPath(pathname);
    document.body.appendChild(floating);
  }

  if (!document.querySelector("script[data-nowgowest-visuals]")) {
    var visualScript = document.createElement("script");
    visualScript.src = "/assets/visual-upgrade.js";
    visualScript.setAttribute("data-nowgowest-visuals", "1");
    document.body.appendChild(visualScript);
  }

  if (!document.querySelector("script[data-nowgowest-brand-logos]")) {
    var brandScript = document.createElement("script");
    brandScript.src = "/assets/brand-logo-wall.js";
    brandScript.setAttribute("data-nowgowest-brand-logos", "1");
    document.body.appendChild(brandScript);
  }
})();
