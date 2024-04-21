const libraryBooks = JSON.parse(localStorage.getItem('libraryBooks')) || [];

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('.btn').addEventListener('click', function(event) {
        event.preventDefault();
        checkAvailability(libraryBooks);
    });
    
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateForm(libraryBooks)) {
            const formData = getFormData();
            const queryString = new URLSearchParams(formData).toString();
            const destinationPage = 'profile.html'; 
            window.location.href = `${destinationPage}?${queryString}`;
        }
    });
});

function checkAvailability(libraryBooks) {
    try {
        var bookID = document.getElementById("bk_id").value;
        var bookAuthor = document.getElementById("book_author").value;
        var quantity = parseInt(document.getElementById("quan").value);
        var bookTitle = document.getElementById("bk_tit").value;

        if (!libraryBooks.length) {
            alert('Library data not found in local storage !');
            return;
        }

        if(bookID.length < 5){
            alert("Book ID Smaller Too Much (Minimum 5 Characters) !")
            return false;
        }

        if(bookID.length > 10){
            alert("Book ID Bigger Too Much (Maximum 10 Characters) !")
            return false;
        }

        var authorRegex = /^[a-zA-Z][\w\d]*$/;
        if(!authorRegex.test(bookAuthor)){
            alert("Book Author can't contain numbers in the start and can't contain special characters!")
            return false;
        }

        if (libraryBooks[bookData].numberofcopies < quantity) {
            alert("Needed Quantity Greater Than Availble Copies !");
            return false;
        }

        var bookTitleRegex = /^[a-zA-Z][\w\d]*$/;
        if(!bookTitleRegex.test(bookTitle)){
            alert("Book Title can't contain numbers in the start and can't contain special characters!")
            return false;
        }

        var foundBook = null;

        for (var bookData in libraryBooks) {
            if (libraryBooks[bookData].bookID == bookID && 
                libraryBooks[bookData].author == bookAuthor && 
                libraryBooks[bookData].numberofcopies >= quantity && 
                libraryBooks[bookData].title == bookTitle) {
                    foundBook = bookData;
                    alert("Book Found !!!");
                    break;
            }
        }

        if (!foundBook) {
            alert("Invalid Input For Book Details !!!");
        }

    } catch(error) {
        console.error(error);
    }
}

function validateForm(libraryBooks) {
    try {
        var bookID = document.getElementById("bk_id").value;
        var bookAuthor = document.getElementById("book_author").value;
        var quantity = parseInt(document.getElementById("quan").value); 
        var bookTitle = document.getElementById("bk_tit").value;

        var firstName = document.getElementById("f_name").value;
        var middleName = document.getElementById("m_name").value;
        var lastame = document.getElementById("l_name").value;
        var mail = document.getElementById("mail").value;
        var phoneNumber = document.getElementById("ph_no").value;
        var deliveryAddress = document.getElementById("add").value;
        var deliveryDate = document.getElementById("delivered_date").value;


        if (!bookID || !bookAuthor || !quantity || !bookTitle) {
            alert("Please fill in all book details.");
            return false;
        }

        for (var bookData in libraryBooks) {
            if (libraryBooks[bookData].bookID == bookID && 
                libraryBooks[bookData].author == bookAuthor && 
                libraryBooks[bookData].numberofcopies >= quantity && 
                libraryBooks[bookData].title == bookTitle) {
                    libraryBooks[bookData].numberofcopies -= quantity;
                    break;
            }
        }

        localStorage.setItem("libraryBooks",JSON.stringify(libraryBooks));

        // ------------------------------------------------------------

        if(firstName.length < 3){
            alert("First Name Smaller Too Much (Minimum 3 Characters)")
            return false;
        }

        if(firstName.length > 10){
            alert("Frist Name Bigger Too Much (Maximum 10 Characters)")
            return false;
        }

        if(middleName.length < 3){
            alert("Middle Name Smaller Too Much (Minimum 3 Characters)")
            return false;
        }

        if(middleName.length > 10){
            alert("Middle Name Bigger Too Much (Maximum 10 Characters)")
            return false;
        }

        if(lastame.length < 3){
            alert("Last Name Smaller Too Much (Minimum 3 Characters)")
            return false;
        }

        if(lastame.length > 10){
            alert("Last Name Bigger Too Much (Maximum 10 Characters)")
            return false;
        }

        if(phoneNumber.length < 10){
            alert("Phone Number Smaller Too Much (Minimum 10 Characters)")
            return false;
        }

        if(deliveryAddress.length < 8){
            alert("Delivery Address Smaller Too Much (Minimum 8 Characters)")
            return false;
        }

        if(deliveryAddress.length > 30){
            alert("Delivery Address Bigger Too Much (Maximum 30 Characters)")
            return false;
        }

        const formData = {
            bookID,
            bookAuthor,
            quantity,
            bookTitle,
            firstName: firstName,
            middleName: middleName,
            lastName: lastame,
            mail: mail,
            phoneNumber: phoneNumber,
            deliveryAddress: deliveryAddress,
            deliveryDate: deliveryDate
        };

        localStorage.setItem("FormData", JSON.stringify(formData));

        if (!localStorage.getItem("BorrowedBooks")) {
            localStorage.setItem("BorrowedBooks", JSON.stringify([]));
        }

        var borrowedBooksString = localStorage.getItem("BorrowedBooks");
        var borrowedBooks = borrowedBooksString ? JSON.parse(borrowedBooksString) : [];
        borrowedBooks.push({ bookID: bookID, bookTitle: bookTitle, quantity: formData.quantity });
        localStorage.setItem("BorrowedBooks", JSON.stringify(borrowedBooks));

        return true;

    } catch(error) {
        console.error(error);
        return false;
    }
}

function getFormData() {
    return {
        bookID: document.getElementById("bk_id").value,
        bookAuthor: document.getElementById("book_author").value,
        quantity: parseInt(document.getElementById("quan").value), 
        bookTitle: document.getElementById("bk_tit").value,
        firstName: document.getElementById("f_name").value,
        middleName: document.getElementById("m_name").value,
        lastName: document.getElementById("l_name").value,
        mail: document.getElementById("mail").value,
        phoneNumber: document.getElementById("ph_no").value,
        deliveryAddress: document.getElementById("add").value,
        deliveryDate: document.getElementById("delivered_date").value
    };
}
