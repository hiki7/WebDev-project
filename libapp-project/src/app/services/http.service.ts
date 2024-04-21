import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { User } from '../models/user'; 

@Injectable({
  providedIn: 'root',
  standalone: true
})
export class HttpService {
  private baseUrl = 'http://api.yourdomain.com'; // Adjust the base URL

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  // Update a book
  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/books/${book.id}`, book);
  }

  // Delete a book
  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/books/${bookId}`);
  }

  // Borrow a book
  borrowBook(bookId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transactions/borrow`, { bookId, userId });
  }

  // Return a book
  returnBook(bookId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/transactions/return`, { bookId, userId });
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, user);
  }
}
