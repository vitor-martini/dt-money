import { ReactNode } from 'react';

export interface Transaction {
  id: number;
  description: number;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string
}

export interface TransactionContextType {
  transactions: Transaction[];
}

export interface TransactionsProviderProps {
  children: ReactNode;
}