// src/app/components/book-list/book-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Book } from '../models/book';
import { CommonModule } from '@angular/common';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  userId: number | undefined; // This should be retrieved from an auth service or local storage

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.loadBooks();
    this.userId = this.getCurrentUser(); // Implement this method based on your authentication system
  }

  loadBooks() {
    this.httpService.getBooks().subscribe({
      next: (books) => this.books = books,
      error: (error) => console.error('Error loading the books', error)
    });
  }

  borrowBook(bookId: number) {
    if (this.userId == null) {
      console.error('User ID is missing');
      return;
    }

    this.httpService.borrowBook(bookId, this.userId).subscribe({
      next: () => {
        alert('Book borrowed successfully!');
        this.updateBookAvailability(bookId, false);
      },
      error: (error) => {
        console.error('Failed to borrow book', error);
      }
    });
  }

  updateBookAvailability(bookId: number, available: boolean) {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      book.available = available;
    }
  }

  getCurrentUser(): number | undefined {
    // This method should ideally return the user ID from your auth service or local storage
    return parseInt(localStorage.getItem('userId') || 'undefined');
  }
}
