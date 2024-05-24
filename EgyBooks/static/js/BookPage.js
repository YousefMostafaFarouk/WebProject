document.addEventListener("DOMContentLoaded", function(){
    var container = document.getElementById("Book");
    var storedBooks = localStorage.getItem('libraryBooks');
    var id = getUrlParameter('id');
    document.getElementById("Btns").innerHTML = btns(id);
    if(accountType == "User" || !loggedIn){
        document.getElementById("del").style.display= "none";
        document.getElementById("edit").style.display= "none";
    }
    if(!loggedIn){
        document.getElementById("borrow").style.display = "none";
    }
    var books= [];
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
    books.forEach(function (book) {
        if(book.bookID == id){
            container.innerHTML += bookdefinition(book);
            document.getElementById("del").addEventListener("click", function(){
                book.numberofcopies = 0;
                localStorage.setItem('libraryBooks', JSON.stringify(books));
                window.location.href = "ViewBooks.html";
            });
        }
    });
    localStorage.setItem('libraryBooks', JSON.stringify(books));

    // Add event listener for the borrow button
    document.getElementById("borrow").addEventListener("click", function(){
        var book = books.find(book => book.bookID == id);
        redirectToBorrowPage(id, book);
    });
});

function btns(id){
    return `
            <div>
                <button class="borrow" id="borrow"><a class="btnword" href="BorrowBook.html?id=${id}" target="_blanc">Borrow</a></button>
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
            `;
}

function btnsWithBook(id, book) {
    return `
            <div>
                <button class="borrow" id="borrow" onclick="redirectToBorrowPage(${id}, ${JSON.stringify(book)})">Borrow</button>
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
            `;
}

function redirectToBorrowPage(id, book) {
    localStorage.setItem('borrowBookInfo', JSON.stringify({ id: id, book: book }));
    window.location.href = `BorrowBook.html?id=${id}&title=${encodeURIComponent(book.title)}&author=${encodeURIComponent(book.author)}`;
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
        `;
}
