"use client";
import React from "react";
import { useAppStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import ModalUpdate from "@/components/ModalUpdate";
import { ArrowBackIcon } from "@/utils/icons";
import style from "./style";

export default function MyBookingsPage() {
  const { reservations, deleteReservation, deleteBooking } = useAppStore();

  const handleCancelReservation = (reservationId) => {
    deleteReservation(reservationId, () => {
      deleteBooking(reservationId);
    });
  };

  return (
    <div>
      <section className="bg-gray py-5 rounded-lg md:rounded-none">
        <div className="flex items-center">
          <Link href={"/"} className="mr-3">
            <ArrowBackIcon className="w-6 h-6" />
          </Link>
          <h1 className="font-semibold text-gray-900 text-3xl">My bookings</h1>
        </div>

        <div className="container mx-auto mt-5">
          <div className={style.Grid}>
            {reservations.map((reservation) => (
              <div
                className="text-left my-1 md:my-10 md:mt-0 border rounded-lg"
                key={reservation.id}
              >
                <div className="bg-white md:px-6 px-3 py-3 rounded-lg">
                  <h3 className="font-semibold text-gray-900 text-sm mb-5">
                    {reservation.startDate} at {reservation.place.city}
                  </h3>
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <Image
                        src={reservation.place.img}
                        width={96}
                        height={96}
                        alt="Product Image"
                        className="mr-4"
                      />
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {reservation.place.title}
                        </h2>
                        <p className="text-gray-900">
                          {reservation.place.roomTypeTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Guests:</span>
                    <span className="font-bold">{reservation.guests}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span>Service fee</span>
                    <span>$1.99</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold">{reservation.price}</span>
                  </div>
                </div>
                <div className="p-4">
                  <Link href={`?reservationId=${reservation.id}`}>
                    <button className={style.Button}>Edit booking</button>
                  </Link>
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                    className={style.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ModalUpdate />
    </div>
  );
}
