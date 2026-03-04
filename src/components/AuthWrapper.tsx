'use client'

import { AuthProvider } from '@/contexts/AuthContext'

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
