import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  currentUser: any;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.isLoading = true;
    this.error = null;
    this.apiService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load books.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  borrowBook(bookId: number): void {
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to borrow books.');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('No user data available. Please log in again.');
      return;
    }

    if (!confirm('Are you sure you want to borrow this book?')) {
      return;
    }

    this.apiService.borrowBook(bookId, currentUser.id)
      .subscribe({
        next: () => {
          alert('Book borrowed successfully!');
          this.fetchBooks();  // Refresh the list to reflect the borrowed status
        },
        error: (err) => {
          alert('Failed to borrow book.');
          console.error(err);
        }
      });
  }
}
