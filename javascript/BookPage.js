
var accountType = JSON.parse(localStorage.getItem('userInfo')).account_type;
var loggedIn = JSON.parse(localStorage.getItem('loggedIn'));
function getUrlParameter(name) {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get(name));
    return params.get(name);
}

document.addEventListener("DOMContentLoaded", function(){
    var container = document.getElementById("Book");
    var storedBooks = localStorage.getItem('libraryBooks');
    var id = getUrlParameter('id');
    document.getElementById("Btns").innerHTML = btns(id);
    if(accountType == "User" || !loggedIn){
        document.getElementById("del").style.display= "none";
        document.getElementById("edit").style.display= "none";
    }
    var books= [];
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
    books.forEach(function (book) {
        if(book.bookID==id){
            container.innerHTML += bookdefinition(book);
            document.getElementById("del").addEventListener("click", function(){
                book.numberofcopies = 0;
                localStorage.setItem('libraryBooks', JSON.stringify(books));
                window.location.href = "ViewBooks.html";
            });
        }
    });
    localStorage.setItem('libraryBooks', JSON.stringify(books));
});

function btns(id){
    return `
            <div>
                <button class="borrow"><a class="btnword" href="BorrowBook.html" target="_blanc">Borrow</a></button>
                <button class="edit" id="edit"><a class="btnword" href="EditBook.html?id=${id}" target="_blanc">Edit</a></button>
                <input class="delete" id="del" type="button" value="Delete">
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
