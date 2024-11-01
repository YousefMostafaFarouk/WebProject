from django.shortcuts import render
from django.http import JsonResponse
from Books.models import Book
from Books.models import BorrowedBooks
from django.shortcuts import get_object_or_404
# Create your views here.


def get_books_data(request):
    data = Book.objects.all().values()
    return JsonResponse(list(data), safe=False)


def get_borrowed_books(request):
    books =  BorrowedBooks.objects.filter(user=request.user)
    
    books_data = []

    for borrowed_book in books:
        book_data = {
            'id': borrowed_book.book.id,
            'title': borrowed_book.book.title,
            'author': borrowed_book.book.author,
            'number_of_borrowed_books': borrowed_book.number_of_borrowed_books
        }
        books_data.append(book_data)

    return JsonResponse(list(books.book), safe=False)