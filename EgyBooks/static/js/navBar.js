var searchInput;
var filterSelect;
//Search bar code
document.addEventListener("DOMContentLoaded", function(){
    const searchForm = document.querySelector('.search_bar form');

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        searchInput = document.querySelector('.search_input_container input[type="text"]');
        filterSelect = document.querySelector('.search_input_container select[name="filter"]');
    
        var extractedSearchAndFilter = extractSearchTextAndFilter();
        const url = `${window.location.origin}/books/view-all/?search=${encodeURIComponent(extractedSearchAndFilter.searchText)}&filter=${encodeURIComponent(extractedSearchAndFilter.selectedFilter)}`;

        window.location.href = url;
    });

});

function extractSearchTextAndFilter() {
    var searchText = searchInput.value.trim();
    var selectedFilter = filterSelect.value;
    return { searchText: searchText, selectedFilter: selectedFilter };
}
