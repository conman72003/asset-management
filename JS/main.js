import { initSearch } from 'components/search.js';
import { initFilters } from 'components/filters.js';

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');

    if (header) {
        initSearch(header);
    }
    
    initFilters();

});