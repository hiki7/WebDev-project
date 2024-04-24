from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('books/', BooksListAPIView.as_view(), name='books-list'),
    path('books/<int:id>/', BookAPIView.as_view(), name='book-detail'),
    path('users/', UserListAPIView.as_view(), name='users-list'),
    path('categories/', category_list, name='categories-list'),
    path('categories/<int:id>/', category_details, name='category-detail'),
    path('api/token/', token_obtain_view, name='token_obtain_pair'),
    path('api/token/refresh/', token_refresh_view, name='token_refresh'),
    path('api/register/', registration_view, name='register'),
    path('borrow/', BorrowBookAPIView.as_view(), name='borrow-book'),
    path('return/<int:transaction_id>/', ReturnBookAPIView.as_view(), name='return-book'),
    path('transactions/user/<int:user_id>/', UserTransactionsAPIView.as_view(), name='user-transactions'),
]
