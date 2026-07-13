// Mobile navigation toggle. This is the only JavaScript on the site.
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("open"));
  });

  // Close the panel after choosing an anchor link.
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset the panel state when the viewport grows past the mobile breakpoint,
  // so a stale open state cannot linger after a resize.
  var desktop = window.matchMedia("(min-width: 640px)");
  function onBreakpointChange(mq) {
    if (mq.matches) setOpen(false);
  }
  if (typeof desktop.addEventListener === "function") {
    desktop.addEventListener("change", onBreakpointChange);
  } else if (typeof desktop.addListener === "function") {
    desktop.addListener(onBreakpointChange);
  }
})();
