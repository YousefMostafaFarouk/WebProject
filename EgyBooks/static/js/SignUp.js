localStorage.setItem("loggedIn",JSON.stringify(false));

function validateForm(){

    try{
        var userName = document.getElementById("id_username").value;
        var password = document.getElementById("id_password1").value;
        var confirmPassword = document.getElementById("id_password2").value;
        var email = document.getElementById("id_email").value;
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


    if(password.length >= 30){
        alert("The password must be smaller than 30 characters!")
        return false;
    }


    if(userName.length >= 20){
        alert("The username must be smaller than 20 characters!")
        return false;
    }

    var usernameRegex = /^[a-zA-Z][\w\d]*$/;
    if(!usernameRegex.test(userName)){
        alert("User name can't contain numbers in the start and can't contain special characters!")
        return false;
    }

    return true;
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("hereDom");

    var form = document.querySelector(".signup-class form");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        
        if(validateForm()){
            form.submit();
        }
    })
});