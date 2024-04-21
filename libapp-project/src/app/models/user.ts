// src/app/models/user.ts
export interface User {
    id?: number;  // Optional if assigned by the backend
    username: string;
    email: string;
    password: string;
  }
  