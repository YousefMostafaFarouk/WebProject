var searchValue;
var filterValue;

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);

    searchValue = params.get('search');

    filterValue = params.get('filter');

    var books = getBooksData();
    var container = document.getElementById("all_books");

    var isrender=false;
    
    books.forEach(function (book) {
        if(book.numberofcopies>0) {
            if('title' == filterValue && book.title.toLowerCase().includes(searchValue.toLowerCase())){
                container.innerHTML+= generateBookHTML(book);
                isrender=true;
            }
            else if('author' == filterValue && book.author.toLowerCase().includes(searchValue.toLowerCase())){
                container.innerHTML+= generateBookHTML(book);
                isrender=true;

            }
            else if('category' == filterValue && book.category.toLowerCase().includes(searchValue.toLowerCase())){
                container.innerHTML+= generateBookHTML(book);
                isrender=true;

            }
        }
    });

    if(!isrender){
        container.innerHTML+=
        `
            <p style = "font-size:20px">there is no books</p>
        `
    }

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
                <h2 class="book_title">Title : ${book.title}</h2>
                <p class="book_author">Author : ${book.author}</p>
                <p class="book_category">Category : ${book.category}</p>
                <p class="book_price">Price : ${book.price}$</p>
            </div>
        </a>
    </div>
    `;
}