// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl; // Set your API URL in environments

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  borrowBook(bookId: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/borrow`, { bookId, userId });
  }

  getTransactionsByUserId(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions?userId=${userId}`);
  }
  
  returnBook(transactionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/transactions/${transactionId}`);
  }
}
