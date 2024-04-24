import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-borrowed-books',
  templateUrl: './borrowed-books.component.html',
  styleUrls: ['./borrowed-books.component.css']
})
export class BorrowedBooksComponent implements OnInit {
  transactions: Transaction[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserTransactions();
  }

  loadUserTransactions() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.isLoading = true;
      this.apiService.getTransactionsByUserId(currentUser.id).subscribe({
        next: (data) => {
          this.transactions = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Failed to load transactions. Please try again later.';
          console.error('Error fetching transactions:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.error = 'User not identified. Please login.';
    }
  }

  returnBook(transactionId: number) {
    if (confirm('Are you sure you want to return this book?')) {
      this.apiService.returnBook(transactionId).subscribe({
        next: () => {
          alert('Book returned successfully!');
          this.loadUserTransactions();  // Reload the transactions list to update the view
        },
        error: (error) => {
          alert('Failed to return book. Please try again later.');
          console.error('Return book error:', error);
        }
      });
    }
  }
}
