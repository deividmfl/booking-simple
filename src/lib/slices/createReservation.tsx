import { type StateCreator } from "zustand";

export interface Reservation {
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
  paymentMethod: {
    holderName: string;
    number: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
  };
  renter: {
    id: string;
  };
}

export interface ReservationSlice {
  reservations: Reservation[];
  createReservation: (reservations: Reservation, callback: () => void) => void;
  fetchReservations: (userId, callback: (data) => void) => void;
  updateReservation: (reservation, callback: () => void) => void;
  fetchReservation: (reservationId, callback: (data) => void) => void;
  deleteReservation: (reservationId, callback: () => void) => void;
}

export const createReservationSlice: StateCreator<ReservationSlice> = (
  set,
  get,
) => ({
  reservations: [],

  createReservation: (newReservation: Reservation, callback) => {
    set((state) => ({
      reservations: [...state.reservations, newReservation],
    }));
    callback();
  },
  fetchReservations: (userId, callback) => {
    const reservations = get().reservations;
    const findReservations = reservations.filter(
      (reservation) => reservation.renter.id === userId,
    );

    callback(findReservations);
  },

  updateReservation: (reservation, callback) => {
    set({
      reservations: get().reservations.filter((r) => r.id !== reservation.id),
    });
    set((state) => ({
      reservations: [...state.reservations, reservation],
    }));
    callback();
  },

  fetchReservation: (reservationId, callback) => {
    const reservations = get().reservations;
    const findReservation = reservations.find(
      (reservation) => reservation.id === reservationId,
    );
    callback(findReservation);
  },

  deleteReservation: (reservationId, callback) => {
    set((state) => ({
      reservations: state.reservations.filter((r) => r.id !== reservationId),
    }));

    callback();
  },
});
