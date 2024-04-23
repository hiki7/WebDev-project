import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';  // Ensure this service is correctly imported

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  bookForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.createForm();
  }

  createForm() {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      pictureUrl: ['']
    });
  }

  onSubmit() {
    if (this.bookForm.valid) {
      this.apiService.addBook(this.bookForm.value).subscribe({
        next: (book) => alert('Book added successfully!'),
        error: () => alert('Error adding book')
      });
    }
  }
}
