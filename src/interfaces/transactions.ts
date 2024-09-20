import { ReactNode } from 'react';

export interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string
}

export interface CreateTransactionDto {
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
}

export interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionDto) => Promise<Transaction>;
}

export interface TransactionsProviderProps {
  children: ReactNode;
}