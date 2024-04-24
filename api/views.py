from django.shortcuts import render
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny



class BooksListAPIView(APIView):
    def get(self, request):
        books = Book.objects.all()
        serilizer = BookSerializer(books, many=True)
        return Response(serilizer.data)

    def post(self, request):
        books = BookSerializer(data=request.data)
        if books.is_valid():
            books.save()  # insert into ...
            return Response(books.data)
        return Response(books.errors,
                        status=status.HTTP_400_BAD_REQUEST)


class BookAPIView(APIView):
    def get_object(self, id):
        try:
            print(id)
            book = Book.objects.get(pk=id)
            print("Found Book:", book)  # Debug print
            return book
        except Book.DoesNotExist:
            print("Book not found")  # Debug print
            print(id)
            return None
    
    def get(self, request, id):
        book = self.get_object(id)
        if book:
            serializer = BookSerializer(book)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        book = self.get_object(id)
        if book:
            serializer = BookSerializer(book, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, id):
        book = self.get_object(id)
        if book:
            book.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class UserListAPIView(APIView):
    def get(self, request):
        users = User.objects.all()
        serilizer = UserSerializer(users, many=True)
        return Response(serializers.data)
    
    def post(self, request):
        users = UserSerializer(data=request.data)
        if users.is_valid():
            users.save()  # insert into ...
            return Response(users.data)
        return Response(users.errors,
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def category_list(request):
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many = True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def category_details(request, id):
    try:
        category = Category.objects.get(pk=id)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

token_obtain_view = TokenObtainPairView.as_view()

# Refresh JWT token
token_refresh_view = TokenRefreshView.as_view()

@api_view(['POST'])
@permission_classes([AllowAny])
def registration_view(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)