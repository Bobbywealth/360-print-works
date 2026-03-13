'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface User {
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo credentials
const DEMO_USER = {
  email: 'admin@360printworks.com',
  password: 'demo123',
  name: 'Admin User',
  role: 'Administrator'
}

// Helper function to get initial user from localStorage (synchronous)
function initializeUser(): { user: User | null; isLoading: boolean } {
  if (typeof window === 'undefined') {
    return { user: null, isLoading: false }
  }
  
  try {
    const savedUser = localStorage.getItem('360printworks_user')
    if (savedUser) {
      try {
        return { user: JSON.parse(savedUser), isLoading: false }
      } catch {
        localStorage.removeItem('360printworks_user')
        return { user: null, isLoading: false }
      }
    }
  } catch (e) {
    // localStorage not available
  }
  return { user: null, isLoading: false }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize state synchronously with the function initializer
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null
    const savedUser = localStorage.getItem('360printworks_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch {
        return null
      }
    }
    return null
  })
  
  const [isLoading, setIsLoading] = useState(() => {
    return typeof window === 'undefined'
  })

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Check demo credentials
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      const userData = {
        email: DEMO_USER.email,
        name: DEMO_USER.name,
        role: DEMO_USER.role
      }
      setUser(userData)
      localStorage.setItem('360printworks_user', JSON.stringify(userData))
      setIsLoading(false)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('360printworks_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
