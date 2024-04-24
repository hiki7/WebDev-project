from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('books/', BooksListAPIView.as_view()),
    path('books/<int:id>', BookAPIView.as_view()),
    path('users/', UserListAPIView.as_view()),
    path('categorieы/', category_list),
    path('categories/<int:id>', category_details),
    path('api/token/', token_obtain_view, name='token_obtain_pair'),
    path('api/token/refresh/', token_refresh_view, name='token_refresh'),
    path('api/register/', registration_view, name='register'),
]