import React from "react";
import IncrementButton from "@/components/IncrementButton";
import { GuestsIcon } from "../../utils/icons";

export default function IncrementButtonPlace({
  guests,
  maxGuests,
  handleChangeGuests,
}) {
  return (
    <IncrementButton
      min={1}
      max={maxGuests}
      text="guests"
      icon={<GuestsIcon className="w-2.5 h-2.5" />}
      value={guests}
      onClick={handleChangeGuests}
    />
  );
}
