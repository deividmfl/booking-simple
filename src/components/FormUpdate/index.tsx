"use client";
import React, { ReactComponentElement, ReactElement, useState } from "react";
import moment from "moment";
import DatePicker from "../DatePicker";
import IncrementButtonPlace from "../IncrementButtonPlace";
import { useAppStore } from "@/lib/store";
import { usePathname, useRouter } from "next/navigation";
import { formatDate, calcPriceCheckout } from "@/utils/helpers";
import Link from "next/link";
import { CloseIcon } from "../../utils/icons";
import style from "./style";

export default function FormUpdate({
  reservation,
  dateRangeMax,
  property,
  bookings,
}) {
  const router = useRouter();
  const { updateReservation, updateBookings } = useAppStore();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState<number>(reservation.guests);

  const handleChangeGuests = (value: number) => {
    setGuests(value);
  };
  const pathname = usePathname();
  const fee = 1.99;
  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate);
    }
    setEndDate(endDate);
  };

  const handleCheckout = () => {
    updateReservation(
      {
        ...reservation,
        guests: guests,
        price: calcPriceCheckout({
          startDate,
          endDate,
          averageDailyRate: reservation.place.averageDailyRate,
          fee,
        }),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
      () => {
        updateBookings({
          id: reservation.id,
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          placeId: reservation.place.id,
        }),
          router.push(pathname);
      },
    );
  };

  return (
    <div className={style.container}>
      <div className="flex justify-between">
        <div className="flex justify-between w-full py-3">
          <span className="font-semibold text-gray-900 text-md">
            {`$${reservation.place.averageDailyRate}`}
            <span className="font-normal text-xs"> night</span>
          </span>
          <span className="font-semibold text-gray-900 text-md">
            $
            {startDate && endDate
              ? calcPriceCheckout({
                  startDate,
                  endDate,
                  averageDailyRate: reservation.place.averageDailyRate,
                  fee,
                })
              : 0}
            <span className="font-normal text-xs"> total</span>
          </span>
        </div>
        <Link href={pathname}>
          <CloseIcon className="w-6 h-6 text-gray-900" />
        </Link>
      </div>

      <section>
        <div className="py-3 relative">
          <DatePicker
            maxDate={dateRangeMax}
            minDate={moment()}
            startDate={startDate}
            endDate={endDate}
            bookings={bookings}
            handleDatesChange={handleDatesChange}
          />
        </div>
        <IncrementButtonPlace
          guests={guests}
          maxGuests={property.guests}
          handleChangeGuests={handleChangeGuests}
        />

        <div className="py-3">
          <button onClick={handleCheckout} className={style.button}>
            Update
          </button>
        </div>
      </section>
    </div>
  );
}
