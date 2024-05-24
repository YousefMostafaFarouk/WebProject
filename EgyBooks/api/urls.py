from django.urls import path
from . import views

app_name = "api"

urlpatterns = [
    path('get-books-data/', views.get_books_data, name="get-books-data"),
    path('get-borrowed-books', views.get_borrowed_books, name="get-borrowed-books"),
]
