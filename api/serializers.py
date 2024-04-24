from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','isManager','name','email', 'password')
    
class CategorySerializer(serializers.Serializer):
    
    name = serializers.CharField(max_length=50)



class TransactionSerializer(serializers.Serializer):
    bookId = serializers.IntegerField()
    userId = serializers.IntegerField()
    borrowed_date = serializers.DateField()
    return_date = serializers.DateField()


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('id','title', 'author', 'category', 'available')