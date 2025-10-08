import { initSearch } from './components/searchbar.js';
import { initAssetList } from './components/asset-list.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    if (header) {
        initSearch(header);
    }
    
    // We only need to call this one function now
    initAssetList();
});