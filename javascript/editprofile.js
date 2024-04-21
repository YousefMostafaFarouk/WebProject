var userInfoString = localStorage.getItem("userInfo");

function validateForm(){

    try{
      var newUserName = document.getElementById("username").value;
      var newPassword = document.getElementById("password").value;
      var newConfirmPassword = document.getElementById("confirm_password").value;
      var newEmail = document.getElementById("email").value;
    }
    catch(error){
        console.log(error)
        return false;
    }

    console.log("here");
    if(newConfirmPassword != newPassword){
        alert("Password Doesn't match!")
        return false;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
        alert("Invalid email format!");
        return false; 
    }

    if(newPassword.length < 8){
        alert("The password must be longer than 8 characters!")
        return false;
    }


    if(newPassword.length >= 30){
        alert("The password must be smaller than 30 characters!")
        return false;
    }


    if(newUserName.length >= 20){
        alert("The username must be smaller than 20 characters!")
        return false;
    }

    var usernameRegex = /^[a-zA-Z][\w\d]*$/;
    if(!usernameRegex.test(newUserName)){
        alert("User name can't contain numbers in the start and can't contain special characters!")
        return false;
    }

    var userInfo = {
        username: newUserName,
        password: newPassword,
        email: newEmail,
        account_type: accountType
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
            var username = userInfo.newUserName;
            var password = userInfo.newPassword;
            var email = userInfo.newEmail;
            var accountType = userInfo.account_type;
            console.log("Username:", username);
            console.log("Password:", password);
            console.log("Email:", email);
            console.log("Account Type:", accountType);
            window.location.href = "EditProfile.html";
            alert("Profile Data Updated !");
        }
    })
});