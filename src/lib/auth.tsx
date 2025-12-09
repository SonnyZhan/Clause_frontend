"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/types';
import { MOCK_TENANT_USER, MOCK_CLINIC_USER } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: 'tenant' | 'clinic') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session
    const storedAuth = localStorage.getItem('clause_auth');
    if (storedAuth) {
      try {
        const parsedUser = JSON.parse(storedAuth);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse auth data', error);
        localStorage.removeItem('clause_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (role: 'tenant' | 'clinic') => {
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser = role === 'tenant' ? MOCK_TENANT_USER : MOCK_CLINIC_USER;
    
    setUser(mockUser);
    localStorage.setItem('clause_auth', JSON.stringify(mockUser));
    setIsLoading(false);
    
    // Redirect based on role
    if (role === 'tenant') {
      router.push('/tenant/dashboard');
    } else {
      router.push('/clinic/dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('clause_auth');
    router.push('/auth/sign-in');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
