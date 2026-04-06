import { create } from 'zustand';
import { User } from '../models/User';
import { getSessionUser, login, logout } from './authService';

type AuthState = {
  user: User | null;
  loading: boolean;
  hydrate: () => Promise<void>;
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  hydrate: async () => {
    set({ loading: true });
    const user = await getSessionUser();
    set({ user, loading: false });
  },
  signIn: async (username: string) => {
    set({ loading: true });
    const user = await login(username);
    set({ user, loading: false });
  },
  signOut: async () => {
    set({ loading: true });
    await logout();
    set({ user: null, loading: false });
  }
}));
