var userInfoString = localStorage.getItem("userInfo");

function validateForm(){

    try{
        var newUserName = document.getElementById("id_username").value;
        var newPassword = document.getElementById("id_password1").value;
        var newConfirmPassword = document.getElementById("id_password2").value;
        var newEmail = document.getElementById("id_email").value;
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

    return true;
}

document.addEventListener("DOMContentLoaded", function(){
    console.log("hereDom");

    var form = document.querySelector("form.edit_form_class");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        
        if(validateForm()){
            form.submit()
            alert("Profile Data Updated!");
        }
    })
});
