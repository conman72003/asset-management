// This function will be responsible for rendering the list of devices
let renderFunction = () => {};

// This will hold the original, complete list of all devices
let allDevices = [];

// This object will keep track of the currently selected filters
const activeFilters = {
    status: [],
    type: [],
    user: []
};

// This function applies all active filters to the device list and re-renders it
function applyFilters() {
    const filteredDevices = allDevices.filter(device => {
        const statusMatch = activeFilters.status.length === 0 || activeFilters.status.includes(device.status);
        const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(device.type);
        const userMatch = activeFilters.user.length === 0 || activeFilters.user.includes(device.assigned_to);
        return statusMatch && typeMatch && userMatch;
    });
    renderFunction(filteredDevices);
}

/**
 * A generic function to populate a filter dropdown with checkboxes.
 * @param {string} filterName - The key from the device object (e.g., 'status', 'type', 'assigned_to').
 * @param {string} dropdownId - The ID of the dropdown container in the HTML.
 */
function populateFilter(filterName, dropdownId) {
    const container = document.querySelector(`#${dropdownId} .filters__dropdown-options, #${dropdownId}`);
    if (!container) return;

    // Get a unique, sorted list of values for the given filter
    const values = [...new Set(allDevices.map(device => device[filterName]))].sort();

    // Create the HTML for each checkbox
    container.innerHTML = values.map(value => {
        // The 'name' of the input should match the filter category (e.g., 'user' for assigned_to)
        const inputName = filterName === 'assigned_to' ? 'user' : filterName;
        return `
            <label class="custom-checkbox">
                <input type="checkbox" name="${inputName}" value="${value}">
                <span class="custom-checkbox__box">
                    <svg class="custom-checkbox__icon"><use href="#icon-checkmark"></use></svg>
                </span>
                <span>${value}</span>
            </label>
        `;
    }).join('');
}

export function initFilters(devices, renderCallback) {
    allDevices = devices;
    renderFunction = renderCallback;

    // 1. Dynamically populate all filters
    populateFilter('status', 'status-dropdown');
    populateFilter('type', 'type-dropdown');
    populateFilter('assigned_to', 'assigned-dropdown');
    
    // 2. Set up event listeners for all filter checkboxes
    const filterCheckboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const { name, value, checked } = e.target;
            
            if (checked) {
                if (!activeFilters[name].includes(value)) activeFilters[name].push(value);
            } else {
                activeFilters[name] = activeFilters[name].filter(item => item !== value);
            }
            
            applyFilters();
        });
    });

    const filterToggle = document.querySelector('.filter-toggle-button');
    if (filterToggle) {
        filterToggle.addEventListener('click', () => {
            document.body.classList.toggle('filters-active');
        });
    }

    const dropdownWrappers = document.querySelectorAll('.filters__dropdown-wrapper');
    dropdownWrappers.forEach(wrapper => {
        const button = wrapper.querySelector('.filters__button');

        const searchInput = wrapper.querySelector('.filters__dropdown-search');
        if (searchInput) {
            // We no longer need to get the options here.

            searchInput.addEventListener('keyup', () => {
                // Get the options *inside* the event listener
                const options = wrapper.querySelectorAll('.filters__dropdown-options .custom-checkbox');
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


    