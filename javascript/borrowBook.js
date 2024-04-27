const libraryBooks = JSON.parse(localStorage.getItem('libraryBooks')) || [];

document.addEventListener("DOMContentLoaded", function(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const title = params.get('title');
    const author = params.get('author');

    document.getElementById("bk_id").value = id;
    document.getElementById("book_author").value = decodeURIComponent(author);
    document.getElementById("quan").value = 1;
    document.getElementById("bk_tit").value = decodeURIComponent(title);

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
        var flag = false;

        for (var bookData in libraryBooks) {
            if (libraryBooks[bookData].bookID == bookID && 
                libraryBooks[bookData].author == bookAuthor && 
                libraryBooks[bookData].numberofcopies >= quantity && 
                libraryBooks[bookData].title == bookTitle) {
                    alert("Needed quantity of book exists.");
                    flag = true;
                    break;
            }
        }

        if (!flag) {
            alert("Needed quantity of book doesn't available, try lesser quantity");
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
        var lastName = document.getElementById("l_name").value;
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

        var nameExpression = /^[a-zA-Z]{3,10}$/;
        if(!nameExpression.test(firstName) || !nameExpression.test(middleName) || !nameExpression.test(lastName)){
            alert("Name must be between 3 to 10 characters long and can only contain letters.");
            return false;
        }

        var phoneNubmerExpression = /^\d{11}$/; // Corrected regular expression
        if(phoneNumber.length !== 11 || !phoneNubmerExpression.test(phoneNumber)){
            alert("Phone number must be exactly 11 digits long.");
            return false;
        }

        if(deliveryAddress.length < 4){
            alert("Delivery address must be at least 4 characters long.");
            return false;
        }

        const formData = {
            bookID,
            bookAuthor,
            quantity,
            bookTitle,
            firstName,
            middleName,
            lastName,
            mail,
            phoneNumber,
            deliveryAddress,
            deliveryDate
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
