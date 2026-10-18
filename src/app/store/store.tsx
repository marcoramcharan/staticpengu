import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type User = {
  id: string | number;
  email?: string;
  [key: string]: any;
};

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token?: string | null) => void;
  logout: () => void;
}

export const useStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,

        login: (user, token = null) => {
          set(() => ({ user, token }), false, "login");
        },

        logout: () => {
          set(() => ({ user: null, token: null }), false, "logout");
        },
      }),
      {
        name: "staticpengu",
      }
    ),
    { name: "staticpengu-store" }
  )
);
