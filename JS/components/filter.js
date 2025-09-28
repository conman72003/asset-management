export function initFilters() {
    const filterToggle = document.querySelector('.filter-toggle-button');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            document.body.classList.toggle('filters-active');
        });
    }
}