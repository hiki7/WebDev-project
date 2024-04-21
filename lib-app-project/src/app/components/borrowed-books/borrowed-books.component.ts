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
          console.error('Error fetching transactions:', error);
          this.isLoading = false;
        }
      });
    }
  }

  returnBook(transactionId: number) {
    this.apiService.returnBook(transactionId).subscribe({
      next: () => {
        alert('Book returned successfully!');
        this.loadUserTransactions();  // Reload the transactions list
      },
      error: (error) => {
        alert('Failed to return book');
        console.error(error);
      }
    });
  }
}
