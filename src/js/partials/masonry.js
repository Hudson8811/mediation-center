window.addEventListener('load', () => {
	const masonryNewsList = document.querySelector('.__js_news-masonry'),
				filterActiveClass = 'active';

	if (masonryNewsList) {
		const iso = new Isotope(masonryNewsList, {
			itemSelector: '.news-list__item',
			layoutMode: 'packery'
		});
	}

	filterInit($('.__js_mediators-filter-1'));
	filterInit($('.__js_mediators-filter-2'));
	filterInit($('.__js_mediators-filter-3'));

	function filterInit(parent) {
		parent.find('.person-list').isotope();

		parent.find('.filter-item').on('click', function () {
			var filterValue = $(this).attr('data-filter');

			$(this).addClass(filterActiveClass).siblings().removeClass(filterActiveClass);
			parent.find('.person-list').isotope({
				filter: filterValue,
				layoutMode: 'fitRows'
			}).isotope('reloadItems').isotope();

			if (window.matchMedia('(max-width: 1079px)').matches) {
				var destination = parent.find('.person-list').offset().top;

				$('html').animate({ scrollTop: destination }, 300);
			}
		});
	}
});