document.addEventListener("DOMContentLoaded", function() {
    var userInfoString = localStorage.getItem("userInfo");
    var userInfo = JSON.parse(userInfoString);

    var username = userInfo.username;
    var email = userInfo.email;
    var password = userInfo.password;
    var accountType = userInfo.account_type;

    var usernameElement = document.getElementById("profile-username");
    var emailElement = document.getElementById("profile-email");
    var passwordElement = document.getElementById("profile-password");
    var accountTypeElement = document.getElementById("profile-account-type");

    usernameElement.textContent = username;
    emailElement.textContent = email;
    passwordElement.textContent = password;
    accountTypeElement.textContent = accountType;

    if (!localStorage.getItem("BorrowedBooks")) {
        localStorage.setItem("BorrowedBooks", JSON.stringify([]));
    }

    var borrowedBooksString = localStorage.getItem("BorrowedBooks");
    var borrowedBooks = JSON.parse(borrowedBooksString);
    var borrowedBooksList = document.getElementById("borrowed-books-list");

    borrowedBooks.forEach(function(book) {
        var listItem = document.createElement("li");
        listItem.textContent = `Book Title: ${book.bookTitle} - Book ID: ${book.bookID} - Quantity: ${book.quantity}`;
        borrowedBooksList.appendChild(listItem);
    });
});
