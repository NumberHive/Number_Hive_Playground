/* Number Hive Playground — analytics (GA4)
   ────────────────────────────────────────
   1. Put your GA4 Measurement ID below (looks like G-XXXXXXXXXX).
   2. That's it — every page that includes this file will report page views,
      and calls to nhTrack('event_name', {..}) will send custom events.
   If the ID is left blank, everything is a harmless no-op (nothing is sent). */

window.NH_GA_ID = "G-55T2ZYVKNQ";   // Number Hive GA4 Measurement ID

(function () {
  var id = window.NH_GA_ID;
  if (!id || id.indexOf("G-") !== 0) { window.nhTrack = function () {}; return; }
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + id;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
  // custom-event helper used across the games (game opened, completed, shared, etc.)
  window.nhTrack = function (name, params) { try { gtag("event", name, params || {}); } catch (e) {} };
})();

/* ── Share button: auto-added under the credit on every page ───────────────── */
(function () {
  function findAnchor() {
    return document.querySelector(".credit") ||
           document.querySelector(".cta") ||
           document.querySelector(".foot") ||
           [].slice.call(document.querySelectorAll("div")).reverse()
             .find(function (d) { return /by Number Hive/i.test(d.textContent) && d.querySelector("a"); });
  }
  function addShare() {
    if (document.getElementById("nh-share")) return;
    var anchor = findAnchor();
    if (!anchor) return;
    var onIndex = !!document.querySelector(".cta");
    var text = onIndex ? "🔗 Share the Playground" : "🔗 Share this game";
    var wrap = document.createElement("div");
    wrap.style.cssText = "text-align:center;margin:10px 0 4px";
    var btn = document.createElement("button");
    btn.id = "nh-share"; btn.textContent = text;
    btn.style.cssText = "font-family:ui-rounded,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:13px;font-weight:700;" +
      "color:#C77B12;background:#FFF6E5;border:1px solid #E7D6B0;border-radius:999px;padding:8px 18px;cursor:pointer";
    btn.onclick = function () {
      var url = location.href;
      function done() { btn.textContent = "✓ Link copied!";
        setTimeout(function () { btn.textContent = text; }, 1700);
        if (window.nhTrack) nhTrack("share_click", { page: document.title }); }
      function fallback() { var ta = document.createElement("textarea"); ta.value = url;
        ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta);
        ta.focus(); ta.select(); try { document.execCommand("copy"); } catch (e) {} ta.remove(); done(); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(fallback);
      } else { fallback(); }
    };
    wrap.appendChild(btn);
    anchor.insertAdjacentElement("afterend", wrap);
  }
  if (document.readyState !== "loading") addShare();
  else document.addEventListener("DOMContentLoaded", addShare);
})();
