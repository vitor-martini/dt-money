import { createContext, useEffect, useState } from 'react';
import { 
  Transaction, 
  TransactionContextType, 
  TransactionsProviderProps 
} from '../interfaces/transactions';

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvier({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);  
  const apiUrl = import.meta.env.VITE_API_URL;

  async function loadTransactions() {
    const response = await fetch(`${apiUrl}/transactions`);
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      { children }
    </TransactionsContext.Provider>
  );
}