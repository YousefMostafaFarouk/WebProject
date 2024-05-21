from django.shortcuts import render,redirect
from .models import Book, BorrowedBooks
from . import forms
from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required

# Create your views here.
def view_all(request, combination=None):
    search_param = request.GET.get('search')
    filter_param = request.GET.get('filter')
    return render(request, 'books/view_all.html')

@login_required()
@staff_member_required()
def add_book(request):
    if request.method == 'POST':
       form = forms.AddBook(request.POST, request.FILES)
       if form.is_valid():
           newbook = form.save(commit=False)
           newbook.save()
           return redirect('books:view-all')
    else:
        form = forms.AddBook() 
    return render(request, 'books/add_book.html', { 'form':form })

def book_page(request, book_id):
    book = get_object_or_404(Book, id = book_id)
    return render(request, 'books/book_page.html', {'book':book })

@login_required()
def borrow_book(request, book_id=None):
    if request.method == 'POST':
        form = forms.BorrowBook(request.POST)
        if form.is_valid():
            author = form.cleaned_data['author']
            title = form.cleaned_data['title']
            amount = form.cleaned_data['amount']
            id = form.cleaned_data['id']

            if Book.objects.filter(id=book_id, author = author, title = title).exists():
                book = Book.objects.get(author=author, title=title, id=book_id)
                number_of_copies = book.number_of_copies

                if amount > number_of_copies:
                    form.add_error('amount', "Can't borrow that many copies!")
                else:
                    book.number_of_copies -= amount
                    book.save()
                    borrowed_book = BorrowedBooks(user = request.user, book=book, number_of_borrowed_books=amount)
                    borrowed_book.save()
                    return redirect('books:view-all')
            else:
                form.add_error('id', "Book doesn't exist")

    else:
        if book_id != None and Book.objects.filter(id=book_id).exists():
            book = Book.objects.get(id=book_id)
            form = forms.BorrowBook(initial={'id': book_id, 'author':book.author, 'title':book.title})
        else:
            form = forms.BorrowBook()

    if book_id != None and Book.objects.filter(id=book_id).exists():
        book = Book.objects.get(id=book_id)
        return render(request, 'books/borrow_book.html', {'book': book, 'form':form })
    
    return render(request, 'books/borrow_book.html', {'form':form })

@login_required()
@staff_member_required()
def edit_book(request, book_id):
    book = get_object_or_404(Book, id = book_id)
    form = forms.AddBook(request.POST or None, request.FILES or None, instance=book)

    if form.is_valid():
        form.save()
        return redirect('books:book-page', book_id = book.id)
    
    return render(request, 'books/edit_book.html', {'form' : form, 'book_id':book_id})

@login_required()
@staff_member_required()
def delete_book(request, book_id):
    book = get_object_or_404(Book, id = book_id)
    book.delete()
    return redirect("books:view-all")