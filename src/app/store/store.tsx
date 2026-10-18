import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type user = any;
type employee = any;
type employer = any;

interface TodoState {
  user: user;
  employee: employee;
  employer: employer;
  loginuser: (user: any) => void;
  loginemployer: (user: any) => void;
  loginemployee: (user: any) => void;
  logoutuser: () => void;
}

export const useStore = create<TodoState>()(
  devtools(
    persist(
      (set) => ({
        user: false,
        employee: false,
        employer: false,

        loginuser: (user) => {
          set(() => ({
            user: user,
          }));
        },

        loginemployer: (user) => {
          set(() => ({
            employer: user,
          }));
        },

        loginemployee: (user) => {
          set(() => ({
            employee: user,
          }));
        },

        logoutuser: () => {
          set(() => ({
            user: null,
            employee: null,
            employer: null,
          }));
        },
      }),
      {
        name: "indeed",
      }
    )
  )
);