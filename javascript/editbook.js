function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

document.addEventListener("DOMContentLoaded", function(){
    var container = document.getElementById("editBookForm");
    var storedBooks = localStorage.getItem('libraryBooks');
    var id = getUrlParameter('id');
    var books= [];
    if (storedBooks) {
        books = JSON.parse(storedBooks);
    }
    console.log(books);
    books.forEach(function (book) {
        if(book.bookID==id){
            container.innerHTML += generateBookFormHTML(book);
        }
    });
})

function generateBookFormHTML(book){
    return `
        <div class="form_group">
            <label class = "subtitle" for="image">choose photo for the book</label>
            <input type="file" value = "${book.image}"id="image" accept="image/*"><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="nameofthebook">name of the book</label>
            <input class="form_style" value = "${book.title}" type="text" id="nameofthebook"><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="bookID">book ID</label>
            <input class="form_style"value = "${book.bookID}" type="text" id="bookID"><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="author">author</label>
            <input class="form_style" value = "${book.author}" type="text" id="author"><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="numberofpages">number of pages</label>
            <input class="form_style" value = "${book.pages}" type="number" id="numberofpages" min="0" max="100000"><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="description">description</label>
            <textarea id="description" placeholder="Write a description...">${book.description}</textarea><br><br>

        </div>
        <div class="form_group">
            <label class = "subtitle" for="price">Price</label>
            <input class="form_style" value = "${book.price}" type="number" id="price" min="0" max="10000" required><br><br>
        </div>
        <input type="submit" value="Edit" style="font-size:25px;border-radius: 5px;">
    `
}