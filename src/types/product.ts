export interface Category {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  categoryId?: number;
  imageUrl?: string;
  category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  roleId: number;
  role: {
    id: number;
    nombre: 'ADMIN' | 'CUSTOMER';
  };
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
