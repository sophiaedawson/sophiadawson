
document.addEventListener('DOMContentLoaded', function () {
  const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.site-nav');
  if(toggle&&nav)toggle.addEventListener('click',()=>nav.classList.toggle('open'));
  const heroVideo=document.querySelector('.hero-video video');
  function tryPlayHero(){if(heroVideo){heroVideo.muted=true;heroVideo.setAttribute('muted','');heroVideo.setAttribute('playsinline','');heroVideo.setAttribute('webkit-playsinline','');const p=heroVideo.play();if(p&&p.catch)p.catch(()=>{});}}
  if(heroVideo){heroVideo.removeAttribute('poster');heroVideo.preload='auto';heroVideo.loop=true;heroVideo.muted=true;heroVideo.playsInline=true;heroVideo.setAttribute('webkit-playsinline','');['DOMContentLoaded','load','scroll','touchstart','touchend','visibilitychange','pageshow'].forEach(evt=>{window.addEventListener(evt,tryPlayHero,{passive:true});document.addEventListener(evt,tryPlayHero,{passive:true});});heroVideo.addEventListener('canplay',tryPlayHero);heroVideo.addEventListener('ended',()=>{heroVideo.currentTime=0;tryPlayHero();});tryPlayHero();}
  document.querySelectorAll('.carousel').forEach(function(carousel){const slides=carousel.querySelectorAll('.carousel-slide'),prev=carousel.querySelector('.prev'),next=carousel.querySelector('.next'),count=carousel.querySelector('.carousel-count');let index=0;function render(){slides.forEach((s,i)=>s.classList.toggle('active',i===index));if(count)count.textContent=(index+1)+' / '+slides.length;if(prev)prev.disabled=false;if(next)next.disabled=false;}if(prev)prev.addEventListener('click',e=>{e.stopPropagation();if(slides.length){index=(index-1+slides.length)%slides.length;render();}});if(next)next.addEventListener('click',e=>{e.stopPropagation();if(slides.length){index=(index+1)%slides.length;render();}});render();});
  function initFilterArea(area){const items=Array.from(area.querySelectorAll('[data-item]')),buttons=Array.from(area.querySelectorAll('[data-filter]')),loadMore=area.querySelector('[data-load-more]'),perPage=parseInt(area.getAttribute('data-per-page')||'12',10);let current='all',visible=perPage;function filtered(){return items.filter(item=>{const tags=(item.getAttribute('data-category')||'').split(' ');return current==='all'||tags.includes(current);});}function render(){const f=filtered();items.forEach(i=>i.classList.add('hidden'));f.forEach((i,idx)=>{if(idx<visible)i.classList.remove('hidden');});if(loadMore)loadMore.classList.toggle('hidden',f.length<=visible);}buttons.forEach(btn=>btn.addEventListener('click',()=>{buttons.forEach(b=>b.classList.remove('active'));btn.classList.add('active');current=btn.getAttribute('data-filter');visible=perPage;render();}));if(loadMore)loadMore.addEventListener('click',()=>{visible+=perPage;render();});render();}
  document.querySelectorAll('[data-filter-area]').forEach(initFilterArea);
  const filmMenu=document.querySelector('[data-film-filter]');if(filmMenu){const links=Array.from(filmMenu.querySelectorAll('[data-filter]')),cards=Array.from(document.querySelectorAll('.film-results>.credit-card'));function render(filter){links.forEach(l=>l.classList.toggle('active',l.getAttribute('data-filter')===filter));cards.forEach(c=>{const cat=c.getAttribute('data-category');c.classList.toggle('hidden',!(filter==='all'||filter===cat));});}links.forEach(l=>l.addEventListener('click',e=>{e.preventDefault();render(l.getAttribute('data-filter'));}));render('all');}
  const book=document.querySelector('[data-book-viewer]');if(book){const img=book.querySelector('img'),btn=book.querySelector('[data-book-toggle]');let front=true;if(img){img.src='assets/images/poetry-book-cover2.jpg';img.alt='Poetry book cover front';}if(btn&&img)btn.addEventListener('click',()=>{front=!front;img.src=front?'assets/images/poetry-book-cover2.jpg':'assets/images/poetry-book-cover.jpg';img.alt=front?'Poetry book cover front':'Poetry book cover back';btn.textContent=front?'View Back Cover':'View Front Cover';});}
  const storyList=document.querySelector('[data-story-list]');
  if(storyList){
    const cards=Array.from(storyList.querySelectorAll('[data-story-card]'));
    const nextBtn=document.querySelector('[data-story-next]');
    const prevBtn=document.querySelector('[data-story-prev]');
    const count=document.querySelector('[data-story-count]');
    const perPage=3;
    let storyPage=0;
    function loadStoryFrame(card){
      const frame=card.querySelector('iframe[data-src]');
      if(frame){frame.src=frame.getAttribute('data-src');frame.removeAttribute('data-src');}
    }
    function renderStories(){
      const pages=Math.max(1,Math.ceil(cards.length/perPage));
      if(storyPage<0)storyPage=pages-1;
      if(storyPage>=pages)storyPage=0;
      const start=storyPage*perPage,end=start+perPage;
      cards.forEach((card,idx)=>{
        const show=idx>=start&&idx<end;
        card.classList.toggle('hidden',!show);
        if(show)loadStoryFrame(card);
      });
      if(count)count.textContent=(storyPage+1)+' / '+pages;
      if(prevBtn)prevBtn.disabled=cards.length<=perPage;
      if(nextBtn)nextBtn.disabled=cards.length<=perPage;
    }
    if(nextBtn)nextBtn.addEventListener('click',()=>{storyPage++;renderStories();storyList.scrollIntoView({behavior:'smooth',block:'start'});});
    if(prevBtn)prevBtn.addEventListener('click',()=>{storyPage--;renderStories();storyList.scrollIntoView({behavior:'smooth',block:'start'});});
    renderStories();
  });
    renderStories();
  }

  const lb=document.createElement('div');lb.className='lightbox';lb.innerHTML='<button class="lightbox-close" type="button">Close</button><button class="lightbox-prev" type="button">←</button><img alt=""><button class="lightbox-next" type="button">→</button>';document.body.appendChild(lb);const lbImg=lb.querySelector('img'),close=lb.querySelector('.lightbox-close'),prev=lb.querySelector('.lightbox-prev'),next=lb.querySelector('.lightbox-next');let currentImages=[],currentIndex=0;function openLightbox(img){const area=img.closest('[data-lightbox-area]');currentImages=Array.from((area||document).querySelectorAll('img')).filter(i=>!i.closest('.hidden')&&i.offsetParent!==null);currentIndex=Math.max(0,currentImages.indexOf(img));renderLightbox();lb.classList.add('open');}function renderLightbox(){const img=currentImages[currentIndex];if(!img)return;lbImg.src=img.src;lbImg.alt=img.alt||'';}document.querySelectorAll('[data-lightbox-area] img').forEach(img=>img.addEventListener('click',()=>openLightbox(img)));close.addEventListener('click',()=>lb.classList.remove('open'));lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open');});prev.addEventListener('click',()=>{if(currentImages.length){currentIndex=(currentIndex-1+currentImages.length)%currentImages.length;renderLightbox();}});next.addEventListener('click',()=>{if(currentImages.length){currentIndex=(currentIndex+1)%currentImages.length;renderLightbox();}});
  document.addEventListener('keydown',function(e){
    if(!lb.classList.contains('open'))return;
    if(e.key==='ArrowLeft'){e.preventDefault();prev.click();}
    if(e.key==='ArrowRight'){e.preventDefault();next.click();}
    if(e.key===' '||e.code==='Space'||e.key==='Escape'){e.preventDefault();lb.classList.remove('open');}
  });

});
