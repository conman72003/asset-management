export function initSearch(header) {
    const searchToggle = header.querySelector('.header__search-toggle');
    const searchInput = header.querySelector('#global-search');
    const searchButton = header.querySelector('.header__search-wrapper .icon-button');

    function closeSearch() {
        header.classList.remove('search-active');
    }

    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            header.classList.toggle('search-active');
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', closeSearch);
    }

    if (searchInput) {
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                closeSearch();
            }
        });
    }
}