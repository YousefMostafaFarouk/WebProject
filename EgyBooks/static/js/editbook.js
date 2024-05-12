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
            <input type="file" value = "${book.image}"id="image" accept="image/*"required><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="nameofthebook">name of the book</label>
            <input class="form_style" value = "${book.title}" type="text" id="nameofthebook" readonly ><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="bookID">book ID</label>
            <input class="form_style"value = "${book.bookID}" type="text" id="bookID" readonly><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="author">author</label>
            <input class="form_style" value = "${book.author}" type="text" id="author" readonly><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="category">category</label>
            <input class="form_style" value = "${book.category}" type="text" id="category" required><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="numberofpages">number of pages</label>
            <input class="form_style" value = "${book.pages}" type="number" id="numberofpages" required><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="description">description</label>
            <textarea id="description" placeholder="Write a description...">${book.description}</textarea><br><br>

        </div>
        <div class="form_group">
            <label class = "subtitle" for="price">Price</label>
            <input class="form_style" value = "${book.price}" type="number" id="price" required><br><br>
        </div>

        <div class="form_group">
            <label class = "subtitle" for="numberofcopies">Number of copies</label>
            <input class="form_style" value = "${book.numberofcopies}" type="number" id="numberofcopies"  required><br><br>
        </div>
        <input type="submit" value="Edit" style="font-size:25px;border-radius: 5px;">
    `
}

document.addEventListener("DOMContentLoaded", function(){


    var storedBooks = localStorage.getItem('libraryBooks');
    if (storedBooks) {
        libraryBooks = JSON.parse(storedBooks);
    }
    else {
        libraryBooks = [];
    }
    console.log(libraryBooks);

    var form = document.querySelector("form");

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        var fileInput = document.getElementById('image');
        var imageFile = fileInput.files[0];

        var reader = new FileReader();
        reader.onload = function(event) {
            var imageDataUrl = event.target.result;

            var title = document.getElementById('nameofthebook').value;
            var bookID = document.getElementById('bookID').value;
            var author = document.getElementById('author').value;
            var category = document.getElementById('category').value;
            var pages = document.getElementById('numberofpages').value;
            var description = document.getElementById('description').value;
            var price = document.getElementById('price').value;
            var numberofcopies = document.getElementById('numberofcopies').value;

            var titleRegex = /^[a-zA-Z][\w\d]*$/;
            if(!titleRegex.test(title)){
                alert("Title can't contain numbers in the start and can't contain special characters!");
                return false;
            }

            if(!titleRegex.test(author)){
                alert("author can't contain numbers in the start and can't contain special characters!");
                return false;
            }

            var categoryRegex = /^[a-zA-Z][a-zA-Z]*$/
            if(!categoryRegex.test(category)){
                alert("Category can't contain numbers in the start and can't contain special characters!");
                return false;
            }

            var idRegex = /^[0-9]+$/;
            if(!idRegex.test(bookID)){
                alert("ID must be numbers only");
                return false;
            }

            const bookData = {
                image: imageDataUrl,
                title: title,
                bookID: bookID,
                author: author,
                category:category,
                pages: pages,
                description: description,
                price: price,
                numberofcopies:numberofcopies
            };

            saveBookData(bookData);
        };

        reader.readAsDataURL(imageFile);

    });
})

function saveBookData(bookData) {
    var storedBooks = localStorage.getItem('libraryBooks');
    if (storedBooks) {
        libraryBooks = JSON.parse(storedBooks);
    }
    else {
        libraryBooks = [];
    }

    console.log(libraryBooks);
    libraryBooks.forEach(function (book) {
        if(book.bookID==bookData.bookID){
            book.category=bookData.category;
            book.pages=bookData.pages;
            book.description=bookData.description;
            book.price=bookData.price;
            book.numberofcopies=bookData.numberofcopies;
        }
    });
    localStorage.setItem('libraryBooks', JSON.stringify(libraryBooks));

    alert('Book editted successfully!');
    window.location.href = "ViewBooks.html";
}