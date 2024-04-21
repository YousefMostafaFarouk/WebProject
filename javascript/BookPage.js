
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
document.addEventListener("DOMContentLoaded", function(){
var container = document.getElementById("Book");
var storedBooks = localStorage.getItem('libraryBooks');
var id = getUrlParameter('id');
document.getElementById("Btns").innerHTML = btns();
var books= [];
if (storedBooks) {
    books = JSON.parse(storedBooks);
}
books.forEach(function (book) {
    if(book.bookID==id){
        container.innerHTML += bookdefinition(book);
    }
});
});
function btns(id){
    return `
            <div>
                <button class="borrow"><a class="btnword" href="BorrowBook.html" target="_blanc">Borrow</a></button>
                <button class="edit"><a class="btnword" href="EditBook.html?id=${id}" target="_blanc">Edit</a></button>
                <input class="delete" type="button" onclick="alert('Are you sure you want to delete this book?')" value="Delete">
            </div>
            <div>
                <h3 class="commentword">Share your Opinion</h3>
                <textarea class="commentbox" placeholder="Put you Comment here!"></textarea>
            </div>
            <div>
                <button class="commentbtn">Comment</button>
            </div>
            `
}
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
