
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  document.querySelectorAll('.production-entry').forEach(function (entry) {
    const head = entry.querySelector('.production-head');
    if (head) {
      head.addEventListener('click', function () {
        entry.classList.toggle('open');
      });
    }
  });
});
