import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, DashboardItem } from '../types/user';
import { storage } from '../utils/storage';

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addDashboardItem: (item: Omit<DashboardItem, 'id' | 'created' | 'lastModified'>) => void;
  deleteDashboardItem: (id: string) => void;
  updateDashboardItem: (id: string, updates: Partial<DashboardItem>) => void;
  getDashboardItem: (id: string) => DashboardItem | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const CURRENT_USER_KEY = 'current_user';

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    storage.init(); // Initialize mock data if needed
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = storage.getUser(email);
      if (!foundUser) {
        throw new Error('User not found');
      }
      
      // In a real app, you'd verify the password here
      if (password !== 'demo') { // Simple demo password
        throw new Error('Invalid password');
      }

      setUser(foundUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const addDashboardItem = (newItem: Omit<DashboardItem, 'id' | 'created' | 'lastModified'>) => {
    if (!user) return;

    const item: DashboardItem = {
      ...newItem,
      id: crypto.randomUUID(),
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    const updatedUser = {
      ...user,
      dashboardItems: [...user.dashboardItems, item],
    };

    setUser(updatedUser);
    storage.updateUser(updatedUser);
  };

  const deleteDashboardItem = (id: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      dashboardItems: user.dashboardItems.filter(item => item.id !== id),
    };

    setUser(updatedUser);
    storage.updateUser(updatedUser);
  };

  const updateDashboardItem = (id: string, updates: Partial<DashboardItem>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      dashboardItems: user.dashboardItems.map(item =>
        item.id === id
          ? { ...item, ...updates, lastModified: new Date().toISOString() }
          : item
      ),
    };

    setUser(updatedUser);
    storage.updateUser(updatedUser);
  };

  const getDashboardItem = (id: string) => {
    return user?.dashboardItems.find(item => item.id === id);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        addDashboardItem,
        deleteDashboardItem,
        updateDashboardItem,
        getDashboardItem,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};