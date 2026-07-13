// Tabs for the deliverables page. Without JavaScript all panels render
// stacked, so the page still works; this only adds the switching.
(function () {
  "use strict";

  var shell = document.getElementById("deliverable-tabs");
  if (!shell) return;
  shell.classList.add("js-tabs");

  var tabs = Array.prototype.slice.call(shell.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(shell.querySelectorAll('[role="tabpanel"]'));

  function activate(index, focus) {
    tabs.forEach(function (tab, i) {
      var selected = i === index;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(function (panel, i) {
      panel.classList.toggle("active", i === index);
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { activate(i, false); });
    tab.addEventListener("keydown", function (event) {
      var target = null;
      if (event.key === "ArrowRight") target = (i + 1) % tabs.length;
      if (event.key === "ArrowLeft") target = (i - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") target = 0;
      if (event.key === "End") target = tabs.length - 1;
      if (target !== null) {
        event.preventDefault();
        activate(target, true);
      }
    });
  });

  activate(0, false);
})();
