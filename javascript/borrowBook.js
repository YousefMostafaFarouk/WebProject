var LibraryBooks = JSON.parse(localStorage.getItem('libraryBooks'));
var FoundedBook;

function checkAvailability() {
    try {
        var BookID = document.getElementById("bk_id").value;
        var BookAuthor = document.getElementById("book_author").value;
        var Quantity = document.getElementById("quan").value;
        var BookTitle = document.getElementById("bk_tit").value;
        if (!LibraryBooks) {
            alert('Library data not found in local storage');
            return;
        }

        var test = 0;

        for (var bookData in LibraryBooks) {
            if (LibraryBooks[bookData].bookID == BookID && 
                LibraryBooks[bookData].author == BookAuthor && 
                LibraryBooks[bookData].numberofcopies >= Quantity && 
                LibraryBooks[bookData].title == BookTitle) {

                FoundedBook = LibraryBooks[bookData];
                alert("Book Found !!!");
                test = 1;
                break;

            }
        }

        if (test == 0) {
            alert("Invalid Input For Book Details !!!");
        }

        localStorage.setItem('libraryBooks', JSON.stringify(LibraryBooks));

    } 

    catch(error) {
        console.log(error);
    }

}

function validateForm() {
    try {
        LibraryBooks[FoundedBook].numberofcopies -= Quantity;

        var FirstName = document.getElementById("f_name").value;
        var MiddleName = document.getElementById("m_name").value;
        var LastName = document.getElementById("l_name").value;
        var Mail = document.getElementById("mail").value;
        var PhoneNumber = document.getElementById("ph_no").value;
        var DeliveryAddress = document.getElementById("add").value;
        var DeliveryDate = document.getElementById("delivered_date").value;

        var FormData = {
            bookID: BookID,
            bookAuthor: BookAuthor,
            quantity: Quantity,
            bookTitle: BookTitle,
            firstName: FirstName,
            middleName: MiddleName,
            lastName: LastName,
            mail: Mail,
            phoneNumber: PhoneNumber,
            deliveryAddress: DeliveryAddress,
            deliveryDate: DeliveryDate
        };

        localStorage.setItem("FormData", JSON.stringify(FormData));

        return true;
    }

    catch(error) {
        console.log(error);
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector('.btn').addEventListener('click', function(event) {
        event.preventDefault();
        checkAvailability();
    });
    
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault();
        validateForm();
    });
});