from django.db import models

class User(models.Model):
    isManager = models.BooleanField()
    name = models.CharField(max_length=50, null=True)
    second_name = models.CharField(max_length=50, null=True)
    email = models.CharField(max_length=50, null=True)
    password = models.CharField(max_length=50, null=True)

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50, null=True)

    def __str__(self) -> str:
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=50, null=True)
    author = models.CharField(max_length=50, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    available = models.BooleanField()
    pictureUrl = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return self.title

class Transaction(models.Model):
    bookId = models.ForeignKey(Book, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    borrowed_date = models.DateField()
    return_date = models.DateField()

    def __str__(self):
        return f"Transaction №{self.id}"


