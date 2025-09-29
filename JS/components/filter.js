export function initFilters() {
    const filterToggle = document.querySelector('.filter-toggle-button');
    
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            document.body.classList.toggle('filters-active');
        });
    }

    const dropdownWrappers = document.querySelectorAll('.filters__dropdown-wrapper');
    
    dropdownWrappers.forEach(wrapper => {
        const button = wrapper.querySelector('.filters__button');
        
        button.addEventListener('click', () => {
            const isOpen = wrapper.classList.contains('is-open');

            dropdownWrappers.forEach(w => w.classList.remove('is-open'));

            if (!isOpen) {
                wrapper.classList.add('is-open');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filters__dropdown-wrapper')) {
            dropdownWrappers.forEach(w => w.classList.remove('is-open'));
        }
    });
}

