
document.addEventListener("DOMContentLoaded", function(){
    var books = getBooksData();

    var container = document.getElementById("all_books");
    console.log(container);

    books.forEach(function (book) {
        console.log(book);
        container.innerHTML+= generateBookHTML(book);
    });
})

function generateBookHTML(book) {
    return `
        <div class="book_block">
            <a href="BookPage.html?id=${book.bookID}" class="book_link">
                <img src="${book.image}" alt="Book Cover" class="book_image">
                <div class="book_details">
                    <h2 class="book_title">${book.title}</h2>
                    <p class="book_author">${book.author}</p>
                    <p class="book_price">${book.price}$</p>
                </div>
            </a>
        </div>
    `;
}

function getBooksData(){
    var booksData = localStorage.getItem('libraryBooks');
    if (booksData) {
        return JSON.parse(booksData);
    } else {
        console.log('Error');
        return [];
    }
}

