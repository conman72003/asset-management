document.addEventListener('DOMContentLoaded', () => {
    // --- Code for the search toggle ---
    const header = document.querySelector('.header');
    const searchToggle = document.querySelector('.header__search-toggle');

    if (searchToggle) {
        searchToggle.addEventListener('click', () => {
            header.classList.toggle('search-active');
        });
    }

    // --- Code for the filter toggle ---
    const filterToggle = document.querySelector('.filter-toggle-button');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            document.body.classList.toggle('filters-active');
        });
    }
});