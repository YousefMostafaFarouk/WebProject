
let libraryBooks = [];

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
                numberofcopies:1
            };

            saveBookData(bookData);
        };

        reader.readAsDataURL(imageFile);


    });
})


function saveBookData(bookData) {
    var isexist=false;
    libraryBooks.forEach(function (book) {
        if(book.bookID==bookData.bookID){
            book.numberofcopies +=1;
            console.log(book.numberofcopies);
            isexist=true;
        }
    });
    if(!isexist)
        libraryBooks.push(bookData);
    localStorage.setItem('libraryBooks', JSON.stringify(libraryBooks));

    alert('Book added successfully!');
    window.location.href = "ViewBooks.html";
}

