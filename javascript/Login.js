localStorage.setItem("loggedIn",JSON.stringify(false));

function validateForm(){
    var userInfoString = localStorage.getItem("userInfo");
    var userInfo = JSON.parse(userInfoString);
    var userName = document.getElementById("login_username").value;
    var password = document.getElementById("login_password").value;

    console.log(userInfo.userName);
    console.log(userInfo.password);
    console.log(userName);
    console.log(password);
    
    if(userInfo.username == userName && userInfo.password == password){
        alert("Logged in!");

        localStorage.setItem("loggedIn", JSON.stringify(true));
        return true;

    }
    
    alert("User doesn't exist");
    return false;
}


document.addEventListener("DOMContentLoaded",function(){
    var form = document.querySelector("form");
    
    form.addEventListener("submit", function(event){
        event.preventDefault();

        if(validateForm()){
            window.location.href = "index.html";
        }
    })
})