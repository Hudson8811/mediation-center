window.addEventListener('load', () => {
  const masonryNewsList = document.querySelector('.__js_news-masonry');

  if (masonryNewsList) {
    const iso = new Isotope(masonryNewsList, {
      itemSelector: '.news-list__item',
      layoutMode: 'packery'
    });
  }
});