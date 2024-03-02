import { type StateCreator } from "zustand";

export interface Place {
  id: string;
  title: string;
  roomType: string;
  roomTypeTitle: string;
  city: string;
  country: string;
  averageDailyRate: number;
  dateRangeMin: string;
  dateRangeMax: string;
  description: string;
  property: {
    beds: number;
    bedrooms: number;
    guests: number;
    bathroom: number;
  };
  gallery: Array<{
    id: number;
    img: string;
    isCover?: boolean;
  }>;
  amenities: Array<{
    id: number;
    title: string;
    subtext?: string;
    icon: string;
  }>;
  reviews: Array<{
    id: number;
    stars: number;
    reviwerName: string;
    text: string;
    img: string;
  }>;
}

export interface Bookings {
  [x: string]: any;
  id: string;
  startDate: null | string;
  endDate: null | string;
  placeId: string;
}

export interface PlaceSlice {
  place: Place;
  bookings: Bookings[];
  fetchPlace: () => void;
  updateBookings: (booking: Bookings) => void;
  deleteBooking: (bookingId) => void;
}

export const createPlaceSlice: StateCreator<PlaceSlice> = (set, get) => ({
  place: {} as Place,
  bookings: [],

  fetchPlace: async () => {
    const res = import("@/utils/place.json");
    set({ place: await res });
  },

  updateBookings: (booking: Bookings) => {
    const find = get().bookings.find((r) => r.id === booking.id);
    if (find !== null) {
      set({ bookings: get().bookings.filter((r) => r.id !== booking.id) });
      set((state) => ({
        bookings: [...state.bookings, booking],
      }));
    } else {
      set((state) => ({
        bookings: [...state.bookings, booking],
      }));
    }
  },

  deleteBooking: (bookingId) => {
    set((state) => ({
      bookings: state.bookings.filter((b) => b.id !== bookingId),
    }));
  },
});
