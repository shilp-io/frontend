import { User } from "../types/user";
import { MOCK_USERS } from "./mockData";

const STORAGE_KEY = "app_users";

export const storage = {
  init: () => {
    const existingUsers = localStorage.getItem(STORAGE_KEY);
    if (!existingUsers) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_USERS));
    }
  },

  getUsers: (): User[] => {
    const users = localStorage.getItem(STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  },

  getUser: (email: string): User | null => {
    const users = storage.getUsers();
    return users.find((u) => u.email === email) || null;
  },

  updateUser: (updatedUser: User): void => {
    const users = storage.getUsers();
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    }
  },
};
