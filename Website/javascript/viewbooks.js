document.addEventListener("DOMContentLoaded", function(){
    var books = getBooksData();
    console.log(books);
    var container = document.getElementById("all_books");
    console.log(container);

    var isrender=false;

    books.forEach(function (book) {
        console.log(book);
        if(book.numberofcopies>0){
            container.innerHTML+= generateBookHTML(book);
            isrender=true;
        }
    });

    if(!isrender){
        container.innerHTML+=
        `
            <p style = "font-size:20px">there is no books</p>
        `
    }
})

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

function getBooksData(){
    var booksData = localStorage.getItem('libraryBooks');
    if (booksData) {
        return JSON.parse(booksData);
    } else {
        console.log('Error');
        return [];
    }
}

