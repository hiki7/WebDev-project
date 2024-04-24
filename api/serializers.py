from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'isManager', 'name', 'second_name', 'email', 'password')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True)

    class Meta:
        model = Book
        fields = ('id', 'title', 'author', 'category', 'category_id', 'available', 'pictureUrl')

class TransactionSerializer(serializers.ModelSerializer):
    bookId = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), source='book')
    userId = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user')

    class Meta:
        model = Transaction
        fields = ('id', 'bookId', 'userId', 'borrowed_date', 'return_date')
