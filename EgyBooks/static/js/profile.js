document.addEventListener("DOMContentLoaded",async function() {
    var borrowedBooks = await fetchBorrowedBooks();
    console.log(borrowedBooks)
    var borrowedBooksList = document.getElementById("borrowed-books-list");

    borrowedBooks.forEach(function(book) {
        var listItem = document.createElement("li");
        listItem.textContent = `Book Title: ${book.title} - Book ID: ${book.id} - Quantity: ${book.number_of_borrowed_books}`;
        borrowedBooksList.appendChild(listItem);
    });
});

async function getBorrowedBooksData() {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Error fetching books data');
                }
            }
        };
        xhr.open("GET", "/api/get-borrowed-books", true);
        xhr.send();
    });
}


async function fetchBorrowedBooks() {
    try {
        const data = await getBorrowedBooksData();
        return data;
    } catch (error) {
        console.error(error); 
        return []
    }
}