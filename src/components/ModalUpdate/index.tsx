"use client";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";

import { Suspense, useEffect, useState } from "react";
import FormUpdate from "../FormUpdate";
import { Reservation } from "@/lib/slices/createReservation";

export default function ModalUpdate() {
  const { fetchReservation, place, bookings } = useAppStore();
  const [reservationData, setReservationData] = useState<Reservation>();

  const searchParams = useSearchParams();
  const params = searchParams.get("reservationId");

  useEffect(() => {
    fetchReservation(params, (data) => {
      setReservationData(data);
    });
  }, [fetchReservation, params]);

  if (!reservationData) return null;

  return (
    <Suspense fallback={<>Loading...</>}>
      {params && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto flex justify-center items-center">
          <div className="w-auto bg-white rounded-3xl">
            <div className="flex flex-col items-center">
              <FormUpdate
                reservation={reservationData}
                dateRangeMax={place.dateRangeMax}
                property={place.property}
                bookings={bookings}
              />
            </div>
          </div>
        </dialog>
      )}
    </Suspense>
  );
}
