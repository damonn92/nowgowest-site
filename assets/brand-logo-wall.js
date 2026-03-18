(function () {
  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  var brandMap = {
    homedepot: { name: "Home Depot", logo: "/assets/brand-logos-official/home-depot.svg" },
    target: { name: "Target+", logo: "/assets/brand-logos-official/target.svg" },
    targetplus: { name: "Target+", logo: "/assets/brand-logos-official/target.svg" },
    macys: { name: "Macy's", logo: "/assets/brand-logos-official/macys.png" },
    bloomingdales: { name: "Bloomingdale's", logo: "/assets/brand-logos-official/bloomingdales.svg" },
    nordstrom: { name: "Nordstrom", logo: "/assets/brand-logos-official/nordstrom.svg" },
    lowes: { name: "Lowe's", logo: "/assets/brand-logos-official/lowes.svg" },
    kohls: { name: "Kohl's", logo: "/assets/brand-logos-official/kohls.svg" },
    walmart: { name: "Walmart", logo: "/assets/brand-logos-official/walmart.svg" },
    amazon: { name: "Amazon", logo: "/assets/brand-logos-official/amazon.svg" },
    ebay: { name: "eBay", logo: "/assets/brand-logos-official/ebay.svg" },
    wayfair: { name: "Wayfair", logo: "/assets/brand-logos-official/wayfair.svg" },
    bestbuy: { name: "Best Buy", logo: "/assets/brand-logos-official/bestbuy.svg" },
    tiktokshop: { name: "TikTok Shop", logo: "/assets/brand-logos-official/tiktokshop.svg" },
    googleshopping: { name: "Google Shopping", logo: "/assets/brand-logos-official/googleshopping.svg" },
    bedbathbeyond: { name: "Bed Bath & Beyond", logo: "/assets/brand-logos-official/bed-bath-beyond.svg" }
  };

  function buildLogoPill(pill, info, fallbackName) {
    var name = (info && info.name) || fallbackName;
    pill.classList.add("brand-pill-logo");
    pill.innerHTML = "";

    if (!info || !info.logo) {
      pill.textContent = name;
      return;
    }

    var img = document.createElement("img");
    img.className = "brand-logo-img";
    img.src = info.logo;
    img.alt = name + " logo";
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";

    var fallback = document.createElement("span");
    fallback.className = "brand-logo-fallback";
    fallback.textContent = name;

    img.addEventListener("load", function () {
      fallback.style.display = "none";
    });

    img.addEventListener("error", function () {
      img.style.display = "none";
      fallback.style.display = "inline-block";
    });

    pill.appendChild(img);
    pill.appendChild(fallback);
  }

  function upgradeGrid(grid) {
    var pills = Array.prototype.slice.call(grid.querySelectorAll(".brand-pill"));
    if (!pills.length) return;

    var home = pills.find(function (pill) {
      return normalize(pill.textContent) === "homedepot";
    });

    if (home) {
      grid.insertBefore(home, grid.firstElementChild);
    }

    Array.prototype.slice.call(grid.querySelectorAll(".brand-pill")).forEach(function (pill) {
      var raw = (pill.textContent || "").trim();
      var info = brandMap[normalize(raw)] || null;
      buildLogoPill(pill, info, raw);
    });
  }

  function mountBrandLogos() {
    if (!document.body || document.body.dataset.brandLogosMounted === "1") return;

    var grids = document.querySelectorAll(".brand-grid");
    grids.forEach(upgradeGrid);

    document.body.dataset.brandLogosMounted = "1";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountBrandLogos);
  } else {
    mountBrandLogos();
  }
})();
