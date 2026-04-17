
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
      head.addEventListener('click', function (e) {
        if (e.target.closest('.arrow-btn')) return;
        entry.classList.toggle('open');
      });
    }
  });

  document.querySelectorAll('[data-filter-group]').forEach(function(group){
    const buttons = group.querySelectorAll('[data-filter]');
    const targetSelector = group.getAttribute('data-target');
    const items = document.querySelectorAll(targetSelector);
    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        items.forEach(function(item){
          const tags = item.getAttribute('data-category') || '';
          item.classList.toggle('hidden', !(filter === 'all' || tags.split(' ').includes(filter)));
        });
      });
    });
  });

  document.querySelectorAll('.carousel').forEach(function(carousel){
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    const count = carousel.querySelector('.carousel-count');
    let index = 0;
    function render(){
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      if (count) count.textContent = (index + 1) + ' / ' + slides.length;
      if (prev) prev.disabled = index === 0;
      if (next) next.disabled = index === slides.length - 1;
    }
    if (prev) prev.addEventListener('click', function(e){ e.stopPropagation(); if(index > 0){ index--; render(); }});
    if (next) next.addEventListener('click', function(e){ e.stopPropagation(); if(index < slides.length - 1){ index++; render(); }});
    render();
  });
});
