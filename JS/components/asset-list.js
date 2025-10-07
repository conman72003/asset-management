import { initFilters } from './filter.js';

let allDevices = []; // Store the master list of devices
let rowsContainer;   // The element that holds the device rows

// --- All the checkbox/selection logic now goes inside the render function ---
function setupSelectionListeners(container) {
    const assetListContainer = document.querySelector('.asset-list');
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemCheckboxes = container.querySelectorAll('.custom-checkbox input[type="checkbox"]');

    function updateSelectionState() {
        const selectedCount = [...itemCheckboxes].filter(cb => cb.checked).length;
        assetListContainer.classList.toggle('selection-active', selectedCount > 0);
        selectAllCheckbox.checked = selectedCount === itemCheckboxes.length && selectedCount > 0;
        selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < itemCheckboxes.length;
    }

    selectAllCheckbox.addEventListener('change', () => {
        itemCheckboxes.forEach(checkbox => { checkbox.checked = selectAllCheckbox.checked; });
        updateSelectionState();
    });

    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectionState);
    });

    updateSelectionState();
}


// This function is now responsible for rendering the list
function renderAssetList(devices) {
    const assetRowsHTML = devices.map(createAssetRow).join('');
    rowsContainer.innerHTML = assetRowsHTML;
    
    // Every time we render, we need to re-attach the event listeners for selection
    setupSelectionListeners(rowsContainer);
}

// Function to build the HTML for a single row
function createAssetRow(device) {
    const iconMap = {
        laptop: '#icon-laptop',
        phone: '#icon-phone',
        monitor: '#icon-monitor',
        tablet: '#icon-tablet'
    };
    const icon = iconMap[device.type] || '#icon-monitor';
    const statusClass = device.status.replace('_', '-');
    const statusText = device.status.replace('-', ' ');

    return `
        <div class="asset-list__row">
            <div class="asset-list__cell">
                <label class="custom-checkbox">
                    <input type="checkbox" name="${device.id}">
                    <span class="custom-checkbox__box">
                        <svg class="custom-checkbox__icon"><use href="#icon-checkmark"></use></svg>
                    </span>
                </label>
                <svg class="asset-list__icon"><use href="${icon}"></use></svg>
                <span>${device.name}</span>
            </div>
            <div class="asset-list__cell">
                <span class="status-badge status-badge--${statusClass}">${statusText}</span>
            </div>
            <div class="asset-list__cell"><span>${device.asset_id}</span></div>
            <div class="asset-list__cell"><span>${device.assigned_to}</span></div>
        </div>
    `;
}

// Main initialization function
export async function initAssetList() {
    const assetListContainer = document.querySelector('.asset-list');
    
    // Create the container for the rows once
    rowsContainer = document.createElement('div');
    assetListContainer.appendChild(rowsContainer);

    // Fetch the full list of devices
    const response = await fetch('./data/devices.json');
    allDevices = await response.json();

    // Initial render of the full list
    renderAssetList(allDevices);
    
    // Initialize the filters, passing them the data and the render function
    initFilters(allDevices, renderAssetList);
}