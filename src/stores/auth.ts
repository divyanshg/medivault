import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  firstName: string;
  id: number;
  lastName: string;
  profilepicture?: string;
  vaultId: string;
  vaultAddress: string;
}

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  verificationUUID: string | null;
  setlogindata: ({ verificationUUID }: LoginResponse) => void;
  setVerifyOtpData: ({ user }: { user: User }) => void;
  setUser: (user: User) => void;
  logout: () => void;
};

export type LoginResponse = {
  verificationUUID: string;
};

const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      verificationUUID: null,
      setlogindata: ({ verificationUUID }: LoginResponse) =>
        set({ verificationUUID }),
      setVerifyOtpData: ({ user }) =>
        set({ user, isAuthenticated: true, verificationUUID: null }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    { name: "auth-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const setlogindata = useAuth.getState().setlogindata;
export const setVerifyOtpData = useAuth.getState().setVerifyOtpData;
export const setUser = useAuth.getState().setUser;
export const logout = useAuth.getState().logout;

export default useAuth;
