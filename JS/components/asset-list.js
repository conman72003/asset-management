export function initAssetList() {
    const assetList = document.querySelector('.asset-list');
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const itemCheckboxes = document.querySelectorAll('.asset-list__row .custom-checkbox input[type="checkbox"]');

    
    const allCheckboxes = [selectAllCheckbox, ...itemCheckboxes];

    function updateSelectionState() {
        const selectedCount = [...itemCheckboxes].filter(cb => cb.checked).length;

        if (selectedCount > 0) {
            assetList.classList.add('selection-active');
            selectionCountSpan.textContent = `${selectedCount} Selected`;
        } else {
            assetList.classList.remove('selection-active');
        }
    }

    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            itemCheckboxes.forEach(checkbox => {
                checkbox.checked = selectAllCheckbox.checked;
            });
            updateSelectionState(); 
        });
    }

    itemCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSelectionState);
    });
}