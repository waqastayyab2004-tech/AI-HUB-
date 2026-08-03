// AI HUB — Agentic · shared behavior

document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("open") ? "true" : "false"
      );
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // Filter chips (used on projects.html / blog.html)
  const chips = document.querySelectorAll(".chip[data-filter]");
  const filterables = document.querySelectorAll("[data-tags]");
  if (chips.length && filterables.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        const filter = chip.dataset.filter;
        filterables.forEach((item) => {
          const tags = item.dataset.tags.split(",");
          const show = filter === "all" || tags.includes(filter);
          item.style.display = show ? "" : "none";
        });
      });
    });
  }
});
