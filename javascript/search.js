var searchValue;
var filterValue;

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);

    searchValue = params.get('search');

    filterValue = params.get('filter');

    var books = getBooksData();
    var container = document.getElementById("all_books");

    
    books.forEach(function (book) {
        if('title' == filterValue && book.title.toLowerCase().includes(searchValue.toLowerCase())){
            container.innerHTML+= generateBookHTML(book);
        }
        else if('author' == filterValue && book.author.toLowerCase().includes(searchValue.toLowerCase())){
            container.innerHTML+= generateBookHTML(book);
        }
        else if('category' == filterValue && book.category.toLowerCase().includes(searchValue.toLowerCase())){
            container.innerHTML+= generateBookHTML(book);
        }
    });

});

function getBooksData(){
    var booksData = localStorage.getItem('libraryBooks');
    if (booksData) {
        return JSON.parse(booksData);
    } else {
        console.log('Error');
        return [];
    }
}

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