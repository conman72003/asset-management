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

        const searchInput = wrapper.querySelector('.filters__dropdown-search');
        if (searchInput) {
            const options = wrapper.querySelectorAll('.filters__dropdown-options .custom-checkbox');

            searchInput.addEventListener('keyup', () => {
                const searchTerm = searchInput.value.toLowerCase();

                options.forEach(option => {
                    const labelText = option.textContent.toLowerCase();
                    if (labelText.includes(searchTerm)) {
                        option.style.display = 'flex';
                    } else {
                        option.style.display = 'none';
                    }
                });
            });
        }
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filters__dropdown-wrapper')) {
            dropdownWrappers.forEach(w => w.classList.remove('is-open'));
        }
    });
}
