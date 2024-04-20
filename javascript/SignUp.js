localStorage.setItem("loggedIn",JSON.stringify(false));

function validateForm(){

    try{
        var userName = document.getElementById("user_name_text").value;
        var password = document.getElementById("password_text").value;
        var confirmPassword = document.getElementById("confirm_password_text").value;
        var email = document.getElementById("email_text").value;

        var accountTypeDiv = document.getElementById("radio_button").querySelectorAll('input[type="radio"]');
        var account_type = "";

        console.log(accountTypeDiv);

        accountTypeDiv.forEach(function(radioButton) {
            console.log(radioButton);
            if (radioButton.checked) {
                account_type = radioButton.value;
            }
        });

    }
    catch(error){
        console.log(error)
        return false;
    }

    console.log("here");
    if(confirmPassword != password){
        alert("Password Doesn't match!")
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format!");
        return false; 
    }

    if(password.length < 8){
        alert("The password must be longer than 8 characters!")
        return false;
    }

    var usernameRegex = /^[a-zA-Z\d][\w\d]*$/;
    if(!usernameRegex.test(userName)){
        alert("User name can't contain numbers in the start and can't contain special characters!")
        return false;
    }

    if(localStorage.getItem("userInfo") != null && email == JSON.parse(localStorage.getItem("userInfo")).email){
        alert("Email already exists!");
        return false;
    }

    if(localStorage.getItem("userInfo") != null && userName == JSON.parse(localStorage.getItem("userInfo")).username){
        alert("User name already exists!");
        return false;
    }

    var userInfo = {
        username: userName,
        password: password,
        email: email,
        account_type: account_type
    };

    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    return true;
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("hereDom");

    var form = document.querySelector("form");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        
        if(validateForm()){
            var userInfoString = localStorage.getItem("userInfo");
            var userInfo = JSON.parse(userInfoString);
            var username = userInfo.username;
            var password = userInfo.password;
            var email = userInfo.email;
            var accountType = userInfo.account_type;
            console.log("Username:", username);
            console.log("Password:", password);
            console.log("Email:", email);
            console.log("Account Type:", accountType);

            window.location.href = "Login.html";
        }
    })
});