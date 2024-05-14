from django.urls import path,re_path
from . import views

app_name = "books"

urlpatterns = [
    path('add-book/', views.add_book, name='add-book'),
    path('book-page/<int:book_id>', views.book_page, name='book-page'),
    path('view-all/', views.view_all, name='view-all'),
    re_path(r'^view-all/.*$', views.view_all, name='view-all'),
    path('borrow-book/<int:book_id>', views.borrow_book, name='borrow-book'),
    path('borrow-book/', views.borrow_book, name='borrow-book-no-id'),
    path('edit-book/<int:book_id>', views.edit_book, name='edit-book'),
]
