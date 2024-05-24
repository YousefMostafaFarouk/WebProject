from django import forms
from . import models
from django.core.exceptions import ValidationError
import re

def validate_alpha(value):
    if not re.match(r'^[a-zA-Z\s]+$', value):
        raise ValidationError('Only letters are allowed.')
    
class AddBook(forms.ModelForm):
    class Meta:
        model = models.Book
        fields = ['title', 'author', 'category', 'number_of_pages', 
                 'description', 'book_cover', 'price', 'number_of_copies']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['title'].widget.attrs.update({'class': 'form_style', 'placeholder': 'Name of the book', 'id': 'nameofthebook', 'required': True})
        self.fields['author'].widget.attrs.update({'class': 'form_style', 'placeholder': 'Author', 'id': 'author', 'required': True})
        self.fields['category'].widget.attrs.update({'class': 'form_style', 'placeholder': 'Category', 'id': 'category', 'required': True})
        self.fields['number_of_pages'].widget.attrs.update({'class': 'form_style', 'placeholder': 'Number of pages', 'id': 'numberofpages', 'required': True})
        self.fields['description'].widget.attrs.update({'placeholder': 'Description', 'id': 'description', 'required': True})
        self.fields['book_cover'].widget.attrs.update({'id': 'image', 'accept': 'image/*', 'required': True})
        self.fields['price'].widget.attrs.update({'class': 'form_style', 'placeholder': 'Price', 'id': 'price', 'required': True})
        self.fields['number_of_copies'].widget.attrs.update({'class': 'form_style', 'placeholder': 'Number of copies', 'id': 'numberofcopies', 'required': True})



class BorrowBook(forms.Form):
    id = forms.IntegerField(min_value=0)
    author = forms.CharField( validators=[validate_alpha])
    title = forms.CharField()
    amount = forms.IntegerField( min_value=1)



    
    