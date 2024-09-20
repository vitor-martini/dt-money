import { createContext, useEffect, useState } from 'react';
import { 
  CreateTransactionDto,
  Transaction, 
  TransactionContextType, 
  TransactionsProviderProps 
} from '../interfaces/transactions';
import { api } from '../lib/axios';

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvier({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);  

  async function fetchTransactions(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    });

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransactionDto) {
    const { description, category, price, type} = data;
    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date()
    });

    setTransactions(state => [response.data, ...state]);
    return response.data;
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  );
}