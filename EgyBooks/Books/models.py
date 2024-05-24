from django.db import models
from django.core.exceptions import ValidationError
from User.models import CustomUser
import re
from django.db.models import UniqueConstraint

# Create your models here.

def validate_alpha(value):
    if not re.match(r'^[a-zA-Z\s]+$', value):
        raise ValidationError('Only letters are allowed.')

class Book(models.Model):
    title = models.CharField(max_length=100, unique=True)
    author = models.CharField(max_length=100, validators=[validate_alpha])
    category = models.CharField(max_length=100, validators=[validate_alpha])
    number_of_pages = models.PositiveIntegerField()
    description = models.TextField()
    book_cover = models.ImageField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    number_of_copies = models.PositiveIntegerField()

class BorrowedBooks(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    number_of_borrowed_books = models.PositiveIntegerField()
    class Meta:
        constraints = [
            UniqueConstraint(fields=['user', 'book'], name='UserBorrowedBook')
        ]
    

    
