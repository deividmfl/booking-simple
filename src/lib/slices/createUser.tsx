import { StateCreator } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  paymentMethod: {
    holderName: string;
    number: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
  };
}

export interface UserSlice {
  user: User;
  fetchUser: () => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  user: {} as User,

  fetchUser: async () => {
    const res = import("@/utils/user.json");
    set({ user: await res });
  },
});
