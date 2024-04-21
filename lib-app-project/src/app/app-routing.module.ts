// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BorrowedBooksComponent } from './components/borrowed-books/borrowed-books.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: 'borrowed-books', component: BorrowedBooksComponent },
  { path: 'add-book', component: AddBookComponent},
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookListComponent },
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
