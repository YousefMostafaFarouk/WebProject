document.addEventListener("DOMContentLoaded",function(){
    var loggedin = JSON.parse(localStorage.getItem("loggedIn"));
    var navigationBarLeftButtons = document.getElementsByClassName("left_buttons")[0];
    if(loggedin === false){
        var profileButton = document.getElementById("profile_button");
        var borrowBookButton = document.getElementById("borrow_book_button");
        borrowBookButton.remove();
        profileButton.remove();

    }

    try {
        var accountType = JSON.parse(localStorage.getItem("userInfo")).account_type;
    }
    catch {
        
    };
    
    if(loggedin === true){
        var loginButton = document.getElementById("login_button");
        var signupButton = document.getElementById("signup_button");

        loginButton.remove();
        signupButton.remove();

        var ulElement = document.createElement('ul');
        ulElement.id = 'signout_button';
        ulElement.className = 'nav_bar_button';

        var aElement = document.createElement('a');
        aElement.href = 'Signup.html';
        aElement.textContent = 'Sign Out'; 

        ulElement.appendChild(aElement);
        navigationBarLeftButtons.appendChild(ulElement);
    }

    if(accountType == "User" || !loggedin){
        var addBooksButton = document.getElementById("add_book_button");
        addBooksButton.remove();
    }
})

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
        const url = `Search.html?search=${encodeURIComponent(extractedSearchAndFilter.searchText)}&filter=${encodeURIComponent(extractedSearchAndFilter.selectedFilter)}`;

        window.location.href = url;
    });

});

function extractSearchTextAndFilter() {
    var searchText = searchInput.value.trim();
    var selectedFilter = filterSelect.value;
    return { searchText: searchText, selectedFilter: selectedFilter };
}

// Action bar Code
