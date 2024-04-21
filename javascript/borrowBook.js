document.addEventListener("DOMContentLoaded", function(){
    const libraryBooks = JSON.parse(localStorage.getItem('libraryBooks')) || [];

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
        const bookID = document.getElementById("bk_id").value;
        const bookAuthor = document.getElementById("book_author").value;
        const quantity = parseInt(document.getElementById("quan").value);
        const bookTitle = document.getElementById("bk_tit").value;

        if (!libraryBooks.length) {
            alert('Library data not found in local storage');
            return;
        }

        let foundBook = null;

        for (const bookData of libraryBooks) {
            if (bookData.bookID === bookID && 
                bookData.author === bookAuthor && 
                bookData.numberofcopies >= quantity && 
                bookData.title === bookTitle) {
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
        const bookID = document.getElementById("bk_id").value;
        const bookAuthor = document.getElementById("book_author").value;
        const quantity = parseInt(document.getElementById("quan").value); 
        const bookTitle = document.getElementById("bk_tit").value;

        if (!bookID || !bookAuthor || !quantity || !bookTitle) {
            alert("Please fill in all book details.");
            return false;
        }


        for (const bookData of libraryBooks) {
            if (bookData.bookID === bookID && 
                bookData.author === bookAuthor && 
                bookData.numberofcopies >= quantity && 
                bookData.title === bookTitle) {
                bookData.numberofcopies -= quantity;
                break;
            }
        }

        const formData = {
            bookID,
            bookAuthor,
            quantity,
            bookTitle,
            firstName: document.getElementById("f_name").value,
            middleName: document.getElementById("m_name").value,
            lastName: document.getElementById("l_name").value,
            mail: document.getElementById("mail").value,
            phoneNumber: document.getElementById("ph_no").value,
            deliveryAddress: document.getElementById("add").value,
            deliveryDate: document.getElementById("delivered_date").value
        };

        localStorage.setItem("FormData", JSON.stringify(formData));


        if (!localStorage.getItem("BorrowedBooks")) {
            localStorage.setItem("BorrowedBooks", JSON.stringify([]));
        }

        var borrowedBooksString = localStorage.getItem("BorrowedBooks");
        var borrowedBooks = borrowedBooksString ? JSON.parse(borrowedBooksString) : [];
        borrowedBooks.push({ bookID: bookID, bookTitle: bookTitle });
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
