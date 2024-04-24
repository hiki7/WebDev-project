export interface User {
    id?: number;
    isManager: boolean;
    name: string;
    secondName: string;
    email: string;
    password: string;
    token?: string;
}
  