
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var container = document.getElementById("Book");
var storedBooks = localStorage.getItem('libraryBooks');
var id = getUrlParameter('id');
var books= [];
if (storedBooks) {
    books = JSON.parse(storedBooks);
}
books.forEach(function (book) {
    if(book.bookID==id){
        container.innerHTML += bookdefinition(book);
    }
});

function bookdefinition(book){
    return ` 
        <div>
            <img class="bookimg" alt="The book preface" src="${book.image}">
        </div>
        <div class="bookdef">
            <h1>${book.title}</h1>
            <h2>Category : ${book.category}</h2>
            <h2>Author : ${book.author}</h2>
            <h5>Number of Copies : ${book.numberofcopies}</h5>
            <h5>Number of Pages : ${book.pages}</h5>
            <h5>Price : ${book.price}</h5>
            <p>${book.description}</p>
        </div> 
        `
}
