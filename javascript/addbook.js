
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
            var pages = document.getElementById('numberofpages').value;
            var description = document.getElementById('description').value;
            var price = document.getElementById('price').value;

            const bookData = {
                image: imageDataUrl,
                title: title,
                bookID: bookID,
                author: author,
                pages: pages,
                description: description,
                price: price
            };

            saveBookData(bookData);
        };

        reader.readAsDataURL(imageFile);


    });
})


function saveBookData(bookData) {
    libraryBooks.push(bookData);
    localStorage.setItem('libraryBooks', JSON.stringify(libraryBooks));

    alert('Book added successfully!');
}
