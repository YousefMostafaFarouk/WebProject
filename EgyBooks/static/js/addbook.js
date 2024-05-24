
document.addEventListener("DOMContentLoaded", function(){
    var form = document.querySelector("form.add_book_class");
    console.log(form);
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        var author = document.getElementById('author').value;
        var category = document.getElementById('category').value;
       
        var letterRegex = /^[a-zA-Z\s]+$/;
        console.log(author);
        if(!letterRegex.test(author)){
            alert("Author can only contain letters!");
            return false;
        }
        if(!letterRegex.test(category)){
            alert("Category can only contain letters!");
            return false;
        }       
        form.submit();
    });
})

