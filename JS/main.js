import { initSearch } from './components/searchbar.js';
import { initFilters } from './components/filter.js';

document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.header');

    if (header) {
        initSearch(header);
    }
    
    initFilters();

});