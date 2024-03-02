import { type StateCreator } from "zustand";

export interface Checkout {
  id: string;
  startDate: null | string;
  endDate: null | string;
  guests: number;
  place: {
    id: string;
    title: string;
    img: string;
    roomTypeTitle: string;
    city: string;
    averageDailyRate: number;
  };
  price: number;
}

export interface CheckoutSlice {
  checkout: Checkout;
  goToCheckout: (checkout: Checkout, callback: () => void) => void;
  removeFromCheckout: () => void;
  showCheckout: boolean;
  toggleCheckout: (v: boolean) => void;
}

export const createCheckoutSlice: StateCreator<CheckoutSlice> = (set, get) => ({
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  checkout: {} as Checkout,

  goToCheckout: (checkout, callback) => {
    set({ checkout });
    callback();
  },

  removeFromCheckout: () => {
    set({ checkout: undefined });
  },

  showCheckout: false,
  toggleCheckout: (v) => {
    set({ showCheckout: v });
  },
});
