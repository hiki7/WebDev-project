// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { User } from '../models/user';
import { Transaction } from '../models/transaction';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; // Set your API URL in environments

  constructor(private http: HttpClient) { }

  // Books
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books/`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/books/${id}/`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books/`, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}/`, book);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/books/${id}/`);
  }

  // Categories
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/`);
  }

  getCategoryDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categories/${id}/`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/categories/`, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/categories/${id}/`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}/`);
  }

  // Borrow and return books
  borrowBook(bookId: number, userId: number): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/borrow/`, { bookId, userId });
  }

  returnBook(transactionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/return/${transactionId}/`, {});
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/user/${userId}/`);
  }
}
