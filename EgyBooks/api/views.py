from django.shortcuts import render
from django.http import JsonResponse
from Books.models import Book
# Create your views here.


def get_books_data(request):
    data = Book.objects.all().values()
    return JsonResponse(list(data), safe=False)


