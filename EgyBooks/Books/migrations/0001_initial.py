# Generated by Django 5.0.6 on 2024-05-20 19:46

import Books.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, unique=True)),
                ('author', models.CharField(max_length=100, validators=[Books.models.validate_alpha])),
                ('category', models.CharField(max_length=100, validators=[Books.models.validate_alpha])),
                ('number_of_pages', models.PositiveIntegerField()),
                ('description', models.TextField()),
                ('book_cover', models.ImageField(upload_to='')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('number_of_copies', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='BorrowedBooks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number_of_borrowed_books', models.PositiveIntegerField()),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Books.book')),
            ],
        ),
    ]