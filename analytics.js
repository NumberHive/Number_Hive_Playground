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
