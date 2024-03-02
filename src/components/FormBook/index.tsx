"use client";
import React, { useState } from "react";
import moment from "moment";
import { v4 } from "uuid";

import DatePicker from "../DatePicker";
import IncrementButtonPlace from "../IncrementButtonPlace";
import { useAppStore } from "@/lib/store";
import { type Place } from "@/lib/slices/createPlace";
import { useRouter } from "next/navigation";
import style from "./style";

export default function FormBook(place: Place) {
  const router = useRouter();
  const { goToCheckout, toggleCheckout, bookings } = useAppStore();
  const id = v4();
  const placeData = {
    id: place.id,
    title: place.title,
    img: place.gallery[0].img,
    roomTypeTitle: place.roomTypeTitle,
    city: place.city,
    averageDailyRate: place.averageDailyRate,
  };
  const price = place.averageDailyRate;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState<number>(1);

  const handleChangeGuests = (value: number) => {
    setGuests(value);
  };

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      setStartDate(startDate);
    }
    setEndDate(endDate);
  };

  const handleCheckout = () => {
    if (startDate !== null && endDate !== null) {
      goToCheckout(
        {
          place: placeData,
          id,
          price,
          guests,
          startDate: moment(startDate).format("MM-DD-YYYY"),
          endDate: moment(endDate).format("MM-DD-YYYY"),
        },
        () => {
          toggleCheckout(true);
          router.push(`book/checkout/${id}`);
        },
      );
    }
  };

  return (
    <div className={style.container}>
      <div className="py-3">
        <span className="font-semibold text-gray-900 text-md">
          {`$${place.averageDailyRate}`}
          <span className="font-normal text-xs">night</span>
        </span>
      </div>
      <section>
        <div className="py-3 relative">
          <DatePicker
            maxDate={place.dateRangeMax}
            minDate={moment()}
            startDate={startDate}
            endDate={endDate}
            bookings={bookings}
            handleDatesChange={handleDatesChange}
          />
        </div>
        <IncrementButtonPlace
          guests={guests}
          maxGuests={place.property.guests}
          handleChangeGuests={handleChangeGuests}
        />

        <div className="py-3">
          <button onClick={handleCheckout} className={style.button}>
            Book
          </button>
        </div>
      </section>
    </div>
  );
}
