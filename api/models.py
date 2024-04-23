from django.db import models

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    isManager = models.BooleanField()
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)

    def __str__(self) -> str:
        return self.name


class Book(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    Category = models.ForeignKey(Category, on_delete=models.CASCADE)
    available = models.BooleanField()
    
    def __str__(self) -> str:
        return self.title


class Transaction(models.Model):
    id = models.IntegerField(primary_key=True)
    bookId = models.ForeignKey(Book, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    borrowed_date = models.DateField()
    return_date = models.DateField()

    def __str__(self):
        return f"Tranzaction №{self.id}"


