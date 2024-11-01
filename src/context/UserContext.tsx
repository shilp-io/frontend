import React, { createContext, useContext, useState, useEffect } from "react";
import { User, DashboardItem } from "../types/user";
import { storage } from "../utils/storage";
import {
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../App";

interface UserContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addDashboardItem: (
    item: Omit<DashboardItem, "id" | "created" | "lastModified">,
  ) => void;
  deleteDashboardItem: (id: string) => void;
  updateDashboardItem: (id: string, updates: Partial<DashboardItem>) => void;
  getDashboardItem: (id: string) => DashboardItem | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const CURRENT_USER_KEY = "current_user";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    storage.init(); // Initialize mock data if needed

    // Set up Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      setFirebaseUser(fbUser);
      setIsLoading(false);

      if (fbUser) {
        // When Firebase authenticates, get or create user data
        const foundUser = storage.getUser(fbUser.email!);
        if (foundUser) {
          setUser(foundUser);
        } else {
          // Create new user in your storage if they don't exist
          const newUser: User = {
            id: fbUser.uid,
            email: fbUser.email!,
            name: fbUser.displayName || fbUser.email!,
            dashboardItems: [],
            // Add any other user fields you need
          };
          storage.updateUser(newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
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
      await signInWithEmailAndPassword(auth, email, password);
      // User state will be updated by the onAuthStateChanged listener
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      // User state will be cleared by the onAuthStateChanged listener
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  const addDashboardItem = (
    newItem: Omit<DashboardItem, "id" | "created" | "lastModified">,
  ): string => {
    if (!user) return "";

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
    return item.id;
  };

  const deleteDashboardItem = (id: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      dashboardItems: user.dashboardItems.filter((item) => item.id !== id),
    };

    setUser(updatedUser);
    storage.updateUser(updatedUser);
  };

  const updateDashboardItem = (id: string, updates: Partial<DashboardItem>) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      dashboardItems: user.dashboardItems.map((item) =>
        item.id === id
          ? { ...item, ...updates, lastModified: new Date().toISOString() }
          : item,
      ),
    };

    setUser(updatedUser);
    storage.updateUser(updatedUser);
  };

  const getDashboardItem = (id: string) => {
    return user?.dashboardItems.find((item) => item.id === id);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        firebaseUser,
        isAuthenticated: !!user && !!firebaseUser,
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
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
