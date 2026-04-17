document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  const filterButtons = document.querySelectorAll('[data-filter-button]');
  const filterItems = document.querySelectorAll('[data-filter-item]');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter-button');
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      filterItems.forEach((item) => {
        const category = item.getAttribute('data-filter-item');
        const matches = filter === 'all' || category === filter;
        item.classList.toggle('hidden', !matches);
      });
    });
  });
});
