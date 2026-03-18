(function () {
  function onReady(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
      return;
    }
    callback();
  }

  var visualMap = {
    shopify: {
      src: "/assets/visual-shopify.svg",
      zh: {
        title: "Shopify 建站与转化",
        desc: "从站点结构到支付物流，完整落地可执行路径。",
        alt: "Shopify 建站与转化流程图"
      },
      en: {
        title: "Shopify Launch & Conversion",
        desc: "Execution map from store architecture to conversion flow.",
        alt: "Shopify launch and conversion illustration"
      }
    },
    retail: {
      src: "/assets/visual-retail.svg",
      zh: {
        title: "零售渠道入驻布局",
        desc: "平台与线下渠道同步推进，减少试错成本。",
        alt: "美国零售渠道入驻示意图"
      },
      en: {
        title: "Retail Channel Rollout",
        desc: "Unified execution for marketplace and offline retail entry.",
        alt: "US retail channel entry illustration"
      }
    },
    growth: {
      src: "/assets/visual-growth.svg",
      zh: {
        title: "增长指标看板",
        desc: "围绕 CVR、AOV 与复购建立阶段优化节奏。",
        alt: "增长指标看板示意图"
      },
      en: {
        title: "Growth KPI Dashboard",
        desc: "Optimize CVR, AOV, and retention with stage-based actions.",
        alt: "Growth KPI dashboard illustration"
      }
    },
    operations: {
      src: "/assets/visual-operations.svg",
      zh: {
        title: "执行与交付管理",
        desc: "以周为单位推进任务、里程碑与交付清单。",
        alt: "执行与交付管理示意图"
      },
      en: {
        title: "Execution & Delivery",
        desc: "Milestone-driven execution with clear weekly deliverables.",
        alt: "Execution and delivery management illustration"
      }
    },
    guide: {
      src: "/assets/visual-guide.svg",
      zh: {
        title: "指南与资料体系",
        desc: "把复杂策略拆成可复用模板与检查清单。",
        alt: "指南与模板资料示意图"
      },
      en: {
        title: "Guides & Templates",
        desc: "Turn strategy into practical templates and checklists.",
        alt: "Guides and templates illustration"
      }
    },
    cases: {
      src: "/assets/visual-case.svg",
      zh: {
        title: "案例复盘视图",
        desc: "用真实结果拆解方案、动作与产出关系。",
        alt: "案例复盘示意图"
      },
      en: {
        title: "Case Review View",
        desc: "Break down actions, milestones, and measurable outcomes.",
        alt: "Case review illustration"
      }
    }
  };

  function isEnPage(pathname) {
    return pathname.indexOf("/en/") === 0;
  }

  function pickKeys(pathname) {
    var path = pathname.toLowerCase();

    if (path.indexOf("retail") > -1 || path.indexOf("home-depot") > -1) {
      return ["retail", "operations", "shopify"];
    }
    if (path.indexOf("case") > -1) {
      return ["cases", "growth", "operations"];
    }
    if (path.indexOf("guide") > -1 || path.indexOf("news") > -1 || path.indexOf("/posts/") > -1) {
      return ["guide", "growth", "shopify"];
    }
    if (path.indexOf("consult") > -1 || path.indexOf("quote") > -1) {
      return ["operations", "shopify", "growth"];
    }
    if (path.indexOf("resource") > -1 || path.indexOf("template") > -1 || path.indexOf("playbook") > -1 || path.indexOf("seo") > -1) {
      return ["guide", "operations", "growth"];
    }
    return ["shopify", "growth", "retail"];
  }

  function cardText(key, en) {
    return en ? visualMap[key].en : visualMap[key].zh;
  }

  function createImage(src, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  function createHeroSplit(keys, en) {
    var wrap = document.createElement("section");
    wrap.className = "auto-visual-split container reveal";

    var mainCard = document.createElement("article");
    mainCard.className = "auto-main-visual";
    var mainText = cardText(keys[0], en);

    var mainMedia = document.createElement("figure");
    mainMedia.className = "auto-visual-image-wrap";
    mainMedia.appendChild(createImage(visualMap[keys[0]].src, mainText.alt));

    var mainCopy = document.createElement("div");
    mainCopy.className = "auto-visual-copy";
    var mainTitle = document.createElement("h3");
    mainTitle.textContent = mainText.title;
    var mainDesc = document.createElement("p");
    mainDesc.textContent = mainText.desc;

    mainCopy.appendChild(mainTitle);
    mainCopy.appendChild(mainDesc);
    mainCard.appendChild(mainMedia);
    mainCard.appendChild(mainCopy);

    var side = document.createElement("div");
    side.className = "auto-side-visuals";

    var i;
    for (i = 1; i < keys.length; i += 1) {
      var key = keys[i];
      var text = cardText(key, en);
      var mini = document.createElement("article");
      mini.className = "auto-mini-visual";

      var miniMedia = document.createElement("figure");
      miniMedia.className = "auto-visual-image-wrap auto-visual-image-wrap--mini";
      miniMedia.appendChild(createImage(visualMap[key].src, text.alt));

      var miniCopy = document.createElement("div");
      miniCopy.className = "auto-visual-copy";
      var miniTitle = document.createElement("h3");
      miniTitle.textContent = text.title;
      var miniDesc = document.createElement("p");
      miniDesc.textContent = text.desc;

      miniCopy.appendChild(miniTitle);
      miniCopy.appendChild(miniDesc);

      mini.appendChild(miniMedia);
      mini.appendChild(miniCopy);
      side.appendChild(mini);
    }

    wrap.appendChild(mainCard);
    wrap.appendChild(side);
    return wrap;
  }

  function createBand(keys, en) {
    var band = document.createElement("section");
    band.className = "auto-visual-band container reveal";

    var heading = document.createElement("h2");
    heading.textContent = en ? "Execution Snapshots" : "执行场景示意";

    var grid = document.createElement("div");
    grid.className = "auto-visual-grid";

    var i;
    for (i = 0; i < keys.length; i += 1) {
      var key = keys[i];
      var text = cardText(key, en);
      var card = document.createElement("article");
      card.className = "auto-visual-card";

      var media = document.createElement("figure");
      media.className = "auto-visual-image-wrap auto-visual-image-wrap--card";
      media.appendChild(createImage(visualMap[key].src, text.alt));

      var copy = document.createElement("div");
      copy.className = "auto-visual-copy";
      var title = document.createElement("h3");
      title.textContent = text.title;
      var desc = document.createElement("p");
      desc.textContent = text.desc;

      copy.appendChild(title);
      copy.appendChild(desc);
      card.appendChild(media);
      card.appendChild(copy);
      grid.appendChild(card);
    }

    band.appendChild(heading);
    band.appendChild(grid);
    return band;
  }

  function addPostCover(keys, en) {
    var post = document.querySelector("article.post");
    if (!post || post.querySelector(".auto-post-cover")) {
      return;
    }

    var heroKey = keys[0];
    var text = cardText(heroKey, en);
    var h1 = post.querySelector("h1");
    if (!h1) {
      return;
    }

    var cover = document.createElement("figure");
    cover.className = "auto-post-cover";
    cover.appendChild(createImage(visualMap[heroKey].src, text.alt));

    if (h1.nextSibling) {
      post.insertBefore(cover, h1.nextSibling);
      return;
    }
    post.appendChild(cover);
  }

  function mountVisuals() {
    if (document.body && document.body.dataset.visualsMounted === "1") {
      return;
    }

    var path = window.location.pathname || "/";
    if (path.indexOf("us-chinese-shopify.html") > -1) {
      return;
    }

    var en = isEnPage(path);
    var keys = pickKeys(path);

    var main = document.querySelector("main");
    if (main && !document.querySelector(".auto-visual-split")) {
      var anchor = main.querySelector(".hero") || main.querySelector(".hero-panel") || main.firstElementChild;
      var split = createHeroSplit(keys, en);
      if (anchor) {
        if (anchor.classList && anchor.classList.contains("hero-panel") && anchor.parentElement) {
          anchor.parentElement.insertAdjacentElement("afterend", split);
        } else {
          anchor.insertAdjacentElement("afterend", split);
        }
      } else {
        main.prepend(split);
      }
    }

    addPostCover(keys, en);

    if (!document.querySelector(".auto-visual-band")) {
      var footer = document.querySelector("footer.site-footer");
      if (footer && footer.parentNode) {
        footer.parentNode.insertBefore(createBand(keys, en), footer);
      }
    }

    if (document.body) {
      document.body.dataset.visualsMounted = "1";
    }
  }

  onReady(mountVisuals);
})();
