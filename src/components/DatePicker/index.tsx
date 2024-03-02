"use client";
import * as Moment from "moment";
import { extendMoment } from "moment-range";
import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/constants";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./style.css";
import { isOutsideRange } from "@/utils/helpers";
const moment = extendMoment(Moment);

export default function DatePicker({
  maxDate,
  minDate,
  startDate,
  endDate,
  bookings,
  handleDatesChange,
}) {
  const [focusedInput, setFocusedInput] = useState(null);

  const isBlocked = (date) => {
    let bookedRanges: any[] = [];

    bookings.map((booking) => {
      bookedRanges = [
        ...bookedRanges,
        moment.range(booking.startDate, booking.endDate),
      ];
    });

    const booked = bookedRanges.find((range) => range.contains(date));

    return booked;
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="date_picker_start_date_id"
      endDate={endDate}
      endDateId="date_picker_end_date_id"
      onDatesChange={handleDatesChange}
      isDayBlocked={isBlocked}
      startDatePlaceholderText="Check-In"
      endDatePlaceholderText="Check-Out"
      focusedInput={focusedInput}
      orientation={
        window.matchMedia("(max-width: 700px)").matches
          ? "vertical"
          : "horizontal"
      }
      onFocusChange={(focusedInput) => {
        // @ts-expect-error
        setFocusedInput(focusedInput);
      }}
      isOutsideRange={(date) =>
        isOutsideRange(date, startDate, bookings, minDate, maxDate)
      }
    />
  );
}
