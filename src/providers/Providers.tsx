'use client'

import React, { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthContext'

interface ProviderProps {
    children: ReactNode | ReactNode[] | JSX.Element | JSX.Element[]
}
const queryClient = new QueryClient()

export const Providers = ({ children }: ProviderProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}