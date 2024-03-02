import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createUserSlice, UserSlice } from "./slices/createUser";
import { createPlaceSlice, PlaceSlice } from "./slices/createPlace";
import { createCheckoutSlice, CheckoutSlice } from "./slices/createCheckout";
import {
  createReservationSlice,
  ReservationSlice,
} from "./slices/createReservation";

type State = UserSlice & PlaceSlice & CheckoutSlice & ReservationSlice;

export const useAppStore = create<State>()(
  persist(
    (...state) => ({
      ...createUserSlice(...state),
      ...createPlaceSlice(...state),
      ...createCheckoutSlice(...state),
      ...createReservationSlice(...state),
    }),
    {
      name: "bookingSimple",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
