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
        this.error = 'Failed to load books. ' + (err.error?.message || '');
        this.isLoading = false;
      }
    });
  }

  borrowBook(bookId: number | undefined): void {
    if (bookId === undefined) {
      console.error('Attempted to borrow a book without an ID');
      return;  // Optionally show an error message to the user
    }

    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to borrow books.');
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !currentUser.id) {
      alert('No user data available. Please log in again.');
      return;
    }

    if (!confirm('Are you sure you want to borrow this book?')) {
      return;
    }

    this.apiService.borrowBook(bookId, currentUser.id).subscribe({
      next: (transaction) => {
        alert(`Book borrowed successfully! Transaction ID: ${transaction.id}`);
        this.fetchBooks(); // Optionally refresh the book list if the state is changed on the server
      },
      error: (err) => {
        alert('Failed to borrow book. ' + (err.error?.message || 'Please try again.'));
      }
    });
  }

  returnBook(transactionId: number): void {
    this.apiService.returnBook(transactionId).subscribe({
      next: () => {
        alert('Book returned successfully!');
        this.fetchBooks(); // Refresh the list to reflect the updated book availability
      },
      error: (err) => {
        alert('Failed to return book. ' + (err.error?.message || 'Please try again.'));
      }
    });
  }
}
