// Stepper for the sample task walkthrough. Without JavaScript all steps
// render stacked, so the page still works; this only adds the click-through.
(function () {
  "use strict";

  var shell = document.getElementById("task-shell");
  if (!shell) return;
  shell.classList.add("js-steps");

  var steps = Array.prototype.slice.call(shell.querySelectorAll(".task-step"));
  var stepBtns = Array.prototype.slice.call(shell.querySelectorAll(".step-btn"));
  var prev = document.getElementById("step-prev");
  var next = document.getElementById("step-next");
  var counter = document.getElementById("step-counter");
  var current = 0;

  function render() {
    steps.forEach(function (step, i) {
      step.classList.toggle("active", i === current);
    });
    stepBtns.forEach(function (btn, i) {
      if (i === current) {
        btn.setAttribute("aria-current", "step");
      } else {
        btn.removeAttribute("aria-current");
      }
    });
    prev.disabled = current === 0;
    next.disabled = current === steps.length - 1;
    counter.textContent = "step " + (current + 1) + " of " + steps.length;
  }

  function go(index) {
    current = Math.max(0, Math.min(steps.length - 1, index));
    render();
    var heading = steps[current].querySelector("h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus({ preventScroll: true });
    }
    var shellTop = shell.getBoundingClientRect().top + window.scrollY - 84;
    if (window.scrollY > shellTop) window.scrollTo(0, shellTop);
  }

  stepBtns.forEach(function (btn, i) {
    btn.addEventListener("click", function () { go(i); });
  });
  prev.addEventListener("click", function () { go(current - 1); });
  next.addEventListener("click", function () { go(current + 1); });

  var reveal = document.getElementById("reveal-flaws");
  var notes = document.getElementById("flaw-notes");
  if (reveal && notes) {
    reveal.addEventListener("click", function () {
      var on = shell.classList.toggle("flaws-revealed");
      reveal.setAttribute("aria-pressed", String(on));
      notes.hidden = !on;
      reveal.textContent = on ? "Hide the failures" : "Reveal the failures";
    });
  }

  render();
})();
