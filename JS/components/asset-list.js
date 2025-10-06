// A mapping from device type to the SVG icon ID
const iconMap = {
    laptop: '#icon-laptop',
    phone: '#icon-phone',
    monitor: '#icon-monitor',
    tablet: '#icon-tablet'
};

function createAssetRow(device) {
    // Note: In a real application, you would use a templating library for this,
    // but for now, template literals are perfectly fine.
    return `
        <div class="asset-list__row">
            <div class="asset-list__cell">
                <label class="custom-checkbox">
                    <input type="checkbox" name="${device.id}">
                    <span class="custom-checkbox__box">
                        <svg class="custom-checkbox__icon"><use href="#icon-checkmark"></use></svg>
                    </span>
                </label>
                <svg class="asset-list__icon"><use href="${iconMap[device.type] || '#icon-monitor'}"></use></svg>
                <span>${device.name}</span>
            </div>
            <div class="asset-list__cell">
                <span class="status-badge status-badge--${device.status.replace('_', '-')}">${device.status.replace('-', ' ')}</span>
            </div>
            <div class="asset-list__cell"><span>${device.asset_id}</span></div>
            <div class="asset-list__cell"><span>${device.assigned_to}</span></div>
        </div>
    `;
}


export async function initAssetList() {
    const assetListContainer = document.querySelector('.asset-list');
    
    const response = await fetch('./data/devices.json');
    const devices = await response.json();

    const assetRowsHTML = devices.map(createAssetRow).join('');
    
    const rowsContainer = document.createElement('div');
    assetListContainer.appendChild(rowsContainer);
    rowsContainer.innerHTML = assetRowsHTML;
    


    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemCheckboxes = rowsContainer.querySelectorAll('.custom-checkbox input[type="checkbox"]');

    function updateSelectionState() {
        const selectedCount = [...itemCheckboxes].filter(cb => cb.checked).length;

        if (selectedCount > 0) {
            assetListContainer.classList.add('selection-active');
        } else {
            assetListContainer.classList.remove('selection-active');
        }

        selectAllCheckbox.checked = selectedCount === itemCheckboxes.length && selectedCount > 0;
        selectAllCheckbox.indeterminate = selectedCount > 0 && selectedCount < itemCheckboxes.length;
    }

    selectAllCheckbox.addEventListener('change', () => {
        itemCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateSelectionState(); 
    });

    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectionState);
    });

    updateSelectionState();
}