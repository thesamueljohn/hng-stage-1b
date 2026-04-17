"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // ── Epoch time clock ──────────────────────────────────────────
  const timeEl      = document.querySelector('[data-testid="test-user-time"]');
  const announceBtn = document.getElementById("announce-time-btn");
  const announcer   = document.getElementById("time-announcer");

  function updateTime() {
    if (!timeEl) return;
    const now = Date.now();
    timeEl.textContent = now;
    timeEl.setAttribute("datetime", new Date(now).toISOString());
  }

  // Paint immediately, then refresh every 500 ms
  updateTime();
  setInterval(updateTime, 500);

  // Announce to screen readers on button click (avoids ARIA live spam)
  if (announceBtn && announcer) {
    announceBtn.addEventListener("click", () => {
      announcer.textContent = `Current epoch time is ${Date.now()} milliseconds`;
    });
  }

});
