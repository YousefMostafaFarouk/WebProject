var loggedin = JSON.parse(localStorage.getItem("loggedIn"));
var accountType = JSON.parse(localStorage.getItem("userInfo")).account_type;

document.addEventListener("DOMContentLoaded",function(){
    var navigationBarLeftButtons = document.getElementsByClassName("left_buttons")[0];
    if(loggedin === false){
        var profileButton = document.getElementById("profile_button");
        var borrowBookButton = document.getElementById("borrow_book_button");
        borrowBookButton.remove();
        profileButton.remove();

    }
    
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
