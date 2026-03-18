(function () {
  var form = document.getElementById("leadForm");
  if (!form) return;
  var STORAGE_KEY = "nowgowest_attribution_v1";
  var ATTR_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var META_KEYS = ["landing_page", "referrer_url", "first_visit_at"];

  function readField(name) {
    var field = form.elements[name];
    if (!field || typeof field.value !== "string") return "";
    return field.value.trim();
  }

  function readStoredAttribution() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};
      return parsed;
    } catch (error) {
      return {};
    }
  }

  function writeStoredAttribution(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      // Ignore storage failures (private mode / storage restrictions).
    }
  }

  function collectQueryAttribution() {
    var params = new URLSearchParams(window.location.search || "");
    var data = {};

    ATTR_KEYS.forEach(function (key) {
      var value = (params.get(key) || "").trim();
      if (value) data[key] = value;
    });

    return data;
  }

  function syncTrackingInputs(data) {
    ATTR_KEYS.concat(META_KEYS).forEach(function (key) {
      var input = document.getElementById(key);
      if (input) input.value = data[key] || "";
    });
  }

  var stored = readStoredAttribution();
  var query = collectQueryAttribution();
  var merged = {};

  ATTR_KEYS.forEach(function (key) {
    merged[key] = query[key] || stored[key] || "";
  });

  merged.landing_page = window.location.pathname + (window.location.search || "");
  merged.referrer_url = document.referrer || stored.referrer_url || "";
  merged.first_visit_at = stored.first_visit_at || new Date().toISOString();

  writeStoredAttribution(merged);
  syncTrackingInputs(merged);

  form.addEventListener("submit", function () {
    syncTrackingInputs(merged);

    var webhook = window.LEAD_SHEET_WEBHOOK;
    if (!webhook) return;

    var data = {
      submitted_at: new Date().toISOString(),
      name: readField("name"),
      email: readField("email"),
      brand: readField("brand"),
      website: readField("website"),
      service: readField("service"),
      target_market: readField("target_market"),
      budget: readField("budget"),
      monthly_revenue: readField("monthly_revenue"),
      contact: readField("contact"),
      message: readField("message")
    };

    ATTR_KEYS.concat(META_KEYS).forEach(function (key) {
      data[key] = readField(key);
    });

    try {
      var blob = new Blob([JSON.stringify(data)], { type: "application/json" });
      navigator.sendBeacon(webhook, blob);
    } catch (error) {
      // Keep form submission unaffected even if webhook forwarding fails.
    }
  });
})();
