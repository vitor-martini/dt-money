import { useEffect, useState, useCallback } from 'react'
import {
  CreateTransactionDto,
  Transaction,
  TransactionContextType,
  TransactionsProviderProps,
} from '../interfaces/transactions'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvier({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      },
    })

    setTransactions(response.data)
  }, [])

  const createTransaction = useCallback(async (data: CreateTransactionDto) => {
    const { description, category, price, type } = data
    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
    return response.data
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
