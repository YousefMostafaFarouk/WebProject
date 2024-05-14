document.addEventListener("DOMContentLoaded", function(){
    getBooksData().then(function(books) {
        var container = document.getElementById("all_books");
        var isRender = false;
        var searching = false;
        console.log(books);

        const params = new URLSearchParams(window.location.search);

        searchValue = params.get('search');
    
        filterValue = params.get('filter');

        if(searchValue != null || filterValue != null)
            searching = true;


        books.forEach(function (book) {
            if(book.number_of_copies > 0 && !searching){
                container.innerHTML += generateBookHTML(book);
                isRender = true;
            }
            else{
                if('title' == filterValue && book.title.toLowerCase().includes(searchValue.toLowerCase())){
                    container.innerHTML+= generateBookHTML(book);
                    isRender=true;
                }
                else if('author' == filterValue && book.author.toLowerCase().includes(searchValue.toLowerCase())){
                    container.innerHTML+= generateBookHTML(book);
                    isRender=true;
                }
                else if('category' == filterValue && book.category.toLowerCase().includes(searchValue.toLowerCase())){
                    container.innerHTML+= generateBookHTML(book);
                    isRender=true;
                }
            }
        });

        if(!isRender){
            container.innerHTML +=
            `
                <p style = "font-size:20px">there is no books</p>
            `;
        }
    }).catch(function(error) {
        console.log('Error fetching books data:', error);
        alert('Error fetching book data');
    });
});

function generateBookHTML(book) {
    return `
        <div class="book_block">
            <a href="book-page/${book.id}" class="book_link">
                <img src="../../media/${book.book_cover}" alt="Book Cover" class="book_image">
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
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Error fetching books data');
                }
            }
        };
        xhr.open("GET", "/api/get-books-data", true);
        xhr.send();
    });
}
